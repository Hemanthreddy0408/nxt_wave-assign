import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, Loader2 } from 'lucide-react';

export default function ScoreCalculation({ onFinished }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1400);
    const t3 = setTimeout(() => setStep(3), 2200);
    const t4 = setTimeout(() => onFinished(), 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinished]);

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      {/* Terminal window card */}
      <div className="dev-card rounded-2xl border border-zinc-800 bg-[#0c0d14] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a10] border-b border-zinc-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="ml-2 font-mono text-zinc-400 text-[11px]">placement-analyzer // v2.4</span>
          </div>
          <span className="text-[10px] font-mono text-indigo-400">BENCHMARKING</span>
        </div>

        <div className="p-6 text-left space-y-4">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">Synthesizing Candidate Profile</div>
              <div className="text-xs text-zinc-400">Comparing across 2,400+ campus placement benchmarks</div>
            </div>
          </div>

          <div className="pt-2 space-y-2.5 font-mono text-xs text-zinc-300">
            <div className={`flex items-center gap-2.5 ${step >= 1 ? 'text-zinc-200' : 'text-zinc-600'}`}>
              {step >= 1 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-zinc-700 inline-block" />
              )}
              <span>[1/3] Benchmarking LLM API & Latency handling</span>
            </div>

            <div className={`flex items-center gap-2.5 ${step >= 2 ? 'text-zinc-200' : 'text-zinc-600'}`}>
              {step >= 2 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-zinc-700 inline-block" />
              )}
              <span>[2/3] Evaluating Vector RAG & Schema reliability</span>
            </div>

            <div className={`flex items-center gap-2.5 ${step >= 3 ? 'text-zinc-200' : 'text-zinc-600'}`}>
              {step >= 3 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-zinc-700 inline-block" />
              )}
              <span>[3/3] Generating Placement Gap Analysis & Action Plan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
