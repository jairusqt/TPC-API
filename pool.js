const mysql = require('mysql');

// MySQL connection configuration
const dbConfig = {
  connectionLimit: 10,
  host: '172.16.2.16',
  user: 'sdroot',
  password: 'cmisd032018',
  database: 'tpc_dbs',
  waitForConnections: true,
  reconnect: true,
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to handle reconnection
function handleDisconnect() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000); // Retry connection after 2 seconds
    } else {
      console.log('Connected to MySQL');
      connection.release(); // Release the connection
    }
  });

  // Handle MySQL server disconnection
  pool.on('error', (err) => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Reconnecting to MySQL...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

// Start the initial connection
handleDisconnect();

// Export the connection pool
module.exports = pool;
