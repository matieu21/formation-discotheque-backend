const mysql = require('mysql');

const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'web',
    password: '123',
    database: 'discotheque'
});

module.exports = connexion