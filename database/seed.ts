const { readFileSync } = require('node:fs');
const { join } = require('node:path');
require('dotenv').config();
const database = require('./db.ts');

const seedPath = join('database', 'seed.sql');
const seed = readFileSync(seedPath, 'utf-8');
database.exec(seed);

console.log('DB seeded with example data');
