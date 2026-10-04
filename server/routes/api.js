import express from 'express';
import {
  registerStudent,
  getStudentByReferral,
  getCollegeLeaderboard,
  getAllRegistrations,
} from '../controllers/registrationController.js';
import { trackEvent, getGrowthMetrics } from '../controllers/analyticsController.js';

const router = express.Router();

// Admin Authentication Middleware
const requireAdminAuth = (req, res, next) => {
  const secretKey = process.env.ADMIN_SECRET_KEY || 'nxtwave-admin-2025';
  const incomingKey = req.headers['x-admin-key'] || req.query.adminKey;

  // In production, enforce key check to safeguard attendee PII
  if (process.env.NODE_ENV === 'production' && incomingKey !== secretKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin authentication key required to view attendee data.',
    });
  }
  next();
};

// Public Registration routes
router.post('/register', registerStudent);
router.get('/referral/:code', getStudentByReferral);
router.get('/leaderboard/colleges', getCollegeLeaderboard);

// Protected Admin route
router.get('/admin/registrations', requireAdminAuth, getAllRegistrations);

// Analytics & Telemetry routes
router.post('/analytics/track', trackEvent);
router.get('/growth/metrics', getGrowthMetrics);

export default router;
