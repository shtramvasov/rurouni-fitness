const express = require('express');
const router = express.Router();
const { connection } = require('../../../middlewares/connection');
const RoutinesController = require('../../../controllers/routines/routines.controller');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Routines router ====`);
	next();
});

// Получить список программ тренировок
router.get('/', connection (async (req, res) => {
  const routinesList = await RoutinesController.getAll(res.locals.pg);
  if (!routinesList.length) return res.status(404).json({ error: 'Тренировочных программ не найдено' });
  
  res.json(routinesList);
}));

// Получить список активных программ тренировок
router.get('/active', connection (async (req, res) => {
  const activeRoutinesList = await RoutinesController.getAllActive(res.locals.pg);
  if (!activeRoutinesList.length) return res.status(404).json({ error: 'Активных тренировочных программ не найдено' });
  
  res.json(activeRoutinesList);
}));

// Детализация программы тренировок
router.get('/:id', connection (async (req, res) => {
  const routine = await RoutinesController.getOne(res.locals.pg, { id: req.params.id });
  if (!routine) return res.status(404).json({ error: 'Тренировочной программы не найдено' });
  
  res.json(routine);
}));

module.exports = router;