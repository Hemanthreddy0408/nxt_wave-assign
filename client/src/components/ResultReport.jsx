import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Database,
  Layers,
  ShieldCheck,
  Code2,
  ExternalLink,
} from 'lucide-react';

export default function ResultReport({ quizResult, onProceedToRegister, onRetake }) {
  const score = quizResult?.score || 64;
  const scoreBand = quizResult?.scoreBand || 'Needs Practical Upgrade';
  const breakdown = quizResult?.breakdown || {
    integration: 16,
    rag: 14,
    architecture: 18,
    defense: 16,
  };

  const getStatusColor = (val) => {
    if (val >= 20) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (val >= 14) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Top Banner */}
      <div className="dev-card p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#0f111a]/95 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 mb-1">
              Diagnostic Assessment Report • 2025 Placement Cycle
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Placement Readiness: <span className="text-indigo-400">{scoreBand}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-mono font-extrabold text-white">{score}<span className="text-sm text-zinc-500">/100</span></div>
              <div className="text-[10px] font-mono text-zinc-400">BENCHMARK SCORE</div>
            </div>
          </div>
        </div>

        {/* 4-Domain Breakdown Grid */}
        <div className="py-6">
          <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Domain Competency Analysis
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Domain 1 */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>API & Real-Time Streaming</span>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getStatusColor(breakdown.integration)}`}>
                  {breakdown.integration}/25
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${(breakdown.integration / 25) * 100}%` }}
                />
              </div>
            </div>

            {/* Domain 2 */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Vector Systems & RAG</span>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getStatusColor(breakdown.rag)}`}>
                  {breakdown.rag}/25
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${(breakdown.rag / 25) * 100}%` }}
                />
              </div>
            </div>

            {/* Domain 3 */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Production Schema & Hosting</span>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getStatusColor(breakdown.architecture)}`}>
                  {breakdown.architecture}/25
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(breakdown.architecture / 25) * 100}%` }}
                />
              </div>
            </div>

            {/* Domain 4 */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Interview Defense & Cost</span>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getStatusColor(breakdown.defense)}`}>
                  {breakdown.defense}/25
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(breakdown.defense / 25) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Assessment Warning / Insights */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200 leading-relaxed">
              <strong>Recruiter Risk Detected:</strong> Candidates with generic CRUD projects (Todo, E-Commerce, Clones) face high rejection in 2025 technical screening rounds. Tier-1 product firms specifically look for working AI applications with verifiable GitHub commits and live URLs.
            </div>
          </div>
        </div>

        {/* Project You Will Build in Workshop */}
        <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
              Live Workshop Project You Will Build (60 Mins)
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              VERIFIABLE PROOF OF WORK
            </span>
          </div>

          <h3 className="text-base font-bold text-white mb-1">
            DevLens AI: Real-Time GitHub Code Review & Security Vulnerability Agent
          </h3>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            A full-stack application connecting GitHub Webhooks to a streaming LLM engine. Automatically parses Git diffs, audits pull requests for security vulnerabilities, and posts structured markdown comments.
          </p>

          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-300">
            <span className="code-chip">Next.js / React</span>
            <span className="code-chip">Gemini 1.5 Flash API</span>
            <span className="code-chip">Server-Sent Events</span>
            <span className="code-chip">Vercel Deployment</span>
            <span className="code-chip">GitHub Actions</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onProceedToRegister}
            className="flex-1 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25"
          >
            <span>Reserve Free Seat (Attach Score)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onRetake}
            className="px-4 py-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Diagnostic</span>
          </button>
        </div>
      </div>
    </div>
  );
}
