const express = require('express');
const router = express.Router();
const { connection } = require('../../../middlewares/connection');
const PassController = require('../../../controllers/pass/pass.controller');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Pass router ====`);
	next();
});

// Получить информацию о текущем пропуске
router.get('/', connection, async (req, res) => {
  const pass = await PassController.getOne(req.pg);
  if (!pass) return res.status(404).json({ error: 'Активный пропуск не найден' })

  res.json(pass)
});

module.exports = router;
