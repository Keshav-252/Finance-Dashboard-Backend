import express from 'express';
import { addRecord,viewRecord,viewAllRecords,deleteRecord,updateRecord } from '../controllers/record.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/add',isAdmin, addRecord);
router.get('/view/:id',viewRecord);
router.get('/viewall',viewAllRecords);
router.delete('/delete/:id',isAdmin, deleteRecord);
router.patch('/update/:id',isAdmin, updateRecord);

export default router;  