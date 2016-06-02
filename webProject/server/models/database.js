var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:rh871530@localhost:5432/expenses';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE expenses(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, amount MONEY, transactiondate DATE, complete BOOLEAN)');
query.on('end', function() { client.end(); });
