const express = require('express');
const router = express.Router();
const { connection, transaction } = require('../../../middlewares/connection');
const SessionsController = require('../../../controllers/sessions/sessions.controller');
const PassController = require('../../../controllers/pass/pass.controller');
const ExercisesController = require('../../../controllers/exercises/exercises.controller');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Sessions router ====`);
	next();
});

// Получить список посещений
router.get('/', connection, async (req, res) => {
  const sessionsList = await SessionsController.getAll(req.pg);

  res.json(sessionsList)
});

// Детализация посещения (подгрузка упражнений)
router.get('/:id', connection, async (req, res) => {
  const exercisesList = await SessionsController.getOne(req.pg, { id: req.params.id });
  if(!exercisesList.length) return res.status(404).json({ error: 'Список упражнений не найден' });

  res.json(exercisesList)
});

// Сделать запись о посещении
router.post('/', connection, async (req, res) => {
  const { routine_id, date, category, burned_calories, exercises } = req.body
  
  // Валидации
  if (!routine_id) return res.status(400).json({ error: 'Не передана тренировка' })
  if (!date) return res.status(400).json({ error: 'Не передана дата' })
  if (!category) return res.status(400).json({ error: 'Не передана категория тренировки' })

  const passId = await PassController.getActiveId(req.pg);
  if(!passId) return res.status(400).json({ error: 'Нет действующего пропуска' })

  // Записываем посещение
  const sessionId = await SessionsController.postSession(req.pg, {
    routine_id,
    pass_id: passId.pass_id,
    category,
    date,
    burned_calories,
  });
  if (!sessionId)  res.status(404).json({ error: 'Ошибка сохранения записи' });

  // Считаем количество посещений по пропуску
  const usedSessions = await SessionsController.getSessionCount(req.pg, { pass_id: passId.pass_id });

  // Закрываем пропуск, если израсходовали все посещения (лимит 12)
  if (usedSessions.sessions == 12) await PassController.closePass(req.pg, { pass_id: passId.pass_id });

  // Записываем историю упражнений 
  if (exercises) {
    for (let exercise of exercises) {
      await ExercisesController.postExerciseHistory(req.pg, {
        exercise_id: exercise.exercise_id,
        session_id: sessionId.session_id,
        date,
        weight: exercise.weight,
        sets: exercise.sets,
        reps: exercise.reps,
        burned_calories: exercise.burned_calories
      });

      // Обновляем личный рекорд упражнения
      await ExercisesController.updatePersonalRecord(req.pg, { weight: exercise.weight, exercise_id: exercise.exercise_id });
    };
  };
  
  res.json({ message: true, sessions: usedSessions.sessions })
});

module.exports = router;
