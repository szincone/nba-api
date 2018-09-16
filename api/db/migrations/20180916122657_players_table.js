exports.up = function(knex, Promise) {
  return knex.schema.createTable("Players", table => {
    table.increments("id").primary();
    table.string("name", 120).notNullable();
    table.integer("ppg").notNullable();
    table.integer("apg").notNullable();
    table.integer("rpg").notNullable();
    table.integer("bpg").notNullable();
    table.integer("spg").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("Players");
};
