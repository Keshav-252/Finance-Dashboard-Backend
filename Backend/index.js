import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import { authenticate,isAdmin,isActive,isAnalystOrAdmin } from './middlewares/auth.js';
import recordRoutes from './routes/record.js';
import adminRoutes from './routes/admin.js';
import dashboardRoutes from './routes/dashboard.js';
import Record from './models/record.js';
import { records } from './sample_data/records.js';
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/records', authenticate,isAnalystOrAdmin,isActive,recordRoutes);
app.use('/api/v1/admin', authenticate,isAdmin,isActive,adminRoutes);
app.use('/api/v1/dashboard',authenticate,isActive,dashboardRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();

// Route to add sample records for testing
app.post('/add-sample-records',authenticate, async (req, res,next) => {
  try {  

  
    // Validate each record
    const validatedRecords = [];

    for (const record of records) {
     
    validatedRecords.push({
        ...record,
        createdBy: req.user._id
      });
    }

    // Insert many 
    await Record.insertMany(validatedRecords);

    res.status(201).json({
      success: true,
      message: "Records added successfully"
    });

  } catch (err) {
    next(err);
  }
});
