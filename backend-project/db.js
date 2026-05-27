// Database Connection Setup
const mysql = require('mysql2/promise');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'mk_cars',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(conn => {
    console.log('Connected to MySQL Database!');
    conn.release();
  })
  .catch(err => {
    console.log('Database Connection Error:', err.message);
  });

module.exports = pool;
