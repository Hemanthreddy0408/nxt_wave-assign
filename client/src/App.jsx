import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import ScoreCalculation from './components/ScoreCalculation';
import ResultReport from './components/ResultReport';
import RegistrationForm from './components/RegistrationForm';
import ReferralHub from './components/ReferralHub';
import AdminDashboard from './components/AdminDashboard';
import { trackFunnelEvent, getGrowthMetrics } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin'
  const [studentStep, setStudentStep] = useState('hero'); // 'hero' | 'quiz' | 'calculating' | 'result' | 'register' | 'hub'
  
  const [quizResult, setQuizResult] = useState(null);
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [totalRegistrations, setTotalRegistrations] = useState(342);
  const [initialRefCode, setInitialRefCode] = useState('');

  // Initial load
  useEffect(() => {
    trackFunnelEvent('page_view', { path: window.location.pathname });

    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setInitialRefCode(ref.toUpperCase());
      trackFunnelEvent('referral_landing_visit', { code: ref });
    }

    loadInitialMetrics();
  }, []);

  const loadInitialMetrics = async () => {
    try {
      const res = await getGrowthMetrics();
      if (res.success && res.totalRegistrations) {
        setTotalRegistrations(res.totalRegistrations);
      }
    } catch (e) {
      console.debug('Metrics error', e);
    }
  };

  // Funnel Navigation Handlers
  const handleStartQuiz = () => {
    trackFunnelEvent('quiz_start');
    setStudentStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectRegister = () => {
    trackFunnelEvent('direct_register_click');
    setStudentStep('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (result) => {
    trackFunnelEvent('quiz_complete', { score: result.score, band: result.scoreBand });
    setQuizResult(result);
    setStudentStep('calculating');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalculationFinished = () => {
    setStudentStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToRegister = () => {
    trackFunnelEvent('proceed_to_register', { score: quizResult?.score });
    setStudentStep('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationSuccess = (student) => {
    trackFunnelEvent('registration_success', {
      studentId: student._id,
      code: student.referralCode,
    });
    setRegisteredStudent(student);
    setTotalRegistrations((prev) => prev + 1);
    setStudentStep('hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050508] text-white selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalRegistrations={totalRegistrations}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'admin' ? (
          <AdminDashboard />
        ) : (
          <div className="relative">
            {/* Step 1: Hero */}
            {studentStep === 'hero' && (
              <Hero
                onStartQuiz={handleStartQuiz}
                onDirectRegister={handleDirectRegister}
                totalRegistrations={totalRegistrations}
              />
            )}

            {/* Step 2: Quiz */}
            {studentStep === 'quiz' && (
              <Quiz
                onComplete={handleQuizComplete}
                onBack={() => setStudentStep('hero')}
              />
            )}

            {/* Step 3: Calculating Anticipation Screen */}
            {studentStep === 'calculating' && (
              <ScoreCalculation onFinished={handleCalculationFinished} />
            )}

            {/* Step 4: Result Report */}
            {studentStep === 'result' && (
              <ResultReport
                quizResult={quizResult}
                onProceedToRegister={handleProceedToRegister}
                onRetake={() => setStudentStep('quiz')}
              />
            )}

            {/* Step 5: Registration Form */}
            {studentStep === 'register' && (
              <RegistrationForm
                quizResult={quizResult}
                initialRefCode={initialRefCode}
                onSuccess={handleRegistrationSuccess}
                onBack={() => setStudentStep(quizResult ? 'result' : 'hero')}
              />
            )}

            {/* Step 6: Post-Registration Viral Loop / Referral Hub */}
            {studentStep === 'hub' && (
              <ReferralHub
                student={registeredStudent}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">NxtWave Academy</span>
            <span>&bull;</span>
            <span>Build Your First AI Project in 60 Minutes</span>
          </div>
          <div>
            <span>Live Hands-On Masterclass for 2025 Placement Candidates</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
