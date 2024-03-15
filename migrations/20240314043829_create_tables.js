/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.string("email").notNullable().primary();
      table.string("id").notNullable().unique();
      table.string("username").notNullable();
      table.string("password").notNullable();
    })
    .createTable("movies", (table) => {
      table.bigIncrements("id").notNullable();
      table.string("user_id").notNullable();
      table.string("title").notNullable();
      table.string("poster_path").notNullable();
      table.float("vote_average").notNullable();
      table.boolean("watch").defaultTo(false);
      table.boolean("watched").defaultTo(false);
      table.boolean("favorite").defaultTo(false);
      table.foreign("user_id").references("id").inTable("user");
    })
    .then(() =>
      knex.schema.alterTable("movies", (table) => {
        table.index("user_id");
      })
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("movies").dropTable("user");
};
