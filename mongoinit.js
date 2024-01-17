// Read values from the environment variable
// Since this is Javascript you can use process.env.USERNAME instead
var username = 'mongouser';
var password = 'mongopassword';
var database = 'mydatabase';

// set the authentication database
db = db.getSiblingDB(database)

// Create a user with the specified username, password, and database
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME || username,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD || password,
  roles: [{ role: 'readWrite', db: process.env.MONGO_INITDB_DATABASE || 'myapp' }]
});

// Enable authentication in the MongoDB configuration
db.adminCommand({ setParameter: 1, authenticationMechanisms: { 'SCRAM-SHA-1': true } });

// Exit the mongo shell
quit();