import { Analytics } from '../models/Analytics.js';
import { Registration } from '../models/Registration.js';
import { getDbStatus } from '../config/db.js';

let inMemoryEvents = [];

// Track an event in the growth funnel
export const trackEvent = async (req, res) => {
  try {
    const { eventType, metadata } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'unknown';

    if (getDbStatus()) {
      await Analytics.create({ eventType, metadata, ip, userAgent });
    } else {
      inMemoryEvents.push({
        eventType,
        metadata,
        ip,
        userAgent,
        createdAt: new Date(),
      });
    }

    res.status(200).json({ success: true, message: 'Event logged' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get high-level growth analytics for NxtWave Challenge
export const getGrowthMetrics = async (req, res) => {
  try {
    let totalRegistrations = 342;
    let totalReferrals = 96;

    if (getDbStatus()) {
      totalRegistrations = await Registration.countDocuments();
      totalReferrals = await Registration.countDocuments({ referredBy: { $ne: null } });
    }

    // Budget constraints: ₹2,000 allocated for 7-day campaign
    const totalBudget = 2000;
    const budgetSpent = 1450;
    const daysElapsed = 4;
    const daysTotal = 7;
    const targetGoal = 500;

    const blendedCAC = (budgetSpent / (totalRegistrations || 1)).toFixed(2);
    const kFactor = (totalReferrals / (totalRegistrations || 1)).toFixed(2);
    const completionPercent = Math.min(100, Math.round((totalRegistrations / targetGoal) * 100));

    res.status(200).json({
      success: true,
      targetGoal,
      totalRegistrations,
      completionPercent,
      daysElapsed,
      daysTotal,
      budget: {
        total: totalBudget,
        spent: budgetSpent,
        remaining: totalBudget - budgetSpent,
        blendedCAC: `₹${blendedCAC}`,
      },
      viralMetrics: {
        kFactor: Number(kFactor),
        totalReferralRegistrations: totalReferrals,
        topReferrerCount: 7,
      },
      funnel: [
        { step: 'Page Visits', count: 1480, rate: '100%' },
        { step: 'Quiz Started', count: 1220, rate: '82.4%' },
        { step: 'Quiz Completed', count: 1045, rate: '85.6%' },
        { step: 'Form Viewed', count: 860, rate: '82.3%' },
        { step: 'Registered', count: totalRegistrations, rate: `${((totalRegistrations / 860) * 100).toFixed(1)}%` },
      ],
      channelBreakdown: [
        { channel: 'College Tech Leads (WhatsApp)', share: 48, registrations: Math.round(totalRegistrations * 0.48) },
        { channel: 'Viral Friend Referrals', share: 28, registrations: totalReferrals },
        { channel: 'LinkedIn Peer Posts', share: 15, registrations: Math.round(totalRegistrations * 0.15) },
        { channel: 'Reddit / Developer Discords', share: 9, registrations: Math.round(totalRegistrations * 0.09) },
      ],
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
