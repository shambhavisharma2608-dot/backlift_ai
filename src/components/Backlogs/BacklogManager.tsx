import React, { useState } from 'react';
import {
  AlertTriangle,
  Plus,
  Trash2,
  Calendar,
  Award,
  CheckCircle2,
  ArrowUpDown,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Backlog } from '../../types';
import { calculateBacklogPriority } from '../../services/priorityEngine';
import confetti from 'canvas-confetti';

interface BacklogManagerProps {
  backlogs: Backlog[];
  onUpdateBacklogs: (updated: Backlog[]) => void;
  onNavigateTab: (tab: any) => void;
}

export const BacklogManager: React.FC<BacklogManagerProps> = ({
  backlogs,
  onUpdateBacklogs,
  onNavigateTab,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBacklogId, setSelectedBacklogId] = useState<string>(
    backlogs[0]?.id || ''
  );

  // New backlog form state
  const [newSubject, setNewSubject] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newSemester, setNewSemester] = useState(2);
  const [newCredits, setNewCredits] = useState(4);
  const [newAttempts, setNewAttempts] = useState(1);
  const [newExamDate, setNewExamDate] = useState(
    new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [newDifficulty, setNewDifficulty] = useState(4);
  const [newPrep, setNewPrep] = useState(25);

  const selectedBacklog =
    backlogs.find((b) => b.id === selectedBacklogId) || backlogs[0];

  const handleAddBacklog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newCode.trim()) return;

    const raw = {
      id: `backlog-${Date.now()}`,
      subjectName: newSubject,
      subjectCode: newCode.toUpperCase(),
      semester: Number(newSemester),
      credits: Number(newCredits),
      attemptCount: Number(newAttempts),
      targetExamDate: newExamDate,
      difficulty: Number(newDifficulty),
      prepPercentage: Number(newPrep),
      colorTag: '#818CF8',
      topics: [
        { id: `top-${Date.now()}-1`, title: 'Unit 1: Fundamentals & Core Definitions', unitNumber: 1, historicalFrequency: 90, isCompleted: false },
        { id: `top-${Date.now()}-2`, title: 'Unit 2: Analytical Methods & Theorems', unitNumber: 2, historicalFrequency: 85, isCompleted: false },
        { id: `top-${Date.now()}-3`, title: 'Unit 3: Applied System Numericals', unitNumber: 3, historicalFrequency: 80, isCompleted: false },
        { id: `top-${Date.now()}-4`, title: 'Unit 4: Advanced Problem Solving', unitNumber: 4, historicalFrequency: 75, isCompleted: false },
      ],
    };

    const { score, status } = calculateBacklogPriority(raw);
    const created: Backlog = { ...raw, priorityScore: score, status };

    const updated = [created, ...backlogs];
    onUpdateBacklogs(updated);
    setSelectedBacklogId(created.id);
    setShowAddModal(false);

    setNewSubject('');
    setNewCode('');

    confetti({ particleCount: 50, spread: 60 });
  };

  const handleDeleteBacklog = (id: string) => {
    const updated = backlogs.filter((b) => b.id !== id);
    onUpdateBacklogs(updated);
    if (selectedBacklogId === id && updated.length > 0) {
      setSelectedBacklogId(updated[0].id);
    }
  };

  const handleToggleTopic = (backlogId: string, topicId: string) => {
    const updated = backlogs.map((b) => {
      if (b.id === backlogId) {
        const updatedTopics = b.topics.map((t) =>
          t.id === topicId ? { ...t, isCompleted: !t.isCompleted } : t
        );
        const completedCount = updatedTopics.filter((t) => t.isCompleted).length;
        const newPrepPct = Math.round((completedCount / updatedTopics.length) * 100);

        const { score, status } = calculateBacklogPriority({
          ...b,
          prepPercentage: newPrepPct,
        });

        if (newPrepPct === 100) {
          confetti({ particleCount: 100, spread: 90 });
        }

        return {
          ...b,
          topics: updatedTopics,
          prepPercentage: newPrepPct,
          priorityScore: score,
          status,
        };
      }
      return b;
    });

    onUpdateBacklogs(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Backlog Manager & Priority Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Organized backlog inventory mathematically triaged by urgency, credits, and preparation deficit.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition hover:scale-102 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Pending Subject</span>
        </button>
      </div>

      {/* Main Grid: Backlog Cards on Left, Detailed View on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Backlog Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between px-1">
            <span>Triage List ({backlogs.length} Subjects)</span>
            <span className="text-[10px] text-indigo-400 flex items-center gap-1 font-semibold">
              <ArrowUpDown className="w-3 h-3" /> Auto-Ranked
            </span>
          </div>

          <div className="space-y-3.5">
            {backlogs.map((b) => {
              const isSelected = b.id === selectedBacklogId;
              const today = new Date();
              const diff = new Date(b.targetExamDate).getTime() - today.getTime();
              const daysLeft = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));

              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBacklogId(b.id)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900/90 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                      : 'glass-panel hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          {b.subjectName}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                          {b.subjectCode}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Sem {b.semester} • {b.credits} Credits • Attempt #{b.attemptCount}
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          b.status === 'critical'
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                            : b.status === 'high'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        Priority {b.priorityScore}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-1 font-semibold">
                        {daysLeft}d to exam
                      </div>
                    </div>
                  </div>

                  <div className="mt-3.5 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Preparation</span>
                      <span className="font-semibold text-slate-200">{b.prepPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${b.prepPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Backlog Details & Unit Checklist */}
        <div className="lg:col-span-7 space-y-4">
          {selectedBacklog ? (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex items-start justify-between border-b border-white/[0.06] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Subject Recovery Roadmap
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                      Sem {selectedBacklog.semester}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    {selectedBacklog.subjectName} ({selectedBacklog.subjectCode})
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-2.5">
                    <span>
                      Target Exam: <strong className="text-slate-200">{selectedBacklog.targetExamDate}</strong>
                    </span>
                    <span>
                      Credits: <strong className="text-slate-200">{selectedBacklog.credits}</strong>
                    </span>
                    <span>
                      Attempts: <strong className="text-slate-200">{selectedBacklog.attemptCount}</strong>
                    </span>
                    <span>
                      Difficulty: <strong className="text-amber-400">{selectedBacklog.difficulty}/5</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteBacklog(selectedBacklog.id)}
                  className="p-2.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
                  title="Remove this subject"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Topics Breakdown List with Completion Toggles */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    Unit & Topic Recovery Checklist
                  </h4>
                  <span className="text-xs font-semibold text-emerald-400">
                    {selectedBacklog.topics.filter((t) => t.isCompleted).length} /{' '}
                    {selectedBacklog.topics.length} Units Mastered
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedBacklog.topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => handleToggleTopic(selectedBacklog.id, topic.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        topic.isCompleted
                          ? 'bg-slate-900/30 border-emerald-500/20 text-slate-400'
                          : 'bg-slate-800/40 border-white/[0.06] hover:border-indigo-500/30 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                            topic.isCompleted
                              ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                              : 'border-slate-600'
                          }`}
                        >
                          {topic.isCompleted && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${topic.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                            {topic.title}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Unit {topic.unitNumber} • Historical Question Frequency: {topic.historicalFrequency}%
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-800/50">
                        {topic.isCompleted ? 'Cleared' : 'Mark Done'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons for this subject */}
              <div className="flex flex-wrap gap-3 pt-3 border-t border-white/[0.06]">
                <button
                  onClick={() => onNavigateTab('chatbot')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Ask AI About {selectedBacklog.subjectCode}
                </button>
                <button
                  onClick={() => onNavigateTab('quizzes')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition cursor-pointer"
                >
                  Generate Practice Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl glass-panel text-center text-slate-400">
              No backlogs recorded. Click "+ Add Pending Subject" to get started.
            </div>
          )}
        </div>
      </div>

      {/* Add Backlog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border border-white/10">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                Add New Backlog Paper
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddBacklog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Enter subject name"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="Enter subject code"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Credits (1 - 6)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newCredits}
                    onChange={(e) => setNewCredits(Number(e.target.value))}
                    placeholder="Enter credits"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Origin Semester
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={newSemester}
                    onChange={(e) => setNewSemester(Number(e.target.value))}
                    placeholder="Enter semester"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Target Exam Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newExamDate}
                    onChange={(e) => setNewExamDate(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Difficulty ({newDifficulty}/5)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Initial Prep ({newPrep}%)
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={newPrep}
                    onChange={(e) => setNewPrep(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  Save & Calibrate Priority
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
