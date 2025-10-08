import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school_db',
});

// OPTIONAL: export function for raw init (handled separately in initDB.ts if needed)
