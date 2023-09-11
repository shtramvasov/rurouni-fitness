class RoutinesController {

  static #routineQuery = `
    select 
      r.routine_id,
      r.name,
      ur.is_active,
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
    where ur.user_id = $1 `;
  

  static async getAll(connection, params) {
    try {
      const query = this.#routineQuery + 'group by r.routine_id, r.name, ur.is_active'
      const routinesList = await connection.query(query, [params.user_id]);
      
      return routinesList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getAllActive(connection, params) {
    try {
      const query = this.#routineQuery + 'and ur.is_active = true group by r.routine_id, r.name, ur.is_active'
      const activeRoutinesList = await connection.query(query, [params.user_id]);

      return activeRoutinesList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(connection, params) {
    try {
      const query = this.#routineQuery + 'and r.routine_id = $2 group by r.routine_id, r.name, ur.is_active'
      const routine = await connection.query(query, [params.user_id, params.routine_id]);

      return routine.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = RoutinesController;