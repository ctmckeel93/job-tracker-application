import mysql from 'mysql2';

const database = "bible_verses";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database
}).promise();

export default pool;