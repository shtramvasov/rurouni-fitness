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
};

module.exports = ExercisesController;