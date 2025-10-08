// src/config/initDB.ts
import mysql from 'mysql2/promise';

// Connection pool untuk digunakan di routes
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Fungsi inisialisasi database dan tabel
export const initializeDatabase = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS school_db`);
  await connection.query(`USE school_db`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS students (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      fatherName VARCHAR(100) NOT NULL,
      birthDate DATE NOT NULL,
      address TEXT NOT NULL,
      category VARCHAR(50) NOT NULL,
      instagram VARCHAR(100),
      whatsapp VARCHAR(20),
      quotes TEXT,
      photo TEXT,
      mapsUrl VARCHAR(255),
      createdAt DATETIME NOT NULL
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS teachers (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      fatherName VARCHAR(100) NOT NULL,
      birthDate DATE NOT NULL,
      address TEXT NOT NULL,
      subject VARCHAR(100) NOT NULL,
      instagram VARCHAR(100),
      whatsapp VARCHAR(20),
      quotes TEXT,
      photo TEXT,
      createdAt DATETIME NOT NULL
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS doa (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      arab TEXT NOT NULL,
      arti TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS fiqih_qa (
      id INT PRIMARY KEY AUTO_INCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category ENUM('sholat', 'puasa', 'zakat', 'haji', 'muamalah', 'nikah', 'jinayah', 'aqidah', 'akhlaq', 'lainnya') NOT NULL,
      tags JSON,
      author VARCHAR(100) NOT NULL,
      is_published BOOLEAN DEFAULT TRUE,
      views INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Database and tables initialized');

  await connection.end();
};
