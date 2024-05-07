import mysql from 'mysql2';

const database = "job_tracker";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database
}).promise();

export default pool;