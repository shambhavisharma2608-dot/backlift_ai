import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { StudentProfile, Backlog } from '../types';
import { calculateBacklogPriority } from '../services/priorityEngine';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: StudentProfile, backlogs: Backlog[]) => void;
  initialProfile: StudentProfile;
  initialBacklogsList: Backlog[];
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  initialProfile,
  initialBacklogsList,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);

  // Form states matching the 10 prompt requirements:
  // 1. Name, 2. Degree, 3. Semester, 4. Current Subjects, 5. Backlog Subjects,
  // 6. Exam Dates, 7. Difficulty, 8. Current Prep, 9. Daily Study Hours, 10. Preferred Time
  const [name, setName] = useState(initialProfile.name);
  const [college, setCollege] = useState(initialProfile.college);
  const [degree, setDegree] = useState(initialProfile.degree);
  const [semester, setSemester] = useState(initialProfile.semester);
  const [currentSubjectsText, setCurrentSubjectsText] = useState(
    'Cloud Computing, Compiler Design, Web Technologies, Machine Learning'
  );

  // Primary backlog being configured
  const [backlogName, setBacklogName] = useState(
    initialBacklogsList[0]?.subjectName || 'Engineering Mathematics-II'
  );
  const [backlogCode, setBacklogCode] = useState(
    initialBacklogsList[0]?.subjectCode || 'MATH201'
  );
  const [backlogCredits, setBacklogCredits] = useState(
    initialBacklogsList[0]?.credits || 4
  );
  const [backlogAttempts, setBacklogAttempts] = useState(
    initialBacklogsList[0]?.attemptCount || 2
  );
  const [examDate, setExamDate] = useState(
    initialBacklogsList[0]?.targetExamDate ||
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [difficulty, setDifficulty] = useState(initialBacklogsList[0]?.difficulty || 5);
  const [prepPercentage, setPrepPercentage] = useState(
    initialBacklogsList[0]?.prepPercentage || 35
  );

  const [dailyHours, setDailyHours] = useState(initialProfile.dailyStudyHours || 4.0);
  const [preferredTime, setPreferredTime] = useState<'morning' | 'afternoon' | 'evening' | 'night'>(
    initialProfile.preferredStudyTime || 'evening'
  );

  const handleFinish = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    const updatedProfile: StudentProfile = {
      ...initialProfile,
      name,
      college,
      degree,
      semester,
      dailyStudyHours: Number(dailyHours),
      preferredStudyTime: preferredTime,
    };

    // Recalculate first backlog or keep list updated
    const updatedBacklogs: Backlog[] = initialBacklogsList.map((b, idx) => {
      if (idx === 0) {
        const raw = {
          ...b,
          subjectName: backlogName,
          subjectCode: backlogCode,
          credits: Number(backlogCredits),
          attemptCount: Number(backlogAttempts),
          targetExamDate: examDate,
          difficulty: Number(difficulty),
          prepPercentage: Number(prepPercentage),
        };
        const { score, status } = calculateBacklogPriority(raw);
        return { ...raw, priorityScore: score, status };
      }
      return b;
    });

    onSaveProfile(updatedProfile, updatedBacklogs);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        {/* Header Progress */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Personalized Recovery Onboarding
              </h3>
              <p className="text-xs text-slate-400">
                Calibrating your customized Academic Turnaround Plan
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800">
            Step {step} of 3
          </span>
        </div>

        {/* Step 1: Academic Identity (1. Name, 2. Degree, 3. Semester, 4. Current Subjects) */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  1. Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  2. College / University
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Enter college / university name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  3. Degree Program
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Enter degree program"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  4. Current Semester / Year
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={1}>Semester 1 (1st Year)</option>
                  <option value={2}>Semester 2 (1st Year)</option>
                  <option value={3}>Semester 3 (2nd Year)</option>
                  <option value={4}>Semester 4 (2nd Year)</option>
                  <option value={5}>Semester 5 (3rd Year)</option>
                  <option value={6}>Semester 6 (3rd Year)</option>
                  <option value={7}>Semester 7 (4th Year)</option>
                  <option value={8}>Semester 8 (4th Year)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ongoing Current Semester Subjects (to balance workload)
              </label>
              <input
                type="text"
                value={currentSubjectsText}
                onChange={(e) => setCurrentSubjectsText(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Comma-separated subjects"
              />
            </div>
          </div>
        )}

        {/* Step 2: Backlog Details (5. Backlog Subject, 6. Exam Date, 7. Difficulty, 8. Current Prep) */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 flex gap-3 text-xs text-amber-300">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>
                Enter your highest-stress backlog paper. The <strong>Backlog Priority Engine</strong> will calculate your immediate study targets.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  5. Backlog Subject Name
                </label>
                <input
                  type="text"
                  value={backlogName}
                  onChange={(e) => setBacklogName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subject Code & Credits
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={backlogCode}
                    onChange={(e) => setBacklogCode(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                    placeholder="Enter subject code"
                  />
                  <input
                    type="number"
                    value={backlogCredits}
                    onChange={(e) => setBacklogCredits(Number(e.target.value))}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                    placeholder="Enter credits (1-6)"
                    min={1}
                    max={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  6. Target Examination Date
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Previous Attempts
                </label>
                <select
                  value={backlogAttempts}
                  onChange={(e) => setBacklogAttempts(Number(e.target.value))}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={1}>1st Attempt (Fresh Backlog)</option>
                  <option value={2}>2nd Attempt (Repeat Examination)</option>
                  <option value={3}>3+ Attempts (Critical Year-Back Risk)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>7. Perceived Difficulty</span>
                  <span className="text-indigo-400">{difficulty} / 5</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Manageable</span>
                  <span>Moderate</span>
                  <span>Extremely Tough</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>8. Current Preparation Level</span>
                  <span className="text-emerald-400">{prepPercentage}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={prepPercentage}
                  onChange={(e) => setPrepPercentage(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Starting Fresh (0%)</span>
                  <span>Halfway (50%)</span>
                  <span>Exam Ready (100%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Study Constraints (9. Available Hours, 10. Preferred Time) */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>9. Available Study Hours Per Day</span>
                <span className="text-indigo-400 font-bold text-sm">
                  {dailyHours} Hours/Day
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Be realistic. We recommend 3.0 to 4.5 hours to avoid study fatigue and timetable abandonment.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                10. Preferred Study Time Window
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'morning', label: 'Morning', icon: '🌅', time: '6 AM - 10 AM' },
                  { id: 'afternoon', label: 'Afternoon', icon: '☀️', time: '12 PM - 4 PM' },
                  { id: 'evening', label: 'Evening', icon: '🌆', time: '5 PM - 9 PM' },
                  { id: 'night', label: 'Late Night', icon: '🌙', time: '9 PM - 1 AM' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPreferredTime(opt.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      preferredTime === opt.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xl mb-1">{opt.icon}</div>
                    <div className="text-xs font-bold text-slate-200">{opt.label}</div>
                    <div className="text-[10px] text-slate-400">{opt.time}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-950/40 border border-indigo-800/50 p-4 text-xs text-slate-300 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Ready for Calibration:</span>
                <p className="text-slate-400 mt-0.5">
                  BackLift AI will immediately construct your initial Academic Recovery Score, prioritize your units, and populate your 7-day adaptive sprint.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-5 mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-200 transition"
            >
              Skip / Use Sample Data
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/25"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition shadow-xl shadow-indigo-600/30"
            >
              Generate My Recovery Plan
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
