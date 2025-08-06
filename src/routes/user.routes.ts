import express from 'express';
import { getAllUsers, deleteUser, createUser } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/', authenticate, getAllUsers);
router.post('/', createUser); // 👈 This allows POST /api/users
router.delete('/:id', authenticate, deleteUser);

export default router;
