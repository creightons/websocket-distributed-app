const { server: config } = require('./config/config');
const path = require('path');
const filepath = path.join(__dirname, config.sqliteFile);

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: filepath,
    },
});

module.exports = knex;
