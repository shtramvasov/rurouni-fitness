const express = require('express');
const router = express.Router();
const pool = require('../../../database');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Exercises router ====`);
	next();
});

// Получить список упражнений
router.get('/', async (req, res, next) => {
	let pg = await pool.connect();

	try {
		const exercisesList = (await pg.query('select * from exercise')).rows;

		res.json(exercisesList);
	} catch (error) {
		  console.log(error);
		  next(error);
	} finally {
		  pg.release();
	}
});

// Детализация упражнения
router.get('/:id', async (req, res, next) => {
	let pg = await pool.connect();

	try {
		const exercise = (await pg.query('select * from exercise where exercise_id = $1', [req.params.id])).rows[0];

		if (!exercise) return res.status(404).json({ error: 'Упражнение не найдено' });

		// Ищем историю тренировок для упражнения
		const exercisesHistory = (
			await pg.query(`
        select * from exercise_session
        where 
          exercise_id = $1
        order by created_on_tz desc`,
        [req.params.id]
    )).rows;

		exercise.weight = null;
		exercise.total_calories = 0;
		exercise.history = [];

		// Присваиваем значения, если нашли историю тренировок
		if (exercisesHistory.length) {
			for (session of exercisesHistory) {
				exercise.history.push({
					id: session.session_id,
					date: session.date,
					weight: Number(session.weight),
				});

				exercise.total_calories += Number(session.burned_calories);
			}

			exercise.weight = exercisesHistory.at(0).weight;
		}

		res.json(exercise);
	} catch (error) {
		  console.log(error);
		  next(error);
	} finally {
		  pg.release();
	}
});

module.exports = router;
