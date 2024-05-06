import mysql from 'mysql';

const database = "job-tracker";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: database

});

db.connect(err => {
    if (err) {
        console.error("Something went wrong connecting to mysql");
    } else {
        console.log(`Connected to mysql database: ${database}`);
    }
})

export default db;