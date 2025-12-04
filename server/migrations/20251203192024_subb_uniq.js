/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
        .alterTable('ac_sub', function(table){
            table.unique(['handle', 'contest_id','problem_index']);
        });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema
        .alterTable('ac_sub', function(table){
            table.dropUnique(['handle', 'contest_id','problem_index']);
        });
  
};
