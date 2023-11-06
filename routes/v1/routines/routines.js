const express = require('express');
const router = express.Router();
const { connection, transaction } = require('../../../middlewares/connection');
const RoutinesController = require('../../../controllers/routines/routines.controller');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Routines router ====`);
	next();
});

// Получить список программ тренировок
router.get('/', connection (async (req, res) => {
  const routinesList = await RoutinesController.getAll(res.locals.pg);
  if (!routinesList.length) return res.status(404).json({ message: 'Тренировочных программ не найдено' });
  
  res.json(routinesList);
}));

// Получить список активных программ тренировок
router.get('/active', connection (async (req, res) => {
  const activeRoutinesList = await RoutinesController.getAllActive(res.locals.pg, { user_id: req.user.user_id });
  if (!activeRoutinesList.length) return res.status(404).json({ message: 'Активных тренировочных программ не найдено' });
  
  res.json(activeRoutinesList);
}));

// Детализация программы тренировок
router.get('/:id', connection (async (req, res) => {
  const routine = await RoutinesController.getOne(res.locals.pg, { routine_id: req.params.id });
  if (!routine) return res.status(404).json({ message: 'Тренировочной программы не найдено' });
  
  res.json(routine);
}));

// Добавить программу тренировок
router.post('/', transaction (async (req, res) => {
  const pg = res.locals.pg;
  const { name, exercises } = req.body;

  // Валидации
  if (!name) return res.status(400).json({ message: 'Не передано название тренировки' })

  // Записывает программу тренировок 
  const routine = await RoutinesController.postRoutine(pg, { name });
  await RoutinesController.postUserRoutine(pg, { user_id: req.user.user_id, routine_id: routine.routine_id });
  
  // Добавляем упражнения, если пришли
  if(exercises && exercises.length) {
    for (let exercise of exercises ) {
      await RoutinesController.postRoutineExercise(pg, { 
        exercise_id: exercise, 
        routine_id: routine.routine_id 
      })
    }
  }

  res.json({ message: true, routine: routine.routine_id })
}));

// Прикрепить упражнения к программе тренировок
router.put('/:id', transaction (async (req, res) => {
  const pg = res.locals.pg;
  const { exercises } = req.body;
  const { id: routine_id } = req.params;

  // Валидации
  if (!exercises || !exercises.length) return res.status(400).json({ message: 'Не переданы упражнения' })

  // Проверяем, если ли у пользователя эта программа тренировок
  const isAllowed = await RoutinesController.getRoutineByUser(pg, { 
    user_id: req.user.user_id,
    routine_id
   });

  if(!isAllowed) return res.status(401).json({ message: 'Отказано в доступе' })

  // Добавляем упражнения
  for (let exercise of exercises ) {
    await RoutinesController.postRoutineExercise(pg, { 
      exercise_id: exercise, 
      routine_id
    });
  }

  res.json({ message: true, routine: routine_id })
}));

module.exports = router;