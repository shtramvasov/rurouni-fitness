const express = require('express');
const router = express.Router();
const { connection } = require('../../../middlewares/connection');
const PassController = require('../../../controllers/pass/pass.controller');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Pass router ====`);
	next();
});

// Получить информацию о пропусках
router.get('/', connection, async (req, res) => {
  const passList = await PassController.getAll(req.pg);

  res.json(passList)
});

// Получить информацию о текущем пропуске
router.get('/active', connection, async (req, res) => {
  const pass = await PassController.getOne(req.pg);
  if (!pass) return res.status(404).json({ error: 'Активный пропуск не найден' })

  res.json(pass)
});

// Купить пропуск
router.post('/purchase', connection, async (req, res) => {
  const { amount } = req.body;

  if (!amount) return res.status(401).json({ error: 'Не передана плата за пропуск' })

  // Проверяем наличие активного пропуска
  const hasActivePass = await PassController.getOne(req.pg);
  if(!!hasActivePass) return res.status(401).json({ error: 'Уже имеется активный пропуск' });

  const pass = await PassController.purchasePass(req.pg, { amount });

  res.json({ message: true, pass: { pass_id: pass.pass_id, is_active: pass.is_active }})
});

module.exports = router;
