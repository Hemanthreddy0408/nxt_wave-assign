import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: [
        'page_view',
        'quiz_start',
        'quiz_question_answer',
        'quiz_complete',
        'registration_attempt',
        'registration_success',
        'referral_link_copy',
        'referral_share_whatsapp',
        'referral_share_linkedin',
        'referral_landing_visit',
      ],
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ip: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

export const Analytics = mongoose.model('Analytics', analyticsSchema);
