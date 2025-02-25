'use strict';

const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// const DB_URL = process.env.DATABASE_URL;

if (!process.env.DATABASE_URL) {
  throw new Error('Please set the DATABASE_URL environment variable');
}

const options = {
  connectionString: process.env.DATABASE_URL,
  /* ssl: {
   rejectUnauthorized: false,
   },*/
};

const db = new pg.Pool(options);

module.exports = db;
