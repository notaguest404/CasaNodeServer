const db = require('mysql');

const connection = db.createConnection({
    host     : 'localhost',
    database : 'backoffice_feralbyte',
    user     : 'root',
    password : 'admin',
    timezone : 'UTC+00:00',
    port: 3306
})

module.exports = connection;