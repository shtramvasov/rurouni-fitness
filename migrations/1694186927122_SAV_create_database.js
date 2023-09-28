module.exports.up = async (connection) => {
        try {
          await connection.query(`
            create table exercise (
              exercise_id serial primary key not null,
              name varchar(64) not null,
              muscle_group varchar(16) default null,
              units varchar(2) default 'кг',
              calories_per_rep numeric(2) not null,
              
              constraint uq_exercise_name unique (name)
            );

            create table "user" (
           	  user_id serial primary key not null,
           	  username varchar(64) not null,
           	  password varchar(512) not null,
           	  created_on_tz timestamptz not null,
           	  is_active boolean default true not null,
           	 
           	  constraint uq_user_username unique (username)
           );
            
            
            create table routine (
              routine_id serial primary key not null,
              name varchar(64) not null
            );
            
            
            create table pass (
              pass_id serial primary key not null,
              user_id integer not null,
              created_on_tz timestamptz default now() not null,
              end_on_tz timestamptz default null,
              amount numeric(4) default 1400 not null,
              is_active boolean default true not null,

              constraint fk_pass_user_id foreign key (user_id) references "user"(user_id)
            );
            create unique index uq_pass_is_active on pass(is_active, user_id) where is_active = true;
            
            
            create table session (
              session_id serial primary key not null,
              exercise_id integer not null,
              routine_id integer not null,
              user_id integer not null,
              pass_id integer not null,
              created_on_tz timestamptz not null,
              category numeric(1) not null default 1,
              burned_calories numeric(3) not null,
              
              constraint fk_user_exercise_user_id foreign key (user_id) references "user"(user_id),
              constraint fk_user_exercise_uexercise_id foreign key (exercise_id) references exercise(exercise_id),
              constraint uq_session_user_exercise unique (user_id, exercise_id)
            );

            create table user_exercise (
              ue_id serial primary key not null,
              user_id integer not null,
              exercise_id integer not null,
              personal_record numeric(3) default null,
              
              constraint uq_user_exercise unique (user_id, exercise_id)
            );
            


            create table user_routine (
              ur_id serial primary key not null,
              user_id integer not null,
              routine_id integer not null,

              constraint fk_user_routine_user_id foreign key (user_id) references "user"(user_id),
              constraint fk_user_routine_routine_id foreign key (routine_id) references "routine"(routine_id),
              constraint uq_user_routine unique (user_id, routine_id)
            );
            
            
            create table exercise_session (
              es_id serial primary key not null,
              exercise_id integer not null,
              session_id integer not null,
              created_on_tz timestamptz not null,
              burned_calories numeric(3) not null,
              weight numeric(3) not null,
              sets numeric(3) not null,
              reps numeric(3) not null,
              
              constraint fk_exercise_session_exercise_id foreign key (exercise_id) references exercise(exercise_id),
              constraint fk_exercise_session_session_id foreign key (session_id) references session(session_id),
              constraint uq_exercise_session_session unique (exercise_id, session_id, created_on_tz)
            );
            create index idx_exercise_session_date on exercise_session(created_on_tz);
            
            
            create table routine_exercise (
              re_id serial primary key not null,
              exercise_id integer not null,
              routine_id integer not null,
              
              constraint fk_routine_exercise_exercise_id foreign key (exercise_id) references exercise(exercise_id),
              constraint fk_routine_exercise_routine_id foreign key (routine_id) references routine(routine_id),
              constraint uq_routine_exercise_unique unique (exercise_id, routine_id)
            );
          `);
        } catch (error) {
            throw error;
        }
      };
      
      module.exports.down = async (connection) => {
        try {
          await connection.query(`
          drop table exercise_session;
          drop table routine_exercise;
          drop table user_routine;
          drop table user_exercise;
          drop table exercise;
          drop table session;
          drop table routine;
          drop table pass;
          drop table "user";
          `);
        } catch (error) {
            throw error;
        }
      };