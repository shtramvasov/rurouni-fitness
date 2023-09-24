const express = require('express');
const router = express.Router();
const bcript = require('bcrypt');
const passport = require('../../../middlewares/passport-strategy');
const UsersController = require('../../../controllers/users/users.controller');
const { connection, transaction } = require('../../../middlewares/connection');

router.use((req, res, next) => {
	console.log(`[NOTICE] ==== Auth router ====`);
	next();
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username) return res.status(404).json({error: 'Не передан юзернейм'});
  if (!password) return res.status(404).json({error: 'Не передан пароль'});

  passport.authenticate('local', (err, user) => {
    if (err) return next(err);    
    if (!user) return res.status(401).json({ message: 'Неверный логин или пароль' });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({
				message: 'Логин прошел успешно',
				user: { user_id: req.user.user_id, username: req.user.username },
				isAuth: true,
			});
    });
  })(req, res, next);
});

router.post('/register', transaction (async (req, res) => {
  const { username, password } = req.body;

  if (!username) return res.status(404).json({message: 'Не передан юзернейм'});
  if (!password) return res.status(404).json({message: 'Не передан пароль'});

  const hasRegistered = await UsersController.getOne(res.locals.pg, { username });

  if(hasRegistered) res.status(400).json({message: 'Такой пользователь уже существует'});
  
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

// Проверка авторизации пользователя
router.get('/check', connection (async (req, res) => {
  if(req.isAuthenticated()) {    
    return res.json({
      isAuth: true,
      user: req.user
    })
  }

  res.json({
    isAuth: false,
    user: null
  })
}));

module.exports = router;