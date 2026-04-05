import express from 'express';
import { getAllUsers, updateUserRole,updateUserStatus } from '../controllers/admin.js';

const router = express.Router();

router.get('/users',getAllUsers);
router.patch('/update/role/:id',updateUserRole);
router.patch('/update/status/:id',updateUserStatus);

export default router;