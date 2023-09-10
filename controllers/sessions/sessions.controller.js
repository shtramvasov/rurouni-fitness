class SessionsController {

  static async getAll(connection, params) {
    try {
      const sessionsList = await connection.query(`
        select 
          s.session_id,
          s.user_id,
          s.pass_id,
          r.name,
          s.created_on_tz,
          s.burned_calories,
          s.category
        from session s
        join routine r on r.routine_id = s.routine_id
        where s.user_id = $1`,
        [params.user_id]
      );

      return sessionsList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getExercises(connection, params) {
    try {
      const exercisesList = await connection.query(`
        select * from exercise_session es
        join session s on s.session_id = es.session_id
        where es.exercise_id = $1
          and s.user_id = $2
        order by es.created_on_tz desc`,
        [params.exercise_id, params.user_id]
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
          (routine_id, user_id, pass_id, category, created_on_tz, burned_calories)
        values ($1, $2, $3, $4, $5, $6) returning session_id`,
        [ params.routine_id, params.user_id, params.pass_id, params.category, params.date, params.burned_calories ]
      );
      
      return session.rows[0]
    } catch (error) {
      throw error;
    }
  }
};

module.exports = SessionsController;