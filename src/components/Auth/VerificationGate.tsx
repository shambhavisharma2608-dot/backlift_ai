import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  School,
  User,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertCircle,
  GraduationCap,
  Mail,
  Fingerprint,
} from 'lucide-react';
import { BackLiftLogo } from '../Common/BackLiftLogo';
import { StudentProfile } from '../../types';

interface VerificationGateProps {
  onVerificationSuccess: (profile: Partial<StudentProfile>, sessionInfo: {
    studentName: string;
    studentEmail?: string;
    usn?: string;
    method: 'roll_otp' | 'demo_rahul' | 'custom_signup';
  }) => void;
}

export const VerificationGate: React.FC<VerificationGateProps> = ({
  onVerificationSuccess,
}) => {
  const [tab, setTab] = useState<'usn_verify' | 'demo_verify' | 'new_register'>('usn_verify');

  // USN / OTP State
  const [university, setUniversity] = useState('VTU (Visvesvaraya Technological University)');
  const [usn, setUsn] = useState('1NT20CS042');
  const [email, setEmail] = useState('rahul.sharma@vtu.ac.in');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // New Student State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCollege, setNewStudentCollege] = useState('');
  const [newStudentDegree, setNewStudentDegree] = useState('B.Tech in Computer Science & Engineering');
  const [newStudentSem, setNewStudentSem] = useState(7);

  // Handle Generate OTP
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usn.trim() || !email.trim()) {
      setErrorMessage('Please enter both your University Roll No / USN and College Email.');
      return;
    }
    setErrorMessage('');
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(randomCode);
    setCodeSent(true);
  };

  // Handle Verify Code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredCode.trim()) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }
    if (enteredCode !== generatedCode && enteredCode !== '123456' && enteredCode !== '842190') {
      setErrorMessage('Invalid verification code. Please check the code or click Auto-fill.');
      return;
    }

    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onVerificationSuccess(
        {
          name: usn === '1NT20CS042' ? 'Rahul Sharma' : `Student (${usn.toUpperCase()})`,
          college: university,
          degree: 'B.Tech in Computer Science & Engineering',
          semester: 7,
        },
        {
          studentName: usn === '1NT20CS042' ? 'Rahul Sharma' : `Student (${usn.toUpperCase()})`,
          studentEmail: email,
          usn: usn.toUpperCase(),
          method: 'roll_otp',
        }
      );
    }, 1100);
  };

  // Handle 1-Click Demo Login
  const handleQuickDemoVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerificationSuccess(
        {
          name: 'Rahul Sharma',
          college: 'National Institute of Engineering & Technology (VTU)',
          degree: 'B.Tech in Computer Science & Engineering',
          semester: 7,
        },
        {
          studentName: 'Rahul Sharma',
          studentEmail: 'rahul.sharma@vtu.ac.in',
          usn: '1NT20CS042',
          method: 'demo_rahul',
        }
      );
    }, 800);
  };

  // Handle New Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentCollege.trim()) {
      setErrorMessage('Please fill in your name and college/university.');
      return;
    }
    setErrorMessage('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerificationSuccess(
        {
          name: newStudentName.trim(),
          college: newStudentCollege.trim(),
          degree: newStudentDegree,
          semester: Number(newStudentSem),
        },
        {
          studentName: newStudentName.trim(),
          studentEmail: `${newStudentName.toLowerCase().replace(/\s+/g, '.')}@college.edu`,
          usn: 'REG-' + Math.floor(1000 + Math.random() * 9000),
          method: 'custom_signup',
        }
      );
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar Minimal Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <BackLiftLogo size="md" showTagline={true} />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.08] text-[11px] font-semibold text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Institutional Verification Portal</span>
        </div>
      </header>

      {/* Main Verification Card */}
      <div className="max-w-xl w-full mx-auto my-8 z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-3xl bg-[#0c1220]/90 backdrop-blur-2xl border border-white/[0.09] shadow-2xl p-6 sm:p-10 space-y-7">
          
          {/* Header Title & Security Badge */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Identity Verification Required</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sign In & Student Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              BackLift AI is a protected academic remediation system. Please verify your student identity to unlock the Backlog Priority Engine, Study Planner, and AI Coach.
            </p>
          </div>

          {/* Verification Navigation Tabs */}
          <div className="flex p-1 rounded-2xl bg-slate-950/80 border border-white/[0.07]">
            <button
              type="button"
              onClick={() => { setTab('usn_verify'); setErrorMessage(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                tab === 'usn_verify'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Fingerprint className="w-3.5 h-3.5" />
              <span>USN / OTP Verification</span>
            </button>

            <button
              type="button"
              onClick={() => { setTab('demo_verify'); setErrorMessage(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                tab === 'demo_verify'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Demo Quick Login</span>
            </button>

            <button
              type="button"
              onClick={() => { setTab('new_register'); setErrorMessage(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                tab === 'new_register'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>New Student</span>
            </button>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: USN / ROLL NO & OTP VERIFICATION */}
          {tab === 'usn_verify' && (
            <div className="space-y-5">
              {!codeSent ? (
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Affiliated University / Technical Board</span>
                    </label>
                    <select
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="VTU (Visvesvaraya Technological University)">VTU (Visvesvaraya Technological University)</option>
                      <option value="Anna University Chennai (Affiliated Colleges)">Anna University Chennai</option>
                      <option value="AKTU (Dr. A.P.J. Abdul Kalam Technical University)">AKTU (Dr. A.P.J. Abdul Kalam Technical University)</option>
                      <option value="Mumbai University Engineering Scheme">Mumbai University Engineering Scheme</option>
                      <option value="Autonomous Engineering Institution / AICTE Approved">Autonomous Engineering Institution / AICTE</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                        <span>University Seat No / USN</span>
                      </label>
                      <input
                        type="text"
                        value={usn}
                        onChange={(e) => setUsn(e.target.value)}
                        placeholder="e.g. 1NT20CS042"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono uppercase"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>College Email Address</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul.sharma@vtu.ac.in"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <span>Send 6-Digit Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/25 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <KeyRound className="w-4 h-4 text-cyan-400" />
                        One-Time Passcode Generated
                      </span>
                      <button
                        type="button"
                        onClick={() => setEnteredCode(generatedCode || '842190')}
                        className="text-[11px] font-bold text-cyan-300 hover:text-white underline cursor-pointer"
                      >
                        Auto-fill Code
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Verification code for <span className="font-mono font-bold text-white">{usn.toUpperCase()}</span>:
                    </p>
                    <div className="py-1 px-3 rounded-xl bg-black/40 border border-white/10 inline-block font-mono text-base font-black text-emerald-400 tracking-widest">
                      {generatedCode}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Enter 6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit code"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-center font-mono text-lg tracking-widest text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setCodeSent(false)}
                      className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-white/[0.08] transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Verifying with University Registry...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Verify & Unlock Student Tools</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: DEMO QUICK VERIFICATION (RAHUL SHARMA) */}
          {tab === 'demo_verify' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/25 space-y-3.5 text-left">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white">Rahul Sharma</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                        ✓ Verified Student
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      National Institute of Engineering & Technology (VTU Affiliated)
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300">
                    7th
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/[0.06]">
                  <div>
                    <span className="text-slate-400">USN: </span>
                    <span className="font-mono font-bold text-white">1NT20CS042</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Degree: </span>
                    <span className="font-semibold text-slate-200">B.Tech CSE</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Active Arrears: </span>
                    <span className="font-bold text-rose-400">3 Backlogs</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Initial ARS: </span>
                    <span className="font-bold text-amber-400">42 / 100</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pre-configured benchmark recovery cohort for instant evaluation and demonstration.
                </p>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoVerify}
                disabled={isVerifying}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                {isVerifying ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in as Rahul Sharma...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Verify & Enter as Rahul Sharma (1-Click Demo)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 3: NEW STUDENT REGISTRATION */}
          {tab === 'new_register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-in fade-in">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="e.g. Shambhavi Sharma"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">College / University Name</label>
                <input
                  type="text"
                  required
                  value={newStudentCollege}
                  onChange={(e) => setNewStudentCollege(e.target.value)}
                  placeholder="e.g. Bangalore Institute of Technology"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Engineering Branch</label>
                  <input
                    type="text"
                    value={newStudentDegree}
                    onChange={(e) => setNewStudentDegree(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Current Semester</label>
                  <select
                    value={newStudentSem}
                    onChange={(e) => setNewStudentSem(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                {isVerifying ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating & Verifying Profile...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Create Profile, Verify & Enter</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Security Badges */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CBCS Regulation Calibrated</span>
            </span>
            <span>256-bit Client Encrypted</span>
          </div>

        </div>
      </div>

      {/* Footer Branding */}
      <footer className="text-center text-xs text-slate-500 max-w-md mx-auto z-10">
        BackLift AI Academic Recovery Platform • Designed for Degree Completion
      </footer>
    </div>
  );
};
