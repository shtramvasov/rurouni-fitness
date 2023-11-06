class RoutinesController {

  static #routineQuery = `
    select 
      r.routine_id,
      r.name,
      ur.order,
      array_agg(json_build_object(
        'exercise_id', e.exercise_id,
        'exercise_name', e.name,
        'muscle_group', e.muscle_group,
        'units', e.units,
        'calories_per_rep', e.calories_per_rep,
        'personal_record', ue.personal_record
    )) as exercises
    from routine r
    left join routine_exercise re on re.routine_id = r.routine_id
    left join exercise e on e.exercise_id = re.exercise_id
    left join user_routine ur on ur.routine_id = r.routine_id 
    left join user_exercise ue on ue.exercise_id = e.exercise_id
    `;
  

  static async getAll(connection) {
    try {
      const query = this.#routineQuery + 'group by ur.order, r.routine_id, r.name'
      const routinesList = await connection.query(query);
      
      return routinesList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getAllActive(connection, params) {
    try {
      const query = this.#routineQuery + `
        where ur.user_id = $1 
        group by ur.order, r.routine_id, r.name
        order by ur.order nulls last`

      const activeRoutinesList = await connection.query(query, [params.user_id]);

      return activeRoutinesList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(connection, params) {
    try {
      const query = this.#routineQuery + 'where r.routine_id = $1 group by ur.order, r.routine_id, r.name'
      const routine = await connection.query(query, [params.routine_id]);

      return routine.rows[0];
    } catch (error) {
      throw error;
    }
  }
  static async getRoutineByUser(connection, params) {
    try {
      const routine = await connection.query(`
        select r.routine_id from "routine" r
        join user_routine ur on ur.routine_id = r.routine_id
        where ur.user_id = $1
        and ur.routine_id = $2`, 
        [params.user_id, params.routine_id]);

      return routine.rows[0];
    } catch (error) {
      throw error;
    }
  }


  static async getUserRoutine(connection, params) {
    try {
      const routine = await connection.query(`
        select * from user_routine where user_id = $1 and routine_id = $2`, 
        [params.user_id, params.routine_id]);

      return routine.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async postRoutine(connection, params) {
    try {
      const routine = await connection.query(`
        insert into "routine" (name) values ($1) returning *`, 
        [params.name]);

      return routine.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async postUserRoutine(connection, params) {
    try {
      const routine = await connection.query(`
        insert into user_routine (user_id, routine_id) values ($1, $2)`, 
        [params.user_id, params.routine_id]);

      return routine.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async postRoutineExercise(connection, params) {
    try {
      const routine = await connection.query(`
        insert into routine_exercise (exercise_id, routine_id) values ($1, $2)`, 
        [params.exercise_id, params.routine_id]);

      return routine.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = RoutinesController;