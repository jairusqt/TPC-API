const mysql = require('mysql');

// Database configuration
const db_config = {
  host: '172.16.2.16',
  user: 'sdroot',
  password: 'cmisd032018',
  database: 'tpc_dbs'
};

let connection;

function handleDisconnect() {
  // Create a new connection using the configuration
  connection = mysql.createConnection(db_config);

  // Connect to the database
  connection.connect(function(err) {
    if (err) {
      console.error('Error when connecting to db:', err);
      // Introduce a delay before attempting to reconnect
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to database as id ' + connection.threadId);
    }
  });

  // Handle connection errors
  connection.on('error', function(err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconnect if the connection is lost
      handleDisconnect();
    } else if (err.code === 'ECONNREFUSED') {
      // Handle connection refused error and attempt reconnection
      console.error('Connection refused, retrying in 2 seconds...');
      setTimeout(handleDisconnect, 2000);
    } else {
      // Throw an error for any other issues
      throw err;
    }
  });
}

// Initialize the connection
handleDisconnect();

// Export the connection for use in other modules
module.exports = connection;
