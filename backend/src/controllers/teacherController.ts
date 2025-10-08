import { Request, Response } from 'express';
import { db } from '../config/db';

// ✅ Ambil semua guru
export const getTeachers = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM teachers');
    res.json(rows);
  } catch (error) {
    console.error('❌ Failed to fetch teachers:', error);
    res.status(500).json({ message: 'Failed to fetch teachers' });
  }
};

// ✅ Tambah guru baru
export const addTeacher = async (req: Request, res: Response) => {
  const {
    id,
    name,
    fatherName,
    birthDate,
    address,
    instagram,
    whatsapp,
    quotes,
    photo,
    catatan,   // ✅ tambahin catatan
  } = req.body;

  try {
    const createdAt = new Date();

    await db.query(
      `INSERT INTO teachers 
       (id, name, fatherName, birthDate, address, instagram, whatsapp, quotes, photo, catatan, createdAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        name,
        fatherName,
        birthDate,
        address,
        instagram,
        whatsapp,
        quotes,
        photo,
        catatan,
        createdAt,
      ]
    );

    res.status(201).json({ message: 'Teacher added' });
  } catch (error) {
    console.error('❌ Failed to add teacher:', error);
    res.status(500).json({ message: 'Failed to add teacher' });
  }
};

// ✅ Update guru
export const updateTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    fatherName,
    birthDate,
    address,
    instagram,
    whatsapp,
    quotes,
    photo,
    catatan,   // ✅ tambahin catatan
  } = req.body;

  try {
    await db.query(
      `UPDATE teachers 
       SET name = ?, fatherName = ?, birthDate = ?, address = ?, 
           instagram = ?, whatsapp = ?, quotes = ?, photo = ?, catatan = ?
       WHERE id = ?`,
      [
        name,
        fatherName,
        birthDate,
        address,
        instagram,
        whatsapp,
        quotes,
        photo,
        catatan,
        id,
      ]
    );

    res.json({ message: 'Teacher updated' });
  } catch (error) {
    console.error('❌ Failed to update teacher:', error);
    res.status(500).json({ message: 'Failed to update teacher' });
  }
};

// ✅ Hapus guru
export const deleteTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM teachers WHERE id = ?', [id]);
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    console.error('❌ Failed to delete teacher:', error);
    res.status(500).json({ message: 'Failed to delete teacher' });
  }
};

// ✅ Ambil guru berdasarkan ID
export const getTeacherById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [rows]: any = await db.query('SELECT * FROM teachers WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Failed to fetch teacher:', error);
    res.status(500).json({ message: 'Failed to fetch teacher' });
  }
};
