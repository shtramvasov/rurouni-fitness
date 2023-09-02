const express = require('express');
const router = express.Router();
const pool = require('../../../database');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Routines router ====`);
	next();
});

// Получить список программ тренировок / Детализацию
router.get('/:id?', async (req, res, next) => {
  let pg = await pool.connect();

  try {
    let query = `
      select 
        r.routine_id,
        r.name,
        r.is_active,
        array_agg(json_build_object(
          'exercise_id', e.exercise_id,
          'exercise_name', e.name,
          'muscle_group', e.muscle_group,
          'units', e.units,
          'calories_per_rep', e.calories_per_rep,
          'personal_record', e.personal_record
      )) as exercises
      from routine r
      left join routine_exercise re on re.routine_id = r.routine_id
      join exercise e on e.exercise_id = re.exercise_id `

    if(req.query.is_active && req.params.id) return res.status(400).json({ error: 'Неправильный запрос' })

    if(req.query.is_active) query += `where r.is_active = true `

    let params = []
    if(req.params.id) {
      params.push(req.params.id) 
      query += `where r.routine_id = $${params.length}`
    }

    query += 'group by r.routine_id, r.name'

    const routinesList = (await pg.query(query, params)).rows;
    if (!routinesList.length) return res.status(404).json({ error: 'Тренировочных программ не найдено' });

    res.json(routinesList)
  } catch (error) {
      console.log(error);
		  next(error);
  } finally {
      pg.release();
  }
});


module.exports = router;