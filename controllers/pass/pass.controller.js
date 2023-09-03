class PassController {

  static async getAll(connection) {
    try {
      const pass = await connection.query(`
        select
          p.*,
          count(*) sessions
        from pass p
        left join session s on s.pass_id = p.pass_id
        group by p.pass_id`
      );
      
      return pass.rows;
    } catch (error) {
      throw error;
    }
  } 

  static async getOne(connection) {
    try {
      const pass = await connection.query(`
        select
          p.*,
          count(*) sessions
        from pass p
        left join session s on s.pass_id = p.pass_id
        where p.is_active = true
        group by p.pass_id`
      );
      
      return pass.rows[0]
    } catch (error) {
      throw error;
    }
  } 

  static async getActiveId(connection) {
    try {
      const pass = await connection.query('select pass_id from pass where is_active = true');

      return pass.rows[0]
    } catch (error) {
      throw error;
    }
  }

  static async purchasePass(connection, params) {
    try {
      const pass = await connection.query('insert into pass (amount) values ($1) returning *', [ params.amount ]);

      return pass.rows[0]
    } catch (error) {
      throw error;
    }
  }

  static async closePass(connection, params) {
    try {
      await connection.query(`
        update pass set (end_on_tz, is_active) = (now(), false) where pass_id = $1`,
        [ params.pass_id ]
      );
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PassController;