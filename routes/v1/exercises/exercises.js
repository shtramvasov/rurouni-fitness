const express = require('express');
const router = express.Router();
const { connection } = require('../../../middlewares/connection');
const ExercisesController = require('../../../controllers/exercises/exercises.controller');
const { assignExerciseHistory } = require('../../../helpers');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Exercises router ====`);
	next();
});

// Получить список упражнений
router.get('/', connection, async (req, res) => {
  const exercisesList = await ExercisesController.getAll(req.pg);

  res.json(exercisesList);
});

// Детализация упражнения
router.get('/:id', connection, async (req, res) => {
  const exercise = await ExercisesController.getOne(req.pg, { id: req.params.id });
  if (!exercise) return res.status(404).json({ error: 'Упражнение не найдено' });

  // Ищем историю тренировок для упражнения
  const exercisesHistory = await ExercisesController.getExerciseHistory(req.pg, { id: req.params.id });

  // Присваиваем значения, если нашли историю тренировок
  exercise.weight = null;
  exercise.total_calories = 0;
  exercise.history = [];
  
  if (exercisesHistory.length) assignExerciseHistory(exercise, exercisesHistory);

  res.json(exercise);
});

module.exports = router;
