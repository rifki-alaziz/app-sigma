import express from 'express';
import {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController';
import { validateStudent } from '../middleware/validateInput';

const router = express.Router();

router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', validateStudent, addStudent);
router.put('/:id', validateStudent, updateStudent);
router.delete('/:id', deleteStudent);

export default router;
