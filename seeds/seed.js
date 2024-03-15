/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      email: "email1",
      id: "id1",
      username: "username",
      password: "password",
    },
    {
      email: "email2",
      id: "id2",
      username: "username",
      password: "password",
    },
  ]);

  // movies", (table) => {
  //     table.bigIncrements("id").notNullable();
  //     table.string("user_id").notNullable();
  //     table.string("title").notNullable();
  //     table.string("poster_path").notNullable();
  //     table.float("vote_average").notNullable(); // Assuming vote_average is a float
  //     table.boolean("watch").defaultTo(false); // Adding default values
  //     table.boolean("watched").defaultTo(false);
  //     table.boolean("favorite").defaultTo(false);
  //     table.foreign("user_id").references("id").inTable("user"); //
  await knex("movies").del();
  await knex("movies").insert([
    {
      id: 1,
      user_id: "id1",
      title: "title",
      poster_path: "poster_path",
      vote_average: 4.5,
      watch: false,
      watched: false,
      favorite: true,
    },
  ]);
};
