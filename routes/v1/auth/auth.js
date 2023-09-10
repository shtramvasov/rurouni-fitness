const express = require('express');
const router = express.Router();
const passport = require('../../../middlewares/passport-strategy');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Auth router ====`);
	next();
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Логин прошел успешно' });
});

module.exports = router;