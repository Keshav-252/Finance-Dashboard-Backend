import express from 'express';
import { getSummary,getMonthlySummary,getMonthlySummaryCategoryWise,filterByDateRange,filterByCategory,filterByType } from '../controllers/dashboard.js';
import { isAnalystOrAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/summary', getSummary);
router.get('/monthly-trends', getMonthlySummary);
router.get('/category-breakdown', getMonthlySummaryCategoryWise);
router.get('/filter',isAnalystOrAdmin, filterByDateRange);
router.get('/filter-by-category', isAnalystOrAdmin, filterByCategory);
router.get('/filter-by-type', isAnalystOrAdmin, filterByType);

export default router;