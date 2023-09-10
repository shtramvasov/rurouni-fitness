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
  const routinesList = await RoutinesController.getAll(res.locals.pg, { user_id: req.user.user_id });
  if (!routinesList.length) return res.status(404).json({ error: 'Тренировочных программ не найдено' });
  
  res.json(routinesList);
}));

// Получить список активных программ тренировок
router.get('/active', connection (async (req, res) => {
  const activeRoutinesList = await RoutinesController.getAllActive(res.locals.pg, { user_id: req.user.user_id });
  if (!activeRoutinesList.length) return res.status(404).json({ error: 'Активных тренировочных программ не найдено' });
  
  res.json(activeRoutinesList);
}));

// Детализация программы тренировок
router.get('/:id', connection (async (req, res) => {
  const routine = await RoutinesController.getOne(res.locals.pg, { 
    routine_id: req.params.id,  
    user_id: req.user.user_id 
  });
  if (!routine) return res.status(404).json({ error: 'Тренировочной программы не найдено' });
  
  res.json(routine);
}));

module.exports = router;