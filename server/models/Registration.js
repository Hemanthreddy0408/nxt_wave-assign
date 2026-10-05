import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'College or personal email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },

    phone: {
      type: String,
      required: [true, 'WhatsApp number is required for workshop link'],
      trim: true,
    },

    college: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
    },

    branch: {
      type: String,
      default: 'Computer Science / IT',
      trim: true,
    },

    graduationYear: {
      type: String,
      default: '2025 (Final Year)',
      trim: true,
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    scoreBand: {
      type: String,
      enum: [
        'Explorer',
        'High Rejection Risk',
        'Needs Practical Upgrade',
        'Intermediate Developer',
        'AI Placement Ready',
      ],
      default: 'Explorer',
    },

    quizAnswers: {
      q1: {
        type: String,
        default: '',
      },
      q2: {
        type: String,
        default: '',
      },
      q3: {
        type: String,
        default: '',
      },
      q4: {
        type: String,
        default: '',
      },
      q5: {
        type: String,
        default: '',
      },
      q6: {
        type: String,
        default: '',
      },
    },

    referralCode: {
      type: String,
      unique: true,
      index: true,
    },

    referredBy: {
      type: String,
      default: null,
      index: true,
    },

    referralCount: {
      type: Number,
      default: 0,
    },

    unlockedRewards: {
      tier1_cheatSheet: {
        type: Boolean,
        default: false,
      },

      tier2_doubtClearing: {
        type: Boolean,
        default: false,
      },

      tier3_resumeReview: {
        type: Boolean,
        default: false,
      },
    },

    utmSource: {
      type: String,
      default: 'direct',
    },

    utmMedium: {
      type: String,
      default: 'organic',
    },

    utmCampaign: {
      type: String,
      default: 'nxtwave_60min_ai',
    },
  },
  {
    timestamps: true,
  }
);

// Helper method to generate unique referral code
registrationSchema.statics.generateReferralCode = function (name) {
  const cleanName = (name || 'STUDENT')
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 5)
    .toUpperCase();

  const rand = Math.floor(1000 + Math.random() * 9000);

  return `NXT-${cleanName}-${rand}`;
};

export const Registration = mongoose.model(
  'Registration',
  registrationSchema
);