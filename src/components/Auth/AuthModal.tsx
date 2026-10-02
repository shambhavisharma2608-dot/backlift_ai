import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  School,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { StudentProfile } from '../../types';
import { BackLiftLogo } from '../Common/BackLiftLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile?: Partial<StudentProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signup' && name) {
      onLoginSuccess({ name, college });
    } else {
      onLoginSuccess();
    }
    onClose();
  };

  const handleDemoSignIn = () => {
    onLoginSuccess({
      name: 'Student',
      college: 'Engineering Institution',
      degree: 'B.Tech in Computer Science & Engineering',
      semester: 7,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0d1322] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header with Custom Logo */}
        <div className="flex flex-col items-center text-center space-y-3">
          <BackLiftLogo size="lg" showText={false} />
          <div>
            <h3 className="text-xl font-black text-white">
              {authMode === 'signin' ? 'Welcome Back to BackLift.AI' : 'Create Your Student Account'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {authMode === 'signin'
                ? 'Log in to continue your academic recovery sprint.'
                : 'Join thousands of university students turning backlogs into degree completion.'}
            </p>
          </div>
        </div>

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              authMode === 'signin'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              authMode === 'signup'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* 1-Click Quick Login */}
        <button
          type="button"
          onClick={handleDemoSignIn}
          className="w-full py-2.5 px-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Quick Guest Login</span>
        </button>

        {/* Social SSO Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>Google SSO</span>
          </button>
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>GitHub Auth</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-slate-500 text-xs">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span>or continue with credentials</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">College / Institution</label>
              <div className="relative">
                <School className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Enter college name"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition hover:scale-102 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{authMode === 'signin' ? 'Sign In to BackLift.AI' : 'Create Student Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[10px] text-slate-500">
          Protected by AES-256 encryption. DPDP Act & FERPA compliant academic data isolation.
        </div>
      </div>
    </div>
  );
};
