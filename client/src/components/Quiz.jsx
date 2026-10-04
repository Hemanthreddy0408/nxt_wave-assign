import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Database, Code2, Sparkles, Terminal, HelpCircle } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'q1',
    category: 'API & Real-Time UX',
    tag: 'Question 1 of 6 • System Latency',
    question: 'How do you handle LLM response latency (typically 3–8s) in an interactive web application?',
    context: 'Recruiters frequently test this to see if you understand production streaming vs amateur blocking requests.',
    options: [
      {
        id: 'beginner_wait',
        label: 'Wait for the full completion with a blocking loading spinner',
        sub: 'High drop-off rate; poor production user experience',
        categoryWeight: { integration: 8, rag: 5, architecture: 5, defense: 8 },
        tier: 'Basic',
      },
      {
        id: 'no_api',
        label: 'I only use ChatGPT in the browser; have not integrated an LLM API in code yet',
        sub: 'Zero API integration experience on resume',
        categoryWeight: { integration: 2, rag: 2, architecture: 2, defense: 4 },
        tier: 'Zero Experience',
      },
      {
        id: 'sse_stream',
        label: 'Stream tokens via Server-Sent Events (SSE) / ReadableStreams for instant TTFT',
        sub: 'Modern production pattern for sub-second perceived latency',
        categoryWeight: { integration: 22, rag: 16, architecture: 20, defense: 22 },
        tier: 'Production',
      },
      {
        id: 'queue_ws',
        label: 'Async message queue (Redis/BullMQ) + WebSockets with optimistic state updates',
        sub: 'Enterprise-grade async architectural pattern',
        categoryWeight: { integration: 25, rag: 20, architecture: 25, defense: 25 },
        tier: 'Advanced',
      },
    ],
  },
  {
    id: 'q2',
    category: 'Vector Systems & RAG',
    tag: 'Question 2 of 6 • Information Retrieval',
    question: 'In an interview, if asked how a RAG pipeline retrieves relevant context from 1,000 documents, what is your answer?',
    context: 'RAG is the #1 asked topic in 2025 campus interviews for AI and backend engineering roles.',
    options: [
      {
        id: 'unknown_rag',
        label: 'I am not familiar with RAG, Vector Databases, or Embeddings yet',
        sub: 'Critical knowledge gap for 2025 AI-assisted tech interviews',
        categoryWeight: { integration: 4, rag: 2, architecture: 4, defense: 5 },
        tier: 'Unfamiliar',
      },
      {
        id: 'sql_search',
        label: 'Execute SQL LIKE or regex pattern matching on text stored in a traditional database',
        sub: 'Fails to capture semantic meaning or synonyms',
        categoryWeight: { integration: 10, rag: 8, architecture: 8, defense: 8 },
        tier: 'Conventional',
      },
      {
        id: 'vector_embed',
        label: 'Semantic chunking, high-dimensional vector embeddings, and Cosine Similarity search',
        sub: 'Standard modern RAG architecture with vector indexing',
        categoryWeight: { integration: 20, rag: 24, architecture: 20, defense: 22 },
        tier: 'Production',
      },
      {
        id: 'hybrid_rerank',
        label: 'Hybrid retrieval (BM25 sparse + dense embeddings) with cross-encoder reranking',
        sub: 'Industry gold standard for high-accuracy production RAG',
        categoryWeight: { integration: 25, rag: 25, architecture: 24, defense: 25 },
        tier: 'Advanced',
      },
    ],
  },
  {
    id: 'q3',
    category: 'Resume Differentiation',
    tag: 'Question 3 of 6 • Capstone Differentiation',
    question: 'What is currently the primary technical capstone project on your engineering resume?',
    context: 'ATS screeners and recruiters automatically downrank generic cloned tutorial projects.',
    options: [
      {
        id: 'clone_crud',
        label: 'E-Commerce store, Netflix/Spotify clone, Weather app, or Todo task manager',
        sub: 'Identical to ~85% of other college applicant resumes',
        categoryWeight: { integration: 6, rag: 5, architecture: 6, defense: 6 },
        tier: 'High Rejection Risk',
      },
      {
        id: 'mern_portal',
        label: 'Standard MERN / Spring Boot CRUD portal without any AI integration',
        sub: 'Good programming basics, but lacks 2025 modern differentiation',
        categoryWeight: { integration: 12, rag: 8, architecture: 14, defense: 10 },
        tier: 'Standard',
      },
      {
        id: 'simple_wrapper',
        label: 'Basic LLM wrapper script (e.g. OpenAI prompt completion chatbot)',
        sub: 'Shows AI interest, but needs full-stack deployment and real architecture',
        categoryWeight: { integration: 18, rag: 14, architecture: 15, defense: 16 },
        tier: 'Intermediate',
      },
      {
        id: 'deployed_agent',
        label: 'Live hosted AI application / autonomous agent with real users and GitHub proof',
        sub: 'Top-tier portfolio candidate with demonstrable proof-of-work',
        categoryWeight: { integration: 25, rag: 22, architecture: 25, defense: 24 },
        tier: 'Top 5%',
      },
    ],
  },
  {
    id: 'q4',
    category: 'Reliability & Schema Safety',
    tag: 'Question 4 of 6 • Structured Output',
    question: 'How do you guarantee an LLM returns 100% valid JSON so your backend database doesn’t crash?',
    context: 'Testing whether you know production structured output protocols vs naive prompt asking.',
    options: [
      {
        id: 'ask_prompt',
        label: 'Include in prompt: "Respond ONLY with valid JSON. Do not add markdown or conversational text"',
        sub: 'High failure rate in production; fragile prompt engineering',
        categoryWeight: { integration: 8, rag: 7, architecture: 6, defense: 8 },
        tier: 'Fragile',
      },
      {
        id: 'try_catch',
        label: 'Try/catch JSON.parse() on the string with a basic retry loop if it throws an error',
        sub: 'Band-aid solution that increases token cost and latency',
        categoryWeight: { integration: 12, rag: 12, architecture: 12, defense: 14 },
        tier: 'Workaround',
      },
      {
        id: 'tool_calling',
        label: 'Native Function/Tool Calling with strict JSON Schema / Pydantic or Zod validation',
        sub: 'Standard protocol used by OpenAI, Anthropic, and Gemini APIs',
        categoryWeight: { integration: 24, rag: 20, architecture: 22, defense: 24 },
        tier: 'Production',
      },
      {
        id: 'grammar_constrained',
        label: 'Constrained decoding grammar (e.g., GBNF / Outlines) directly at sampling time',
        sub: 'Deep technical mastery of LLM decoding mechanics',
        categoryWeight: { integration: 25, rag: 22, architecture: 25, defense: 25 },
        tier: 'Advanced',
      },
    ],
  },
  {
    id: 'q5',
    category: 'Deployment & Proof of Work',
    tag: 'Question 5 of 6 • GitHub & Live Hosting',
    question: 'When a technical recruiter checks your GitHub link, what will they find?',
    context: '90% of interview shortlists are decided by verified GitHub repositories and live links.',
    options: [
      {
        id: 'empty_local',
        label: 'Only college lab assignments, empty readme files, or code running strictly on localhost',
        sub: 'Recruiters cannot verify if your code actually works',
        categoryWeight: { integration: 5, rag: 4, architecture: 5, defense: 5 },
        tier: 'Needs Work',
      },
      {
        id: 'tutorial_repos',
        label: 'Forked tutorial repos without architectural diagrams, live demo URLs, or custom commits',
        sub: 'Lacks personal engineering ownership',
        categoryWeight: { integration: 11, rag: 9, architecture: 10, defense: 10 },
        tier: 'Basic',
      },
      {
        id: 'hosted_app',
        label: 'Public repository with live Vercel/Render link, video walkthrough, and clear API docs',
        sub: 'Immediately distinguishes you in the initial resume screening round',
        categoryWeight: { integration: 22, rag: 20, architecture: 22, defense: 22 },
        tier: 'Production',
      },
      {
        id: 'cicd_docker',
        label: 'Containerized (Docker), CI/CD GitHub Actions test pipeline, and comprehensive architecture specs',
        sub: 'Demonstrates professional software engineering maturity',
        categoryWeight: { integration: 25, rag: 23, architecture: 25, defense: 25 },
        tier: 'Top 3%',
      },
    ],
  },
  {
    id: 'q6',
    category: 'Interview Technical Defense',
    tag: 'Question 6 of 6 • Placement Readiness',
    question: 'How prepared are you to explain token costs, hallucination safeguards, and prompt injection in a live technical interview?',
    context: 'Senior tech interviewers specifically drill candidates on edge cases and failure modes.',
    scale: true,
  },
];

export default function Quiz({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUESTIONS.length) * 100);

  const handleSelectOption = (option) => {
    const updated = { ...answers, [question.id]: option };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finalizeQuiz(updated);
    }
  };

  const handleSelectScale = (val) => {
    const scaleOption = {
      id: `scale_${val}`,
      label: `Level ${val}/5 Confidence`,
      value: val,
      categoryWeight: {
        integration: val * 5,
        rag: val * 5,
        architecture: val * 5,
        defense: val * 5,
      },
    };
    const updated = { ...answers, q6: scaleOption };
    setAnswers(updated);
    finalizeQuiz(updated);
  };

  const finalizeQuiz = (finalAnswers) => {
    // Calculate 4 distinct domain pillar scores (0 - 25 each)
    let integrationSum = 0;
    let ragSum = 0;
    let archSum = 0;
    let defenseSum = 0;

    Object.values(finalAnswers).forEach((ans) => {
      if (ans?.categoryWeight) {
        integrationSum += ans.categoryWeight.integration || 0;
        ragSum += ans.categoryWeight.rag || 0;
        archSum += ans.categoryWeight.architecture || 0;
        defenseSum += ans.categoryWeight.defense || 0;
      }
    });

    // Normalize each domain to 25
    const integrationScore = Math.min(25, Math.round((integrationSum / 150) * 25));
    const ragScore = Math.min(25, Math.round((ragSum / 150) * 25));
    const archScore = Math.min(25, Math.round((archSum / 150) * 25));
    const defenseScore = Math.min(25, Math.round((defenseSum / 150) * 25));

    const totalScore = Math.min(96, Math.max(34, integrationScore + ragScore + archScore + defenseScore));

    let scoreBand = 'Explorer';
    if (totalScore < 50) scoreBand = 'High Rejection Risk';
    else if (totalScore < 70) scoreBand = 'Needs Practical Upgrade';
    else if (totalScore < 85) scoreBand = 'Intermediate Developer';
    else scoreBand = 'AI Placement Ready';

    onComplete({
      answers: finalAnswers,
      score: totalScore,
      scoreBand,
      breakdown: {
        integration: integrationScore,
        rag: ragScore,
        architecture: archScore,
        defense: defenseScore,
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            if (currentStep > 0) setCurrentStep(currentStep - 1);
            else onBack();
          }}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 0 ? 'Back to Overview' : 'Previous Question'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
            {question.category}
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            {currentStep + 1}/{QUESTIONS.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-zinc-800/80 overflow-hidden mb-6">
        <div
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="dev-card p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#0f111a]/90 relative shadow-xl">
        <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 mb-2">
          {question.tag}
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
          {question.question}
        </h2>

        {question.context && (
          <p className="text-xs text-zinc-400 mb-6 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80 flex items-start gap-2">
            <span className="text-indigo-400 text-sm leading-none shrink-0 mt-0.5">ℹ</span>
            <span>{question.context}</span>
          </p>
        )}

        {/* Regular 4-Choice Options */}
        {!question.scale && (
          <div className="space-y-3">
            {question.options.map((opt) => {
              const isSelected = answers[question.id]?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm'
                      : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                      <span>{opt.label}</span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">{opt.sub}</div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                      opt.tier === 'Production' || opt.tier === 'Advanced' || opt.tier === 'Top 5%' || opt.tier === 'Top 3%'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : opt.tier === 'High Rejection Risk' || opt.tier === 'Zero Experience' || opt.tier === 'Needs Work'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    {opt.tier}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Scale Question */}
        {question.scale && (
          <div className="py-2">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-4">
              {[
                { val: 1, title: 'Unprepared', desc: 'Will likely stumble on system design' },
                { val: 2, title: 'Basic Theory', desc: 'Know terms, but no code proof' },
                { val: 3, title: 'Average', desc: 'Can explain basic prompt calling' },
                { val: 4, title: 'Competent', desc: 'Understand latency, tokens & RAG' },
                { val: 5, title: 'Battle-Tested', desc: 'Ready for Senior SDE rounds' },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => handleSelectScale(item.val)}
                  className="flex flex-col text-left p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500 hover:bg-indigo-600/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-indigo-400">
                      Level {item.val}
                    </span>
                    <span className="text-sm">
                      {item.val === 1 ? '⚠️' : item.val === 5 ? '🔥' : '⚡'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-zinc-200">{item.title}</div>
                  <div className="text-[10px] text-zinc-400 mt-1 leading-tight">{item.desc}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-center text-zinc-500">
              Select your realistic level of technical interview preparedness
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
