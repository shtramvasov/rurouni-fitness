const express = require('express');
const router = express.Router();
const pool = require('../../../database');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Pass router ====`);
	next();
});

// Получить информацию о текущем пропуске
router.get('/', async (req, res, next) => {
  let pg = await pool.connect();

  try {
    const pass = (await pg.query(`
      select 
        p.*,
        count(*) sessions
      from pass p
      left join session s on s.pass_id = p.pass_id
      where p.is_active = true
      group by p.pass_id`
    )).rows[0]

    if (!pass) return res.status(404).json({ error: 'Пропуск не найден' })

    res.json(pass)
  } catch (error) {
      console.log(error);
      next(error);
  } finally {
      pg.release();
  }
});

module.exports = router;
