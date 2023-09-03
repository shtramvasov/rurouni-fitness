class RoutinesController {

  static #routineQuery = `
    select 
      r.routine_id,
      r.name,
      r.is_active,
      array_agg(json_build_object(
        'exercise_id', e.exercise_id,
        'exercise_name', e.name,
        'muscle_group', e.muscle_group,
        'units', e.units,
        'calories_per_rep', e.calories_per_rep,
        'personal_record', e.personal_record
    )) as exercises
    from routine r
    left join routine_exercise re on re.routine_id = r.routine_id
    join exercise e on e.exercise_id = re.exercise_id `;
  

  static async getAll(connection) {
    try {
      const query = this.#routineQuery + 'group by r.routine_id, r.name'
      const routinesList = await connection.query(query);
      
      return routinesList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getAllActive(connection) {
    try {
      const query = this.#routineQuery + 'where r.is_active = true group by r.routine_id, r.name'
      const activeRoutinesList = await connection.query(query);

      return activeRoutinesList.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(connection, params) {
    try {
      const query = this.#routineQuery + 'where r.routine_id = $1 group by r.routine_id, r.name'
      const routine = await connection.query(query, [params.id]);

      return routine.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = RoutinesController;