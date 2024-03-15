/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("list_movies", (table) => {
    table.increments("id").primary();
    table
      .integer("user_list_id")
      .unsigned()
      .references("user_list.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
      table
        .integer("movies_id")
        .unsigned()
        .references("movies.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("user_list_id")
        .unsigned()
        .references("user_list.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");  

    table.string("name").notNullable();
    table.string("name").notNullable();
    table.string("name").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("list_movies");
};
