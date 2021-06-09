const mysql = require('mysql')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bar'
});

conn.connect(function (err) {
    if (err) throw err;

    console.log("Connection Created..");
})

module.exports = conn;
