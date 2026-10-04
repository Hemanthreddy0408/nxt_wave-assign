import { Registration } from '../models/Registration.js';
import { getDbStatus } from '../config/db.js';

// Pre-seeded realistic simulation data for growth demonstration
const mockRegistrations = [
  {
    _id: 'seed-1',
    name: 'Sai Varun',
    email: 'sai.varun@jntuh.ac.in',
    phone: '+91 98480 12345',
    college: 'JNTU College of Engineering, Hyderabad',
    branch: 'Computer Science',
    graduationYear: '2025 (Final Year)',
    score: 82,
    scoreBand: 'Proficient',
    referralCode: 'NXT-SAIV-8821',
    referredBy: null,
    referralCount: 4,
    unlockedRewards: { tier1_cheatSheet: true, tier2_doubtClearing: true, tier3_resumeReview: false },
    utmSource: 'whatsapp_rep',
    createdAt: new Date(Date.now() - 3600000 * 48),
  },
  {
    _id: 'seed-2',
    name: 'Ananya Sharma',
    email: 'ananya.s@cbit.ac.in',
    phone: '+91 91234 56780',
    college: 'CBIT Hyderabad',
    branch: 'Information Technology',
    graduationYear: '2025 (Final Year)',
    score: 91,
    scoreBand: 'AI Placement Ready',
    referralCode: 'NXT-ANAN-3012',
    referredBy: 'NXT-SAIV-8821',
    referralCount: 7,
    unlockedRewards: { tier1_cheatSheet: true, tier2_doubtClearing: true, tier3_resumeReview: true },
    utmSource: 'referral',
    createdAt: new Date(Date.now() - 3600000 * 36),
  },
  {
    _id: 'seed-3',
    name: 'Karthik Reddy',
    email: 'karthik.r@vnrvjiet.in',
    phone: '+91 99887 76655',
    college: 'VNR VJIET Hyderabad',
    branch: 'Electronics & Communication',
    graduationYear: '2025 (Final Year)',
    score: 64,
    scoreBand: 'Explorer',
    referralCode: 'NXT-KART-5192',
    referredBy: 'NXT-SAIV-8821',
    referralCount: 2,
    unlockedRewards: { tier1_cheatSheet: true, tier2_doubtClearing: false, tier3_resumeReview: false },
    utmSource: 'linkedin',
    createdAt: new Date(Date.now() - 3600000 * 24),
  },
  {
    _id: 'seed-4',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@srmist.edu.in',
    phone: '+91 97654 32109',
    college: 'SRM Institute of Science & Technology',
    branch: 'Computer Science',
    graduationYear: '2025 (Final Year)',
    score: 75,
    scoreBand: 'Proficient',
    referralCode: 'NXT-POOJ-7741',
    referredBy: null,
    referralCount: 3,
    unlockedRewards: { tier1_cheatSheet: true, tier2_doubtClearing: true, tier3_resumeReview: false },
    utmSource: 'reddit',
    createdAt: new Date(Date.now() - 3600000 * 18),
  },
  {
    _id: 'seed-5',
    name: 'Mohammed Bilal',
    email: 'bilal.m@osmania.ac.in',
    phone: '+91 98765 43211',
    college: 'University College of Engineering, Osmania',
    branch: 'Artificial Intelligence & Data Science',
    graduationYear: '2025 (Final Year)',
    score: 88,
    scoreBand: 'AI Placement Ready',
    referralCode: 'NXT-BILA-9903',
    referredBy: 'NXT-ANAN-3012',
    referralCount: 5,
    unlockedRewards: { tier1_cheatSheet: true, tier2_doubtClearing: true, tier3_resumeReview: true },
    utmSource: 'referral',
    createdAt: new Date(Date.now() - 3600000 * 12),
  }
];

let inMemoryRegistrations = [...mockRegistrations];

// Generate Referral Code
function makeCode(name) {
  const clean = (name || 'NXT').replace(/[^a-zA-Z]/g, '').slice(0, 5).toUpperCase();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `NXT-${clean}-${num}`;
}

// 1. Register a student
export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      college,
      branch,
      graduationYear,
      score,
      scoreBand,
      quizAnswers,
      referralCode: inputRefCode,
      utmSource,
      utmMedium,
      utmCampaign,
    } = req.body;

    if (!name || !email || !phone || !college) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, and college.',
      });
    }

    const referralCode = makeCode(name);
    const referredBy = inputRefCode ? inputRefCode.trim().toUpperCase() : null;

    if (getDbStatus()) {
      // Check existing email in MongoDB
      const existing = await Registration.findOne({ email: email.toLowerCase().trim() });
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'Welcome back! You are already registered for the workshop.',
          registration: existing,
          isExisting: true,
        });
      }

      // Create new registration
      const newReg = await Registration.create({
        name,
        email: email.toLowerCase().trim(),
        phone,
        college,
        branch: branch || 'Computer Science / Engineering',
        graduationYear: graduationYear || '2025 (Final Year)',
        score: score || 70,
        scoreBand: scoreBand || 'Proficient',
        quizAnswers,
        referralCode,
        referredBy,
        referralCount: 0,
        utmSource: utmSource || (referredBy ? 'referral' : 'direct'),
        utmMedium: utmMedium || 'organic',
        utmCampaign: utmCampaign || 'nxtwave_60min_ai',
      });

      // Credit the referrer if valid
      if (referredBy) {
        const referrer = await Registration.findOne({ referralCode: referredBy });
        if (referrer) {
          referrer.referralCount += 1;
          if (referrer.referralCount >= 1) referrer.unlockedRewards.tier1_cheatSheet = true;
          if (referrer.referralCount >= 3) referrer.unlockedRewards.tier2_doubtClearing = true;
          if (referrer.referralCount >= 5) referrer.unlockedRewards.tier3_resumeReview = true;
          await referrer.save();
        }
      }

      return res.status(201).json({
        success: true,
        message: 'Workshop seat confirmed successfully!',
        registration: newReg,
      });
    } else {
      // In-Memory Mode
      const existing = inMemoryRegistrations.find(
        (r) => r.email.toLowerCase() === email.toLowerCase().trim()
      );
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'Welcome back! You are already registered for the workshop.',
          registration: existing,
          isExisting: true,
        });
      }

      const newReg = {
        _id: 'reg-' + Date.now(),
        name,
        email: email.toLowerCase().trim(),
        phone,
        college,
        branch: branch || 'Computer Science / Engineering',
        graduationYear: graduationYear || '2025 (Final Year)',
        score: score || 72,
        scoreBand: scoreBand || 'Proficient',
        quizAnswers,
        referralCode,
        referredBy,
        referralCount: 0,
        unlockedRewards: {
          tier1_cheatSheet: false,
          tier2_doubtClearing: false,
          tier3_resumeReview: false,
        },
        utmSource: utmSource || (referredBy ? 'referral' : 'direct'),
        utmMedium: utmMedium || 'organic',
        utmCampaign: utmCampaign || 'nxtwave_60min_ai',
        createdAt: new Date(),
      };

      inMemoryRegistrations.unshift(newReg);

      // Credit referrer in memory
      if (referredBy) {
        const referrer = inMemoryRegistrations.find((r) => r.referralCode === referredBy);
        if (referrer) {
          referrer.referralCount = (referrer.referralCount || 0) + 1;
          if (referrer.referralCount >= 1) referrer.unlockedRewards.tier1_cheatSheet = true;
          if (referrer.referralCount >= 3) referrer.unlockedRewards.tier2_doubtClearing = true;
          if (referrer.referralCount >= 5) referrer.unlockedRewards.tier3_resumeReview = true;
        }
      }

      return res.status(201).json({
        success: true,
        message: 'Workshop seat confirmed successfully!',
        registration: newReg,
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing registration',
      error: error.message,
    });
  }
};

// 2. Get Student by Referral Code (for Referral Hub and stats)
export const getStudentByReferral = async (req, res) => {
  try {
    const { code } = req.params;
    const cleanCode = code ? code.trim().toUpperCase() : '';

    if (getDbStatus()) {
      const student = await Registration.findOne({ referralCode: cleanCode });
      if (!student) {
        return res.status(404).json({ success: false, message: 'Referral code not found' });
      }

      const referredStudents = await Registration.find(
        { referredBy: cleanCode },
        'name college createdAt'
      ).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        student,
        referredStudents,
      });
    } else {
      const student = inMemoryRegistrations.find((r) => r.referralCode === cleanCode);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Referral code not found' });
      }

      const referredStudents = inMemoryRegistrations
        .filter((r) => r.referredBy === cleanCode)
        .map((r) => ({ name: r.name, college: r.college, createdAt: r.createdAt }));

      return res.status(200).json({
        success: true,
        student,
        referredStudents,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. College Leaderboard
export const getCollegeLeaderboard = async (req, res) => {
  try {
    if (getDbStatus()) {
      const leaderboard = await Registration.aggregate([
        { $group: { _id: '$college', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]);
      return res.status(200).json({
        success: true,
        leaderboard: leaderboard.map((item) => ({ college: item._id, count: item.count })),
      });
    } else {
      const counts = {};
      inMemoryRegistrations.forEach((r) => {
        counts[r.college] = (counts[r.college] || 0) + 1;
      });

      const leaderboard = Object.keys(counts)
        .map((c) => ({ college: c, count: counts[c] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return res.status(200).json({ success: true, leaderboard });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Admin - Get All Registrations
export const getAllRegistrations = async (req, res) => {
  try {
    const { search, limit = 50 } = req.query;

    if (getDbStatus()) {
      let query = {};
      if (search) {
        query = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { college: { $regex: search, $options: 'i' } },
            { referralCode: { $regex: search, $options: 'i' } },
          ],
        };
      }

      const list = await Registration.find(query).sort({ createdAt: -1 }).limit(Number(limit));
      const total = await Registration.countDocuments();

      return res.status(200).json({
        success: true,
        total,
        registrations: list,
      });
    } else {
      let list = inMemoryRegistrations;
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(
          (r) =>
            r.name.toLowerCase().includes(s) ||
            r.email.toLowerCase().includes(s) ||
            r.college.toLowerCase().includes(s) ||
            r.referralCode.toLowerCase().includes(s)
        );
      }

      return res.status(200).json({
        success: true,
        total: inMemoryRegistrations.length,
        registrations: list.slice(0, Number(limit)),
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
