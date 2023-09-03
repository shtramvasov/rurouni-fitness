const pool = require('../database');

async function connection(req, res, next) {
  let pg = null;

  try {
    pg = await pool.connect();
    req.pg = pg;

    await next();
  } catch (error) {
      console.error(error);
      next(error);
  } finally {
      pg && pg.release();
  }
}

async function transaction(req, res, next) {
  let pg = null;

  try {
    pg = await pool.connect();
    req.pg = pg;
    await pg.query('begin')

    await next();
    await pg.query('commit');
  } catch (error) {
      await pg.query('rollback');
      console.error(error);
      next(error);
  } finally {
      pg && pg.release();
  }
}

module.exports = { connection, transaction };