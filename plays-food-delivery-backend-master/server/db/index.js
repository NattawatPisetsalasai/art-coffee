import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const dbConfig = {
  testDb: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  }
};

if (process.env.DB_SSL) {
  dbConfig.testDb.ssl = (process.env.DB_SSL.toLowerCase() === 'true');
}

const pool = new Pool(dbConfig.testDb);

const db = {
  query: async (text, params, callback) => {
    let res = '';
    let errMessage = '';
    try {
      res = await pool.query(text, params, callback);
    } catch (err) {
      errMessage = err.message;
      throw err;
    }
    return res ? res.rows : errMessage;
  }
};

export default db;
