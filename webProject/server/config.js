var connectionString = process.env.DATABASE_URL || 'postgres://postgres:rh871530@localhost:5432/expenses';

module.exports = connectionString;
