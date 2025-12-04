/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
        .alterTable('contests', function(table) {
            table.unique(['title', 'platform']);
        });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema
        .alterTable('contests', function(table){
            table.dropUnique(['title', 'platform']);

        });
  
};
