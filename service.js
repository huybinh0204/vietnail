const mysql = require('mysql');

const connection = mysql.createConnection({
    // host: "192.168.64.2",
    // user: "user",
    // password: "Abc123",
    // database: "vietnails_vip",
    // port: 3306,
    //-------
    host: "localhost",
    user: "root",
    password: "bYl@12345^^",
    database: "ntk_vietnails",
    port: 3306,
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('kn thanh cong!');
});

module.exports = connection;
