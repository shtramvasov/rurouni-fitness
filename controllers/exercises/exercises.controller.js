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
      const exercise = await connection.query('select * from exercise where exercise_id = $1', [params.id]);

      return exercise.rows[0];     
    } catch (error) {
      throw error;
    }
  }

  static async getExerciseHistory(connection, params) {
    try {
      const exercisesHistory = await connection.query(`
        select * from exercise_session
        where exercise_id = $1
        order by created_on_tz desc`,
        [params.id]
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
        update exercise
        set personal_record = 
          case
            when personal_record is null or $1 > personal_record then $1
            else personal_record 
          end
        where exercise_id = $2`,
        [ params.weight, params.exercise_id ]
      );
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ExercisesController;