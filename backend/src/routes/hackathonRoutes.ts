import express from 'express';
import { getHackathonSettings, updateHackathonSettings } from '../controllers/hackathonController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/settings', getHackathonSettings);
router.patch('/settings', authenticate, authorize(['operator']), updateHackathonSettings);

export default router;
