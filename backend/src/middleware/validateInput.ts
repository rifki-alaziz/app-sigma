import { Request, Response, NextFunction } from 'express';

// =============================
// 🔹 Helper Functions
// =============================

// Validasi format nomor WhatsApp
const isValidPhone = (phone: string) => /^\d{10,15}$/.test(phone);

// Validasi format username Instagram
const isValidInstagram = (username: string) => /^[a-zA-Z0-9._]{1,30}$/.test(username);

// Validasi format URL foto
const isValidURL = (url: string) => /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(url);

// Validasi tanggal lahir
const isValidDate = (date: string) => !isNaN(Date.parse(date));

// =============================
// 🔹 Validasi untuk Siswa
// =============================
export const validateStudent = (req: Request, res: Response, next: NextFunction) => {
  const { name, fatherName, birthDate, address, category, instagram, whatsapp, photo } = req.body;

  console.log('📦 Data Siswa Diterima:', req.body);

  // Pastikan field wajib tidak kosong
  if (!name || !fatherName || !birthDate || !address || !category) {
    console.log('❌ Field wajib kosong (siswa)');
    return res.status(400).json({ message: 'Field wajib tidak boleh kosong (siswa)' });
  }

  // Validasi tanggal lahir
  if (birthDate && !isValidDate(birthDate)) {
    console.log('❌ Tanggal lahir tidak valid (siswa):', birthDate);
    return res.status(400).json({ message: 'Tanggal lahir tidak valid' });
  }

  // Validasi nomor WhatsApp
  if (whatsapp && !isValidPhone(whatsapp)) {
    console.log('❌ Nomor WhatsApp tidak valid (siswa):', whatsapp);
    return res.status(400).json({ message: 'Format nomor WhatsApp tidak valid' });
  }

  // Validasi username Instagram
  if (instagram && !isValidInstagram(instagram)) {
    console.log('❌ Username Instagram tidak valid (siswa):', instagram);
    return res.status(400).json({ message: 'Format username Instagram tidak valid' });
  }

  // Validasi URL foto
  if (photo && !isValidURL(photo)) {
    console.log('❌ URL Foto tidak valid (siswa):', photo);
    return res.status(400).json({ message: 'Format URL foto tidak valid (harus .jpg/.png/.webp)' });
  }

  console.log('✅ Validasi student LULUS');
  next();
};

// =============================
// 🔹 Validasi untuk Guru
// =============================
export const validateTeacher = (req: Request, res: Response, next: NextFunction) => {
  const { name, fatherName, birthDate, address, instagram, whatsapp, photo, quotes } = req.body;

  console.log('📦 Data Guru Diterima:', req.body);

  // Pastikan field wajib tidak kosong
  if (!name || !fatherName || !birthDate || !address) {
    console.log('❌ Field wajib kosong (guru)');
    return res.status(400).json({ message: 'Field wajib tidak boleh kosong (guru)' });
  }

  // Validasi tanggal lahir
  if (birthDate && !isValidDate(birthDate)) {
    console.log('❌ Tanggal lahir tidak valid (guru):', birthDate);
    return res.status(400).json({ message: 'Tanggal lahir tidak valid' });
  }

  // Validasi nomor WhatsApp
  if (whatsapp && !isValidPhone(whatsapp)) {
    console.log('❌ Nomor WhatsApp tidak valid (guru):', whatsapp);
    return res.status(400).json({ message: 'Format nomor WhatsApp tidak valid' });
  }

  // Validasi username Instagram
  if (instagram && !isValidInstagram(instagram)) {
    console.log('❌ Username Instagram tidak valid (guru):', instagram);
    return res.status(400).json({ message: 'Format username Instagram tidak valid' });
  }

  // Validasi URL foto
  if (photo && !isValidURL(photo)) {
    console.log('❌ URL Foto tidak valid (guru):', photo);
    return res.status(400).json({ message: 'Format URL foto tidak valid (harus .jpg/.png/.webp)' });
  }

  console.log('✅ Validasi teacher LULUS');
  next();
};
