const passport = require('passport');
const bcrypt = require('bcrypt'); 
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    pool.query('select * from "user" where username = $1', [username],  async (error, result) => {
      if (error) return done(error);

      if (result.rows.length === 0) {
        return done(null, false, { message: 'Неправильный юзернейм' });
      }

      const user = result.rows[0];

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return done(null, false, { message: 'Неправильный пароль' });
      }

      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
  pool.query('select user_id, username, is_active from "user" where user_id = $1', [id], (err, result) => {
    if (err) return done(err)
    
    const user = result.rows[0];
    done(null, user);
  });
});

module.exports = passport;

