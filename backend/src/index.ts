import express from 'express';
import cors from 'cors';

import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import authRoutes from './routes/authRoutes';
import fiqihQaRoutes from './routes/fiqih'; // <-- import baru

import { requestLogger } from './middleware/logger';
import { requireAuth } from './middleware/auth';
import { initializeDatabase } from './config/initDB';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api', authRoutes);
app.use('/api/students', requireAuth, studentRoutes);
app.use('/api/teachers', requireAuth, teacherRoutes);
app.use('/api/fiqih', requireAuth, fiqihQaRoutes); // <-- route baru

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Run server after DB initialized
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
