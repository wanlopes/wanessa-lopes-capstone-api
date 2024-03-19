const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("movies").del();
  await knex("user").del();

  await knex("user").insert([
    {
      email: "email1",
      id: "id1",
      username: "flaf",
      password: await hashPassword("1"),
    },
    {
      email: "email2",
      id: "id2",
      username: "lopeswan",
      password: await hashPassword("1"),
    },
  ]);

  await knex("movies").insert([
    {
      id: 597,
      user_id: "id1",
      title: "Titanic",
      poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
      vote_average: 7.904,
      watch: true,
      watched: false,
      favorite: false,
    },
    {
      id: 637,
      user_id: "id1",
      title: "Life Is Beautiful",
      poster_path: "/74hLDKjD5aGYOotO6esUVaeISa2.jpg",
      vote_average: 8.452,
      watch: false,
      watched: true,
      favorite: true,
    },
    {
      id: 313369,
      user_id: "id1",
      title: "La La Land",
      poster_path: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
      vote_average: 7.901,
      watch: false,
      watched: true,
      favorite: true,
    },
    {
      id: 22311,
      user_id: "id1",
      title: "The Inglorious Bastards",
      poster_path: "/8f7PoX7TveyKrndh3bZZcBvR55Z.jpg",
      vote_average: 6.21,
      watch: false,
      watched: false,
      favorite: true,
    },
    {
      id: 872585,
      user_id: "id1",
      title: "Oppenheimer",
      poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      vote_average: 8.113,
      watch: true,
      watched: false,
      favorite: false,
    },
    {
      id: 915935,
      user_id: "id1",
      title: "Anatomy of a Fall",
      poster_path: "/kQs6keheMwCxJxrzV83VUwFtHkB.jpg",
      vote_average: 7.655,
      watch: true,
      watched: false,
      favorite: false,
    },
    {
      id: 693134,
      user_id: "id1",
      title: "Dune: Part Two",
      poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      vote_average: 8.403,
      watch: true,
      watched: false,
      favorite: false,
    },
    {
      id: 692299,
      user_id: "id1",
      title: "Mel Gibson's 'Braveheart': A Filmmaker's Passion",
      poster_path: "/abJlt6CzkFBpEXWDiag5XWWkHYL.jpg",
      vote_average: 7.2,
      watch: false,
      watched: false,
      favorite: true,
    },
    {
      id: 354912,
      user_id: "id1",
      title: "Coco",
      poster_path: "/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
      vote_average: 8.214,
      watch: false,
      watched: true,
      favorite: true,
    },
  ]);
};

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
