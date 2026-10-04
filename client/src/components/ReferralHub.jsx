import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Calendar,
  Gift,
  Trophy,
  ExternalLink,
  Terminal,
  QrCode,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCollegeLeaderboard, trackFunnelEvent } from '../services/api';

export default function ReferralHub({ student }) {
  const [copied, setCopied] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#10b981'],
      });
    } catch (e) {
      console.debug('Confetti error', e);
    }

    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await getCollegeLeaderboard();
      if (res.success) {
        setLeaderboard(res.leaderboard);
      }
    } catch (e) {
      console.debug('Error fetching leaderboard', e);
    }
  };

  const referralCode = student?.referralCode || 'NXT-DEV-2025';
  const referralLink = `${window.location.origin}?ref=${referralCode}`;
  const referralCount = student?.referralCount || 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    trackFunnelEvent('referral_link_copy', { code: referralCode });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I just checked my AI Placement Readiness score and booked my free seat for NxtWave's live workshop: "Build Your First AI Project in 60 Minutes" 🚀\n\nIt is 100% free for final-year engineering students. We will build & deploy DevLens AI to our GitHub for placement resumes.\n\nTake the 60-sec quiz & reserve your seat here:\n${referralLink}`
    );
    trackFunnelEvent('referral_share_whatsapp', { code: referralCode });
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(referralLink);
    trackFunnelEvent('referral_share_linkedin', { code: referralCode });
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("NxtWave Workshop: Build Your First AI Project in 60 Minutes");
    const details = encodeURIComponent(
      "Live 60-Minute Masterclass: Build DevLens AI with streaming tokens and deploy to Vercel."
    );
    const location = encodeURIComponent("Google Meet (Sent on WhatsApp)");
    const now = new Date();
    now.setDate(now.getDate() + 2);
    const startIso = now.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startIso}/${startIso}`;
    window.open(calUrl, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* DIGITAL ADMISSION TICKET PASS */}
      <div className="ticket-pass p-6 sm:p-8 rounded-2xl mb-8 border border-indigo-500/30 overflow-hidden">
        {/* Ticket Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                NXTWAVE ACADEMY • OFFICIAL ADMISSION PASS
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Seat Reserved: {student?.name || 'Engineer'}
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
              ● CONFIRMED PASS #{referralCode}
            </span>
          </div>
        </div>

        {/* Ticket Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/[0.08] text-left">
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase">COLLEGE</div>
            <div className="text-xs font-semibold text-zinc-200 truncate mt-0.5">{student?.college || 'Engineering'}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase">DATE & TIME</div>
            <div className="text-xs font-semibold text-zinc-200 mt-0.5">Saturday 7:00 PM IST</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase">FORMAT</div>
            <div className="text-xs font-semibold text-cyan-400 mt-0.5">Live Google Meet</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase">WHATSAPP DISPATCH</div>
            <div className="text-xs font-semibold text-emerald-400 truncate mt-0.5">{student?.phone || 'Verified'}</div>
          </div>
        </div>

        {/* Ticket Action Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400 text-left">
            Bring your laptop and code editor. Session link and starter templates will be sent before start time.
          </div>
          <button
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-secondary text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </button>
        </div>
      </div>

      {/* VIRAL REWARDS & MILESTONES HUB */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8 text-left">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Peer Pass & Milestone Upgrades
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-white/[0.08]">
            {referralCount}/5 Peers Enrolled
          </span>
        </div>

        <p className="text-xs text-zinc-400 mb-6">
          Invite batchmates from your engineering branch. When they register, both of you unlock developer upgrades:
        </p>

        {/* Milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className={`p-4 rounded-xl border transition-all ${referralCount >= 1 ? 'bg-emerald-950/20 border-emerald-500/30 text-white' : 'bg-zinc-900/40 border-white/[0.06] text-zinc-400'}`}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono font-bold text-emerald-400">1 Friend</span>
              <span className="text-[10px] font-mono">{referralCount >= 1 ? '✓ UNLOCKED' : 'LOCKED'}</span>
            </div>
            <div className="text-xs font-bold text-zinc-200">AI Prompt Vault</div>
            <div className="text-[11px] text-zinc-400 mt-1 leading-tight">50+ production prompts & code templates</div>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${referralCount >= 3 ? 'bg-emerald-950/20 border-emerald-500/30 text-white' : 'bg-zinc-900/40 border-white/[0.06] text-zinc-400'}`}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono font-bold text-cyan-400">3 Friends</span>
              <span className="text-[10px] font-mono">{referralCount >= 3 ? '✓ UNLOCKED' : 'LOCKED'}</span>
            </div>
            <div className="text-xs font-bold text-zinc-200">VIP Doubt Room</div>
            <div className="text-[11px] text-zinc-400 mt-1 leading-tight">Post-session live Q&A with instructor</div>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${referralCount >= 5 ? 'bg-emerald-950/20 border-emerald-500/30 text-white' : 'bg-zinc-900/40 border-white/[0.06] text-zinc-400'}`}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono font-bold text-indigo-400">5 Friends</span>
              <span className="text-[10px] font-mono">{referralCount >= 5 ? '✓ UNLOCKED' : 'LOCKED'}</span>
            </div>
            <div className="text-xs font-bold text-zinc-200">1-on-1 Resume Review</div>
            <div className="text-[11px] text-zinc-400 mt-1 leading-tight">AI placement portfolio audit by mentors</div>
          </div>
        </div>

        {/* Link Box */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900/90 border border-white/[0.08] mb-4">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="w-full bg-transparent px-3 py-1.5 text-xs font-mono text-zinc-200 outline-none select-all"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-lg btn-primary text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleShareWhatsApp}
            className="py-3 px-4 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/25 text-emerald-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share to College WhatsApp Group</span>
          </button>

          <button
            onClick={handleShareLinkedIn}
            className="py-3 px-4 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/25 text-blue-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on LinkedIn</span>
          </button>
        </div>
      </div>

      {/* CAMPUS LEADERBOARD */}
      <div className="glass-card p-6 rounded-2xl text-left">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Campus Participation Leaderboard
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">LIVE RANKING</span>
        </div>

        <div className="space-y-2">
          {leaderboard.slice(0, 5).map((col, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-white/[0.04] text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[11px] bg-zinc-800 text-zinc-300">
                  {idx + 1}
                </span>
                <span className="font-semibold text-zinc-200">{col.college}</span>
              </div>
              <span className="font-mono text-indigo-400 font-bold">{col.count} enrolled</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
