const express = require('express');
const router = express.Router();

// Упражнения
const execisesRouter = require('./exercises/exercises');

// Календарь посещений
const sessionsRouter = require('./sessions/sessions');

// Список тренировочных программ
const routinesRouter = require('./routines/routines');

// Пропуска тренировок
const passRouter = require('./pass/pass');

router.use('/exercises', execisesRouter);
router.use('/sessions', sessionsRouter);
router.use('/routines', routinesRouter);
router.use('/pass', passRouter);

module.exports = router;
