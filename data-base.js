//importation du module mysql2
const mysql = require('mysql');



//Creation à la connexion
const db = mysql.createConnection({
    host: 'localhost',
    port:'3306', 
    user: 'web',
    password: '123',
    database: 'discotheque'
});

module.exports = db