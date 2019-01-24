exports.up = function updateDatabase(knex) {
  return knex.schema.createTable('Players', (table) => {
    table.increments('id').primary();
    table.string('name', 120).notNullable();
    table.integer('pointsPerGame').notNullable();
    table.integer('assistsPerGame').notNullable();
    table.integer('totalBoardsPerGame').notNullable();
    table.integer('blocksPerGameCol').notNullable();
    table.integer('stealsPerGameCol').notNullable();
  });
};

exports.down = function rollBackMigrations(knex) {
  return knex.schema.dropTableIfExists('Players');
};
