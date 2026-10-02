import React, { useState } from 'react';
import {
  User,
  School,
  Clock,
  Bell,
  Shield,
  FileDown,
  RotateCcw,
  Sparkles,
  Save,
  CheckCircle2,
  LogOut,
} from 'lucide-react';
import { StudentProfile, Backlog } from '../../types';

interface ProfileSettingsProps {
  student: StudentProfile;
  backlogs: Backlog[];
  onUpdateProfile: (updated: StudentProfile) => void;
  onOpenReportModal: () => void;
  onResetData: () => void;
  onLogout?: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  student,
  backlogs,
  onUpdateProfile,
  onOpenReportModal,
  onResetData,
  onLogout,
}) => {
  const [formData, setFormData] = useState<StudentProfile>(student);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notification toggles state
  const [notifyMissedDay, setNotifyMissedDay] = useState(true);
  const [notifyBuddy, setNotifyBuddy] = useState(true);
  const [notifyExamReminders, setNotifyExamReminders] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-400" />
            <span>Profile & Study Settings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your academic degree information, daily study capacity, and recovery alert preferences.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition cursor-pointer"
        >
          <FileDown className="w-4 h-4" />
          <span>Export Recovery Dossier</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Your profile and study schedule parameters have been updated successfully!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Academic Identity */}
        <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <School className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Academic Identity & Degree Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Student Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">University / College</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Program / Degree</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Current Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem} className="bg-slate-900 text-white">
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Study Capacity & Schedule Calibration */}
        <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Study Capacity & Triage Allocation</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Daily Study Capacity</span>
                <span className="font-bold text-amber-400">{formData.dailyStudyHours} Hours / Day</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.5"
                value={formData.dailyStudyHours}
                onChange={(e) => setFormData({ ...formData, dailyStudyHours: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                The Adaptive Study Planner automatically distributes this study time across your active {backlogs.length} backlogs.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-300">Preferred Study Window</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['morning', 'afternoon', 'evening', 'night'] as const).map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredStudyTime: time })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition cursor-pointer ${
                      formData.preferredStudyTime === time
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900/60 text-slate-400 border-white/[0.06] hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Notification & Proactive Alert Toggles */}
        <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Bell className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Accountability & Alert Preferences</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div>
                <div className="text-xs font-bold text-white">Missed-Day Proactive Rebalancing Alert</div>
                <div className="text-[10px] text-slate-400">Notifies you if yesterday had uncompleted tasks and prompts 1-click rebalance.</div>
              </div>
              <button
                type="button"
                onClick={() => setNotifyMissedDay(!notifyMissedDay)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${
                  notifyMissedDay ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div>
                <div className="text-xs font-bold text-white">Study Buddy Repeat Exam Lobby Invites</div>
                <div className="text-[10px] text-slate-400">Alerts you when peers studying the same backlog subject start a focus sprint.</div>
              </div>
              <button
                type="button"
                onClick={() => setNotifyBuddy(!notifyBuddy)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${
                  notifyBuddy ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div>
                <div className="text-xs font-bold text-white">Exam Proximity Urgency Reminders</div>
                <div className="text-[10px] text-slate-400">Activates Smart Revision Mode 72 hours before your target exam date.</div>
              </div>
              <button
                type="button"
                onClick={() => setNotifyExamReminders(!notifyExamReminders)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${
                  notifyExamReminders ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition hover:scale-102 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="p-6 rounded-3xl glass-panel border border-rose-500/20 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
          Reset Data & Prototype Calibration
        </div>
        <p className="text-xs text-slate-400">
          Reset all stored localStorage backlogs, study schedules, and timer history to the default 7th-semester student scenario (Rahul Sharma).
        </p>
        <div className="flex flex-wrap gap-3">
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out of Student Account</span>
            </button>
          )}
          <button
            type="button"
            onClick={onResetData}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/[0.08] text-xs font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Backlog Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
