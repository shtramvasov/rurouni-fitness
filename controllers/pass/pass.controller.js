class PassController {

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
};

module.exports = PassController;