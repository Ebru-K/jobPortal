// ============================================
// COMP229 - Job Portal Application Server
// FIXED VERSION (CORS + ES MODULE SAFE)
// ============================================

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// --------------------------------------------
// Path setup (ES Modules replacement for __dirname)
// --------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------------------------
// Load environment variables
// --------------------------------------------
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// --------------------------------------------
// App initialization (MUST come before middleware)
// --------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// --------------------------------------------
// CORS CONFIG (THIS IS THE IMPORTANT PART)
// --------------------------------------------
const allowedOrigins = [
  'http://localhost:5173',
  'https://vocal-mooncake-50fc69.netlify.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server & health checks
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true
  })
);

// --------------------------------------------
// Body parsers
// --------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------
// Request logger
// --------------------------------------------
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// --------------------------------------------
// Static files
// --------------------------------------------
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --------------------------------------------
// Routes
// --------------------------------------------
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);

// --------------------------------------------
// Health check
// --------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Job Portal API is running',
    time: new Date().toISOString()
  });
});

// --------------------------------------------
// Error handler
// --------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message
  });
});

// --------------------------------------------
// 404 handler
// --------------------------------------------
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --------------------------------------------
// Database + server start
// --------------------------------------------
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing');
    process.exit(1);
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  });

  console.log('MongoDB connected');
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(console.error);

export default app;
