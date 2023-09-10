class SessionsController {

  static async getAll(connection) {
    try {
      const sessionsList = await connection.query(`
        select 
          s.session_id,
          r.name,
          s.created_on_tz,
          s.burned_calories,
          s.category
        from session s
        join routine r on r.routine_id = s.routine_id`
      );

      return sessionsList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getExercises(connection, params) {
    try {
      const exercisesList = await connection.query(`
        select * from exercise_session
        where exercise_id = $1
        order by created_on_tz desc`,
        [params.id]
      );

      return exercisesList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getSessionCount(connection, params) {
    try {
      const count = await connection.query(`
      select count(*) sessions from session where pass_id = $1`,
      [ params.pass_id ]
      );

      return count.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async postSession(connection, params) {
    try {
      const session = await connection.query(`
        insert into session
          (routine_id, pass_id, category, created_on_tz, burned_calories)
        values ($1, $2, $3, $4, $5) returning session_id`,
        [ params.routine_id, params.pass_id, params.category, params.date, params.burned_calories ]
      );
      
      return session.rows[0]
    } catch (error) {
      throw error;
    }
  }
};

module.exports = SessionsController;