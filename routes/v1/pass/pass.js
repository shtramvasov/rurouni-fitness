const express = require('express');
const router = express.Router();
const { connection, transaction } = require('../../../middlewares/connection');
const PassController = require('../../../controllers/pass/pass.controller');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Pass router ====`);
	next();
});

// Получить информацию о пропусках
router.get('/', connection (async (req, res) => {
  const passList = await PassController.getAll(res.locals.pg, { user_id: req.user.user_id });

  res.json(passList)
}));

// Получить информацию о текущем пропуске
router.get('/active', connection (async (req, res) => {
  const pass = await PassController.getOne(res.locals.pg, { user_id: req.user.user_id });
  if (!pass) return res.status(404).json({ error: 'Активный пропуск не найден' })

  res.json(pass)
}));

// Купить пропуск
router.post('/purchase', transaction (async (req, res) => {
  const { amount } = req.body;

  if (!amount) return res.status(401).json({ error: 'Не передана плата за пропуск' })

  // Проверяем наличие активного пропуска
  const hasActivePass = await PassController.getOne(res.locals.pg, { user_id: req.user.user_id });
  if(!!hasActivePass) return res.status(401).json({ error: 'Уже имеется активный пропуск' });

  const pass = await PassController.purchasePass(res.locals.pg, { amount, user_id: req.user.user_id });

  res.json({ message: true, pass: { pass_id: pass.pass_id, is_active: pass.is_active }})
}));

// Закрыть пропуск
router.post('/close', transaction (async (req, res) => {
  // Проверяем наличие активного пропуска
  const hasActivePass = await PassController.getOne(res.locals.pg, { user_id: req.user.user_id });
  
  if(!!hasActivePass) { 
    await PassController.closePass(res.locals.pg, { user_id: req.user.user_id });
   } else {
     return res.status(401).json({ error: 'Нет активного пропуска на данный момент' });
   };

  res.json({ message: true})
}));

module.exports = router;
