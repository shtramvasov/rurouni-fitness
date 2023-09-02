const express = require('express');
const router = express.Router();
const pool = require('../../../database');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Sessions router ====`);
	next();
});

// Получить список посещений
router.get('/', async (req, res, next) => {
  let pg = await pool.connect();

  try {
    const sessionsList = (await pg.query(`
      select 
        s.session_id,
        r.name,
        s.created_on_tz,
        s.burned_calories,
        s.category
      from session s
      join routine r on r.routine_id = s.routine_id`    
    )).rows;

    res.json(sessionsList)
  } catch (error) {
      console.log(error);
		  next(error);
  } finally {
      pg.release();
  }
});

// Детализация посещения (подгрузка упражнений)
router.get('/:id', async (req, res, next) => {
  let pg = await pool.connect();

  try {
    const exercisesList = (await pg.query(`
      select
        es.es_id,
        e.name,
        es.weight,
        es.sets,
        es.reps,
        e.units
      from exercise_session es
      join exercise e on e.exercise_id = es.exercise_id
      where session_id = $1`,
      [req.params.id])).rows;

    if(!exercisesList.length) return res.status(404).json({ error: 'Список упражнений не найден' });

    res.json(exercisesList)
  } catch (error) {
      console.log(error);
		  next(error);
  } finally {
      pg.release()
  }
});

// Сделать запись о посещении
router.post('/', async (req, res, next) => {
  let pg = await pool.connect();
  const { routine_id, date, category, burned_calories, exercises } = req.body
  
  try {
    // Валидации
    if (!routine_id) return res.status(400).json({ error: 'Не передана тренировка' })
    if (!date) return res.status(400).json({ error: 'Не передана дата' })
    if (!category) return res.status(400).json({ error: 'Не передана категория тренировки' })

    await pg.query('begin')

    const passId = (await pg.query('select pass_id from pass where is_active = true')).rows[0]

    if(!passId) return res.status(400).json({ error: 'Нет действующего пропуска' })

    // Записываем посещение
    const sessionId = (await pg.query(`
      insert into session
        (routine_id, pass_id, category, created_on_tz, burned_calories)
      values ($1, $2, $3, $4, $5) returning session_id`,
      [ routine_id, passId.pass_id, category, date, burned_calories ]
    )).rows[0].session_id;

    if (!sessionId) return res.status(404).json({ error: 'Ошибка сохранения записи' });

    const sessionCount = (await pg.query(`
      select count(*) sessions from session where pass_id = $1`,
      [ passId.pass_id ]
    )).rows[0]

    // Закрываем пропуск, если израсходовали все посещения (лимит 12)
    if (sessionCount.sessions == 12) {
      await pg.query(`
        update pass set (end_on_tz, is_active) = (now(), false) where pass_id = $1`,
        [ passId.pass_id ]
      )
    };

    // Записываем историю упражнений 
    if (exercises) {
      for (let exercise of exercises) {
        await pg.query(`
          insert into exercise_session
            (exercise_id, session_id, created_on_tz, weight, sets, reps)
          values ($1, $2, $3, $4, $5, $6)`,
          [ exercise.exercise_id, sessionId, date, exercise.weight, exercise.sets, exercise.reps ]
        );

        // Обновляем личный рекорд упражнения
        await pg.query(`
          update exercise
          set personal_record = 
            case
              when personal_record is null or $1 > personal_record then $1
              else personal_record 
            end
          where exercise_id = $2`,
          [ exercise.weight, exercise.exercise_id ]
        );
      };
    };
    
    await pg.query('commit');
    res.json({ message: true, sessions: sessionCount.sessions })
  } catch (error) {
      await pg.query('rollback');
      console.log(error);
      next(error);
  } finally {
      pg.release()
  }
});

module.exports = router;
