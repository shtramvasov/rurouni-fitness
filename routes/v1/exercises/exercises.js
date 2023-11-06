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
router.get('/', connection (async (req, res) => {
  const exercisesList = await ExercisesController.getAll(res.locals.pg);

  res.json(exercisesList);
}));

// Детализация упражнения
router.get('/:exercise_id', connection (async (req, res) => {
  const exercise = await ExercisesController.getOne(res.locals.pg, {
		user_id: req.user.user_id,
		exercise_id: req.params.exercise_id,
	});
  if (!exercise) return res.status(404).json({ message: 'Упражнение не найдено' });

  // Ищем историю тренировок для упражнения
  const exercisesHistory = await ExercisesController.getExerciseHistory(res.locals.pg, {
    user_id: req.user.user_id, 
    exercise_id: req.params.exercise_id 
  });

  // Присваиваем значения, если нашли историю тренировок
  exercise.weight = null;
  exercise.total_calories = 0;
  exercise.history = [];
  
  if (exercisesHistory.length) assignExerciseHistory(exercise, exercisesHistory);

  res.json(exercise);
}));

module.exports = router;
