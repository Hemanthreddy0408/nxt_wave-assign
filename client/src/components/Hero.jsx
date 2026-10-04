import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Terminal,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Code2,
  GitPullRequest,
  Users,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Laptop,
  Play,
  Zap,
  Award,
} from 'lucide-react';

const AGENDA_ITEMS = [
  {
    time: '00:00 – 00:10',
    title: 'The 2025 Placement Shift',
    desc: 'Why recruiters downrank generic CRUD clones and how verifiable AI proof bypasses automated ATS filters.',
    badge: 'STRATEGY',
  },
  {
    time: '00:10 – 00:25',
    title: 'System Architecture & Token Streaming',
    desc: 'Setting up structured JSON schemas, handling LLM response latency, and Server-Sent Events (SSE).',
    badge: 'ARCHITECTURE',
  },
  {
    time: '00:25 – 00:45',
    title: 'Live Code-Along: DevLens AI',
    desc: 'Writing the full-stack GitHub PR analysis agent using modern React and the Gemini 1.5 Flash API.',
    badge: 'LIVE CODING',
  },
  {
    time: '00:45 – 00:55',
    title: '1-Click Vercel Deployment',
    desc: 'Deploying the working app live to a public URL and documenting architectural specs on GitHub.',
    badge: 'DEPLOYMENT',
  },
  {
    time: '00:55 – 01:00',
    title: 'Placement Defense Playbook',
    desc: '5 specific technical questions interviewers will ask about this project and exact answers to give.',
    badge: 'CAREER',
  },
];

const FAQS = [
  {
    q: 'Do I need paid AI API credits or a high-end GPU laptop?',
    a: 'No. Free starter API keys and cloud deployment templates are provided. Any standard laptop with a web browser and internet connection is 100% sufficient.',
  },
  {
    q: 'Is 60 minutes realistically enough time to build and deploy?',
    a: 'Yes. You will receive a clean starter boilerplate. In the 60 minutes, you write the core AI reasoning and streaming logic, connect the API, and deploy live to Vercel.',
  },
  {
    q: 'Will I get verifiable proof for my resume and LinkedIn?',
    a: 'Yes. You walk away with: 1) A public GitHub repository with your commits, 2) A live hosted web URL recruiters can test, and 3) An official NxtWave Certificate of Participation.',
  },
  {
    q: 'Is this workshop really 100% free?',
    a: 'Yes. NxtWave sponsors this hands-on masterclass specifically to help final-year engineering students bridge the industry AI skills gap ahead of campus recruitment.',
  },
];

export default function Hero({ onStartQuiz, onDirectRegister, totalRegistrations = 342 }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoOutput, setDemoOutput] = useState([]);
  const seatsRemaining = Math.max(0, 500 - totalRegistrations);

  // Interactive Live Demo simulation
  const runInteractiveDemo = () => {
    setIsPlayingDemo(true);
    setDemoOutput([]);

    const steps = [
      { text: '$ devlens analyze --repo="nxtwave/auth-service" --pr=42', delay: 200, color: 'text-zinc-300' },
      { text: '[•] Initializing Server-Sent Events stream (Gemini 1.5 Flash)...', delay: 700, color: 'text-indigo-400' },
      { text: '[✓] Parsed 3 file diffs (+142, -18 lines) in 180ms', delay: 1300, color: 'text-cyan-400' },
      { text: '[⚠️ SECURITY AUDIT] Detected SQL Injection vulnerability in auth.ts:48', delay: 1900, color: 'text-amber-400' },
      { text: '[✓] Generated automated GitHub PR review comment with remediation code', delay: 2500, color: 'text-emerald-400' },
      { text: '[🚀 LIVE DEPLOYED] https://devlens-ai.vercel.app', delay: 3000, color: 'text-indigo-300 font-bold' },
    ];

    steps.forEach(({ text, delay, color }) => {
      setTimeout(() => {
        setDemoOutput((prev) => [...prev, { text, color }]);
      }, delay);
    });

    setTimeout(() => setIsPlayingDemo(false), 3200);
  };

  return (
    <div className="relative overflow-hidden tech-bg">
      {/* HERO SECTION */}
      <section className="pt-14 pb-16 md:pt-24 md:pb-24 max-w-5xl mx-auto px-4 relative z-10 text-center">
        {/* Urgency Announcement Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/[0.08] text-xs font-mono text-zinc-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>EXCLUSIVE MASTERCLASS • LIMITED TO 500 FINAL-YEAR ENGINEERS</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 max-w-4xl mx-auto">
          Build & Deploy Your First Production AI Project in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            60 Minutes
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-9 leading-relaxed">
          Recruiters are rejecting generic CRUD clone projects. Join our hands-on live code-along: build <strong className="text-zinc-200">DevLens AI</strong> — a real-time GitHub PR code review agent with streaming tokens and live Vercel hosting for your placement resume.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-8 py-4 rounded-xl btn-primary text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-indigo-600/30"
          >
            <span>Take 60-Sec AI Readiness Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onDirectRegister}
            className="w-full sm:w-auto px-7 py-4 rounded-xl btn-secondary text-sm font-semibold cursor-pointer"
          >
            <span>Direct Seat Reservation</span>
          </button>
        </div>

        {/* Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-16 text-left">
          <div className="glass-card p-4">
            <div className="text-2xl font-mono font-bold text-white">{totalRegistrations} / 500</div>
            <div className="text-xs text-zinc-400 mt-0.5">Students Registered</div>
          </div>

          <div className="glass-card p-4">
            <div className="text-2xl font-mono font-bold text-emerald-400">100% Free</div>
            <div className="text-xs text-zinc-400 mt-0.5">Sponsored by NxtWave</div>
          </div>

          <div className="glass-card p-4">
            <div className="text-2xl font-mono font-bold text-cyan-400">60 Minutes</div>
            <div className="text-xs text-zinc-400 mt-0.5">Hands-On Code & Deploy</div>
          </div>

          <div className="glass-card p-4">
            <div className="text-2xl font-mono font-bold text-amber-400">{seatsRemaining} Left</div>
            <div className="text-xs text-zinc-400 mt-0.5">Registration Closing Soon</div>
          </div>
        </div>

        {/* INTERACTIVE WORKSHOP PROJECT PLAYGROUND */}
        <div className="max-w-3xl mx-auto text-left glow-card shadow-2xl">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#08090f] border-b border-white/[0.08] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-zinc-400 text-[11px]">devlens-ai // interactive-preview.ts</span>
            </div>
            
            <button
              onClick={runInteractiveDemo}
              disabled={isPlayingDemo}
              className="px-3 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 font-mono text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3" />
              <span>{isPlayingDemo ? 'Running Audit...' : 'Simulate Live Agent'}</span>
            </button>
          </div>

          {/* Terminal Content */}
          <div className="p-5 font-mono text-xs text-zinc-300 space-y-2 overflow-x-auto min-h-[190px]">
            <div className="text-zinc-500">// Project you will code and deploy live to your portfolio</div>
            <div>
              <span className="text-indigo-400">const</span> agent = <span className="text-indigo-400">new</span> DevLensAgent({'{'}
            </div>
            <div className="pl-4 text-zinc-400">
              model: <span className="text-amber-300">'gemini-1.5-flash'</span>,
            </div>
            <div className="pl-4 text-zinc-400">
              streaming: <span className="text-cyan-400">true</span>, <span className="text-zinc-500">// Server-Sent Events token stream</span>
            </div>
            <div className="pl-4 text-zinc-400">
              schema: <span className="text-cyan-400">PullRequestSecurityReviewSchema</span>
            </div>
            <div>{'}'});</div>

            {/* Dynamic Simulated Output */}
            {demoOutput.length > 0 ? (
              <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                {demoOutput.map((item, i) => (
                  <div key={i} className={item.color}>
                    {item.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="pt-2 text-zinc-500 text-[11px]">
                Click <span className="text-indigo-400 font-semibold">[Simulate Live Agent]</span> above to preview the real-time code audit output.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHAT YOU WALK AWAY WITH */}
      <section className="py-16 border-t border-white/[0.06] bg-zinc-950/40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">
              CONCRETE PROOF OF WORK
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What You Walk Away With In 60 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Tangible assets on your resume before you leave the session.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Live Hosted Vercel Application</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                A public, testable URL you can paste directly onto your resume and LinkedIn for ATS and hiring managers.
              </p>
            </div>

            <div className="glass-card p-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Clean Public GitHub Repository</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Verifiable commits, structured architecture diagrams, and clean code documentation that proves technical ownership.
              </p>
            </div>

            <div className="glass-card p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Placement Interview Defense Playbook</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The top 5 technical questions interviewers ask about this project (latency, tokens, security) and exact model answers.
              </p>
            </div>

            <div className="glass-card p-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Official NxtWave Certificate</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                A verified credential validating your hands-on AI project deployment to showcase on your LinkedIn profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGENDA SECTION */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">
              CURRICULUM BREAKDOWN
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Minute-by-Minute 60-Minute Masterclass Agenda
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Zero theory fluff. 100% focused on engineering architecture and verifiable proof-of-work.
            </p>
          </div>

          <div className="space-y-3">
            {AGENDA_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-indigo-400 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                    {item.time}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS INSTITUTIONS MARQUEE */}
      <section className="py-12 border-t border-white/[0.06] text-center bg-zinc-950/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-xs font-mono uppercase text-zinc-500 mb-6">
            Engineers Registered From Leading Institutions
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-zinc-400">
            <span className="px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06]">JNTU Hyderabad</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06]">Osmania University</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06]">CBIT Hyderabad</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06]">VNR VJIET</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06]">VIT Vellore</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06]">SRM University</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.06]">Anna University</span>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl font-bold text-white">Everything You Need To Know</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.08] bg-zinc-900/40 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.06] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-12 p-8 rounded-2xl glow-card text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Ready to Upgrade Your Placement Portfolio?
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
              Only {seatsRemaining} of 500 seats remaining for the upcoming live masterclass.
            </p>
            <button
              onClick={onStartQuiz}
              className="px-8 py-3.5 rounded-xl btn-primary text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              <span>Take Diagnostic Quiz & Reserve Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
