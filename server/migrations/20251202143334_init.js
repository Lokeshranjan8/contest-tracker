/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
        .createTable('users',(table)=>{
            table.increments('id').primary();
            table.string('email',255).unique().notNullable();
            table.string('password',255).notNullable();
        })

        .createTable('profiles',(table)=>{
            table.increments('id').primary();
            table.string('handle').unique().notNullable();
            table.integer('rating');
            table.integer('max_rating');
            table.string('avatar');
            table.string('rank');
            table.timestamp('last_online');

        })

        .createTable('ac_sub',(table)=>{
            table.increments('id').primary();
            table.integer('problem_rating');
            table.specificType('tags','text[]');
            table.timestamp('creation_time');

            table.string('handle',255)
                .notNullable()
                .references('handle')
                .inTable('profiles')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

            table.string('contest_id',255);
            table.string('problem_index',255);

        })

        .createTable('contests',(table)=>{
            table.increments('id').primary();
            table.string('title').unique().notNullable();
            table.string('platform').notNullable();
            table.timestamp('start_time').notNullable();
            table.string('duration').notNullable();
            table.string('link').notNullable();
        });
  
};




/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema
    .dropTable("contests")
    .dropTable("ac_sub")
    .dropTable("profiles")
    .dropTable("users");
  
};
