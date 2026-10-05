import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { registerStudent } from '../services/api';

const POPULAR_COLLEGES = [
  'JNTU College of Engineering, Hyderabad',
  'Chaitanya Bharathi Institute of Technology (CBIT)',
  'VNR Vignana Jyothi Institute of Engineering (VNR VJIET)',
  'University College of Engineering, Osmania',
  'Vasavi College of Engineering',
  'SRM Institute of Science & Technology',
  'Vellore Institute of Technology (VIT)',
  'Anna University, Chennai',
  'Gokaraju Rangaraju Institute of Engineering (GRIET)',
  'BVRIT Hyderabad College of Engineering',
];

export default function RegistrationForm({
  quizResult,
  initialRefCode = '',
  onSuccess,
  onBack,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: 'Computer Science / IT',
    graduationYear: '2025 (Final Year)',
    referralCode: initialRefCode,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);

  useEffect(() => {
    if (!formData.referralCode) {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');

      if (ref) {
        setFormData((prev) => ({
          ...prev,
          referralCode: ref.toUpperCase(),
        }));
      }
    }
  }, [formData.referralCode]);

  const handleCollegeChange = (e) => {
    const val = e.target.value;

    setFormData({
      ...formData,
      college: val,
    });

    if (val.length > 1) {
      const filtered = POPULAR_COLLEGES.filter((college) =>
        college.toLowerCase().includes(val.toLowerCase())
      );

      setCollegeSuggestions(filtered);
    } else {
      setCollegeSuggestions([]);
    }
  };

  const handleSelectCollege = (name) => {
    setFormData({
      ...formData,
      college: name,
    });

    setCollegeSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.college.trim()
    ) {
      setError('Please provide all mandatory fields.');
      return;
    }

    setLoading(true);

    try {
      /*
       * Quiz.jsx stores the complete answer objects because
       * the scoring system needs fields such as categoryWeight,
       * tier, id, label, etc.
       *
       * MongoDB, however, stores quiz answers as strings.
       * Therefore, normalize each answer before sending it.
       */
      const rawAnswers = quizResult?.answers || {};

      const normalizedQuizAnswers = Object.fromEntries(
        Object.entries(rawAnswers).map(([key, answer]) => [
          key,
          typeof answer === 'string'
            ? answer
            : answer?.label ||
              answer?.id ||
              String(answer?.value ?? ''),
        ])
      );

      const payload = {
        ...formData,

        score: quizResult?.score || 68,

        scoreBand:
          quizResult?.scoreBand || 'Needs Practical Upgrade',

        quizAnswers: normalizedQuizAnswers,

        utmSource: formData.referralCode
          ? 'referral'
          : 'web_direct',
      };

      console.log('Registration payload:', payload);

      const res = await registerStudent(payload);

      if (res.success) {
        onSuccess(res.registration);
      } else {
        setError(
          res.message || 'Registration failed. Please try again.'
        );
      }
    } catch (err) {
      console.error('Registration Error:', err);

      setError(
        err?.message ||
          'Could not connect to registration server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Diagnostic Report</span>
      </button>

      {/* Form Card */}
      <div className="dev-card p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#0f111a]/95 shadow-xl relative">
        {quizResult?.score && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold mb-4">
            <span>
              ● Benchmark Score {quizResult.score}/100 attached to profile
            </span>
          </div>
        )}

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Confirm Free Workshop Registration
        </h2>

        <p className="text-xs text-zinc-400 mb-6">
          Limited to 500 final-year engineering students. Live Google
          Meet link and repository starter templates will be sent via
          WhatsApp.
        </p>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs mb-5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5">
              FULL NAME <span className="text-rose-400">*</span>
            </label>

            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5">
              COLLEGE / PERSONAL EMAIL{' '}
              <span className="text-rose-400">*</span>
            </label>

            <input
              type="email"
              required
              placeholder="e.g. rahul@college.ac.in"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5">
              WHATSAPP NUMBER (FOR WORKSHOP ACCESS LINK){' '}
              <span className="text-rose-400">*</span>
            </label>

            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* College */}
          <div className="relative">
            <label className="block text-xs font-mono text-zinc-300 mb-1.5">
              ENGINEERING COLLEGE{' '}
              <span className="text-rose-400">*</span>
            </label>

            <input
              type="text"
              required
              placeholder="Search or enter your engineering college..."
              value={formData.college}
              onChange={handleCollegeChange}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-indigo-500 transition-colors"
            />

            {collegeSuggestions.length > 0 && (
              <ul className="absolute z-20 left-0 right-0 mt-1 max-h-44 overflow-y-auto rounded-lg bg-[#0e0f18] border border-zinc-700 shadow-xl divide-y divide-zinc-800 text-xs">
                {collegeSuggestions.map((college, index) => (
                  <li
                    key={`${college}-${index}`}
                    onClick={() => handleSelectCollege(college)}
                    className="px-3 py-2 text-zinc-200 hover:bg-indigo-600/20 hover:text-white cursor-pointer transition-colors"
                  >
                    {college}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Branch + Graduation Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                BRANCH
              </label>

              <select
                value={formData.branch}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    branch: e.target.value,
                  })
                }
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-zinc-200 outline-none focus:border-indigo-500"
              >
                <option value="Computer Science / IT">
                  Computer Science / IT
                </option>

                <option value="AI & Data Science">
                  AI & Data Science
                </option>

                <option value="Electronics (ECE / EEE)">
                  Electronics (ECE / EEE)
                </option>

                <option value="Mechanical / Civil">
                  Mechanical / Civil
                </option>

                <option value="Other Engineering">
                  Other Engineering
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                GRADUATION YEAR
              </label>

              <select
                value={formData.graduationYear}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    graduationYear: e.target.value,
                  })
                }
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-zinc-200 outline-none focus:border-indigo-500"
              >
                <option value="2025 (Final Year)">
                  2025 (Final Year)
                </option>

                <option value="2026 (Pre-Final Year)">
                  2026 (Pre-Final Year)
                </option>
              </select>
            </div>
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5">
              REFERRAL PASS CODE (OPTIONAL)
            </label>

            <input
              type="text"
              placeholder="e.g. NXT-SAIV-8821"
              value={formData.referralCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  referralCode: e.target.value.toUpperCase(),
                })
              }
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-indigo-300 placeholder-zinc-600 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25 mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Confirming Seat...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Lock In Free Seat (100% Free)</span>
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-center text-zinc-500 mt-4">
          🔒 Zero spam policy. WhatsApp is strictly used to send the Google
          Meet URL and AI project starter repository.
        </p>
      </div>
    </div>
  );
}