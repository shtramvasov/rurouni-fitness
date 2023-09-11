class UsersController {

  static async getOne(connection, params) {
    try {
      const user = await connection.query(`
        select user_id from "user" where username = $1`, 
        [params.username]
      );

      return user.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async postUser(connection, params) {
    try {
      const user = await connection.query(`
        insert into "user" (username, password, created_on_tz)values ($1, $2, now())`,
        [params.username, params.password]
      );

      return user.rows[0]
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersController;