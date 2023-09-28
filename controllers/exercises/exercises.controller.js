class ExercisesController {

  static async getAll(connection) {
    try {
      const exercisesList = await connection.query('select * from exercise');

      return exercisesList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(connection, params) {
    try {
      const exercise = await connection.query(`
        select 
          e.*, ue.personal_record
        from exercise e 
        left join user_exercise ue 
          on e.exercise_id = ue.exercise_id
          and ue.user_id = $1
        where e.exercise_id = $2`, 
        [params.user_id, params.exercise_id]);

      return exercise.rows[0];     
    } catch (error) {
      throw error;
    }
  }

  static async getExerciseHistory(connection, params) {
    try {
      const exercisesHistory = await connection.query(`
        select * from exercise_session es
        join session s on es.session_id = s.session_id
        where es.exercise_id = $1
          and s.user_id = $2
        order by es.created_on_tz desc`,
        [params.exercise_id, params.user_id]
      );

      return exercisesHistory.rows;
    } catch (error) {
      throw error;
    }
  }

  static async postExerciseHistory(connection, params) {
    try {
      await connection.query(`
        insert into exercise_session
          (exercise_id, session_id, created_on_tz, weight, sets, reps, burned_calories)
        values ($1, $2, $3, $4, $5, $6, $7)`,
        [ params.exercise_id, params.session_id, params.date, params.weight, params.sets, params.reps, params.burned_calories ]
      );
    } catch (error) {
      throw error;
    }
  }

  static async updatePersonalRecord(connection, params) {
    try {
      await connection.query(`
        insert into user_exercise
          (user_id, exercise_id, personal_record)
        values ($1, $2, $3)
        on conflict on constraint uq_user_exercise do 
        update set
        personal_record = 
        case
          when excluded.personal_record is null or $3 > excluded.personal_record then $3
          else excluded.personal_record 
        end
        where user_exercise.user_id = $1
        and user_exercise.exercise_id = $2`,
        [ params.user_id, params.exercise_id, params.weight ]
      );
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ExercisesController;