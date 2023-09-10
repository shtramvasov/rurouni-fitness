module.exports.up = async (connection) => {
        try {
          await connection.query(`
            insert into exercise values (1, 'Жим лежа', 'Грудь', 'кг', 2);
            insert into exercise values (2, 'Становая тяга', 'Спина', 'кг', 3);
            insert into exercise values (3, 'Присед', 'Ноги', 'кг', 3);

            insert into "user" values (1, 'admin', '202cb962ac59075b964b07152d234b70', now(), true);

            insert into pass values (1, 1, now(), null, 1400, true);

            insert into "routine" values (1, 'День Груди');
            insert into "routine" values (2, 'День Спины');

            insert into "session" values (1, 2, 1, 1, now(), 1, 120);
            insert into "session" values (2, 2, 1, 1, now() + interval '1 day', 1, 120);

            insert into routine_exercise values (1, 1, 1);
            insert into routine_exercise values (2, 2, 1);
            insert into routine_exercise values (3, 1, 2);

            insert into exercise_session values (1, 1, 1, now(), 100, 95, 3, 3);
            insert into exercise_session values (2, 2, 1, now(), 100, 95, 3, 3);
            insert into exercise_session values (3, 1, 2, now(), 100, 95, 3, 3);

            insert into user_exercise values (1, 1, 1, 95);
            insert into user_exercise values (2, 1, 2, 120);
            insert into user_exercise values (3, 1, 3, 100);

            insert into user_routine values (1, 1, 1, true);
            insert into user_routine values (2, 1, 2, false);
          `);
        } catch (error) {
            throw error;
        }
      };
      
      module.exports.down = async (connection) => {
        try {
          await connection.query(`
            delete from exercise_session;
            delete from routine_exercise;
            delete from user_exercise;
            delete from user_routine;
            delete from "session";
            delete from exercise;
            delete from pass;
            delete from "user";
            delete from "routine";
          `);
        } catch (error) {
            throw error;
        }
      };