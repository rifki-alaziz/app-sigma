import express from 'express';
import {
  getTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController';
import { validateTeacher } from '../middleware/validateInput';

const router = express.Router();

router.get('/', getTeachers);
router.get('/:id', getTeacherById);
router.post('/', validateTeacher, addTeacher);
router.put('/:id', validateTeacher, updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;
