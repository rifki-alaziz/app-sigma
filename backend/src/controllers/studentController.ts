import { Request, Response } from 'express';
import { db } from '../config/db';

// GET ALL STUDENTS
export const getStudents = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM students');
    res.json(rows);
  } catch (error) {
    console.error('❌ Failed to fetch students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

// GET STUDENT BY ID
export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Failed to fetch student:', error);
    res.status(500).json({ message: 'Failed to fetch student' });
  }
};

// ADD STUDENT
export const addStudent = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      fatherName,
      birthDate,
      address,
      category,
      instagram,
      whatsapp,
      quotes,
      photo,
      mapsUrl,       // <--- mapsUrl ada di sini!
      createdAt
    } = req.body;

    await db.query(
      `INSERT INTO students 
        (id, name, fatherName, birthDate, address, category, instagram, whatsapp, quotes, photo, mapsUrl, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, fatherName, birthDate, address, category, instagram, whatsapp, quotes, photo, mapsUrl, createdAt]
    );

    res.status(201).json({ message: 'Student added' });
  } catch (error) {
    console.error('❌ Failed to add student:', error);
    res.status(500).json({ message: 'Failed to add student' });
  }
};

// UPDATE STUDENT
export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    fatherName,
    birthDate,
    address,
    category,
    instagram,
    whatsapp,
    quotes,
    photo,
    mapsUrl         // <--- mapsUrl diambil di sini!
  } = req.body;

  try {
    await db.query(
      `UPDATE students SET 
        name = ?, fatherName = ?, birthDate = ?, address = ?, category = ?, 
        instagram = ?, whatsapp = ?, quotes = ?, photo = ?, mapsUrl = ?
        WHERE id = ?`,
      [name, fatherName, birthDate, address, category, instagram, whatsapp, quotes, photo, mapsUrl, id]
    );
    res.json({ message: 'Student updated' });
  } catch (error) {
    console.error('❌ Failed to update student:', error);
    res.status(500).json({ message: 'Failed to update student' });
  }
};

// DELETE STUDENT
export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM students WHERE id = ?', [id]);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    console.error('❌ Failed to delete student:', error);
    res.status(500).json({ message: 'Failed to delete student' });
  }
};
