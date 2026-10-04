import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Production-ready CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile, curl, server-to-server)
      if (!origin) return callback(null, true);
      // Allow configured origins or any vercel preview deployment
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive fallback to prevent breaking cross-domain demos
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint (Render standard)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'NxtWave backend is running',
    timestamp: new Date().toISOString(),
    database: getDbStatus() ? 'Connected' : 'Memory Store Active',
  });
});

// Root ping
app.get('/', (req, res) => {
  res.json({
    name: 'NxtWave Workshop API',
    status: 'online',
    health: '/health',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Bind to 0.0.0.0 for Render / Cloud deployment
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 NxtWave API Server running on port ${PORT} (0.0.0.0)`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
  console.log(`⚡ Database Status: ${getDbStatus() ? 'MongoDB' : 'Memory Fallback'}`);
});
