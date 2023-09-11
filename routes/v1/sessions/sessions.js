const express = require('express');
const router = express.Router();
const { connection, transaction } = require('../../../middlewares/connection');
const SessionsController = require('../../../controllers/sessions/sessions.controller');
const PassController = require('../../../controllers/pass/pass.controller');
const ExercisesController = require('../../../controllers/exercises/exercises.controller');
const RoutinesController = require('../../../controllers/routines/routines.controller');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Sessions router ====`);
	next();
});

// Получить список посещений
router.get('/', connection (async (req, res) => {
  const sessionsList = await SessionsController.getAll(res.locals.pg, { user_id: req.user.user_id });

  res.json(sessionsList)
}));

// Детализация посещения (подгрузка упражнений)
router.get('/:id', connection (async (req, res) => {
  const exercisesList = await SessionsController.getExercises(res.locals.pg, {
		exercise_id: req.params.id,
		user_id: req.user.user_id,
	});
  
  if(!exercisesList.length) return res.status(404).json({ error: 'Список упражнений не найден' });

  res.json(exercisesList)
}));

// Сделать запись о посещении
router.post('/', transaction (async (req, res) => {
  const pg = res.locals.pg;
  const { routine_id, date, category, burned_calories, exercises } = req.body
  
  // Валидации
  if (!routine_id) return res.status(400).json({ error: 'Не передана тренировка' })
  if (!date) return res.status(400).json({ error: 'Не передана дата' })
  if (!category) return res.status(400).json({ error: 'Не передана категория тренировки' })

  const passId = await PassController.getActiveId(pg);
  if(!passId) return res.status(400).json({ error: 'Нет действующего пропуска' })

  // Записываем посещение
  const sessionId = await SessionsController.postSession(pg, {
    routine_id,
    user_id: req.user.user_id,
    pass_id: passId.pass_id,
    category,
    date,
    burned_calories,
  });
  if (!sessionId) res.status(404).json({ error: 'Ошибка сохранения записи' });

  // Считаем количество посещений по пропуску
  const usedSessions = await SessionsController.getSessionCount(pg, { pass_id: passId.pass_id });

  // Закрываем пропуск, если израсходовали все посещения (лимит 12)
  if (usedSessions.sessions == 12) await PassController.closePass(pg, { user_id: req.user.user_id });

  // Прикрепляем программу тренировок к пользователю, если ранее не было
  const isRoutineAttached = await RoutinesController.getUserRoutine(pg,  { 
    user_id: req.user.user_id, 
    routine_id: routine_id 
  });

  if(!isRoutineAttached) {
    await RoutinesController.postUserRoutine(pg, { user_id: req.user.user_id,routine_id: routine_id  });
  }

  // Записываем историю упражнений 
  if (exercises) {
    for (let exercise of exercises) {
      await ExercisesController.postExerciseHistory(pg, {
        exercise_id: exercise.exercise_id,
        session_id: sessionId.session_id,
        date,
        weight: exercise.weight,
        sets: exercise.sets,
        reps: exercise.reps,
        burned_calories: exercise.burned_calories
      });

      // Обновляем личный рекорд упражнения
      await ExercisesController.updatePersonalRecord(pg, {
				weight: exercise.weight,
				user_id: req.user.user_id,
				exercise_id: exercise.exercise_id,
			});
    };
  };
  
  res.json({ message: true, sessions: usedSessions.sessions })
}));

module.exports = router;
