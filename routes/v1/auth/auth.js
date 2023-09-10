const express = require('express');
const router = express.Router();
const bcript = require('bcrypt');
const passport = require('../../../middlewares/passport-strategy');
const UsersController = require('../../../controllers/users/users.controller');
const { transaction } = require('../../../middlewares/connection');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Auth router ====`);
	next();
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Логин прошел успешно' });
});

router.post('/register', transaction (async (req, res) => {
  const { username, password } = req.body;

  if (!username) res.status(404).json({error: 'Не передан юзернейм'});
  if (!password) res.status(404).json({error: 'Не передан пароль'});

  const hasRegistered = await UsersController.getOne(res.locals.pg, { username });

  if(hasRegistered) res.status(400).json({error: 'Такой пользователь уже существует'});

  const passwordHash = await bcript.hash(password, 10);

  const user = await UsersController.postUser(res.locals.pg, { 
    username: username, 
    password: passwordHash 
  });

  res.json({
		message: true,
		user: { user_id: user.user_id, registration_date: user.created_on_tz },
	});
}));

module.exports = router;