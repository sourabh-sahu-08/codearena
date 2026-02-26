import express from 'express';
import { getUsers, updateUserStatus, deleteUser, toggleVerification } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize(['operator']));

router.get('/', getUsers);
router.patch('/:id', updateUserStatus);
router.patch('/:id/verify', toggleVerification);
router.delete('/:id', deleteUser);


export default router;
