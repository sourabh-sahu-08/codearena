import express from 'express';
import { getUpdates, createUpdate } from '../controllers/updateController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getUpdates);
router.post('/', authenticate, authorize(['operator']), createUpdate);

export default router;
