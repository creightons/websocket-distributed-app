const knex = require('./knex-setup');

// Create table. Need to chain a query for Knex to actually create
// the Sqlite file.
knex.schema.createTableIfNotExists('messages', function(table) {
    table.increments();
    table.string('text');
    table.timestamps();
})
    .then(() => { return knex.select().from('messages'); })
    .catch(err => console.log('err = ', err))
    .then(() => process.exit());
