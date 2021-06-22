const db = require('mysql');

const connection = db.createConnection({
    host     : 'localhost',
    database : 'backoffice_feralbyte',
    user     : 'root',
    password : '',
    timezone : 'UTC+00:00'
})

module.exports = connection;