const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const Database = require('better-sqlite3');
require('dotenv').config();

export const db = new Database(process.env.DB_FILE);
console.log('Database connected successfully.');

const schemaPath = join('database', 'schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');
db.exec(schema);
