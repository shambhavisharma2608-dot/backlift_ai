import React, { useState } from 'react';
import {
  Users2,
  Flame,
  Send,
} from 'lucide-react';
import { StudyBuddyGroup, Backlog } from '../../types';
import { sampleStudyBuddyGroups } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface StudyBuddyProps {
  backlogs: Backlog[];
  onNavigateTab: (tab: any) => void;
}

export const StudyBuddy: React.FC<StudyBuddyProps> = () => {
  const [groups] = useState<StudyBuddyGroup[]>(sampleStudyBuddyGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(groups[0].id);
  const [chatInput, setChatInput] = useState('');
  const [groupMessages, setGroupMessages] = useState<{ [key: string]: string[] }>({
    'group-1': [
      'You: Hey everyone, who has solved the 2024 Fourier Question 3?',
      'Priya: Just posted the handwritten proof in Resources! Check Unit 1 folder.',
      'Aman: Joining the 8 PM sprint. Aiming for 2 hours today!',
    ],
    'group-2': [
      'Karan: Deadlock Bankers algorithm is confirmed for 14 marks.',
      'Sneha: Anyone up for a quick 10-question MCQ practice?',
    ],
  });

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setGroupMessages((prev) => ({
      ...prev,
      [selectedGroupId]: [
        ...(prev[selectedGroupId] || []),
        `You: ${chatInput}`,
      ],
    }));
    setChatInput('');
  };

  const handleJoinGoal = () => {
    confetti({ particleCount: 50, spread: 60 });
    setGroupMessages((prev) => ({
      ...prev,
      [selectedGroupId]: [
        ...(prev[selectedGroupId] || []),
        `System: You joined today's shared sprint goal! 🔥`,
      ],
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Users2 className="w-5 h-5 text-teal-400" />
            Study Buddy & Peer Recovery Lobbies
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Connect with students appearing for the exact same backlog paper. Shared accountability destroys isolation.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>19 Peers Online in Your Repeat Subjects</span>
        </div>
      </div>

      {/* Main Grid: Groups List on Left, Active Lounge on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 5 Cols: Lobbies List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Matched Course Lobbies
          </div>

          <div className="space-y-3.5">
            {groups.map((group) => {
              const isSelected = group.id === selectedGroupId;
              return (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900/90 border-teal-500 shadow-xl shadow-teal-500/10 ring-1 ring-teal-500/50'
                      : 'glass-panel hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-800/60">
                        {group.subjectCode}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {group.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{group.activeOnline} Online</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2.5 line-clamp-1">
                    Sprint: {group.dailySprintGoal}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
                    <span>{group.memberCount} peers enrolled</span>
                    <span className="text-amber-400 font-semibold">{group.targetExamDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: Active Lounge Chat & Daily Group Sprint Goal */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Lounge Header */}
            <div className="flex items-start justify-between border-b border-white/[0.06] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  {selectedGroup.subjectName}
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  {selectedGroup.name}
                </h3>
              </div>
              <button
                onClick={handleJoinGoal}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-md shadow-teal-600/20 cursor-pointer"
              >
                Join Shared Sprint
              </button>
            </div>

            {/* Daily Goal Banner */}
            <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 text-xs text-teal-200 flex items-center gap-3">
              <Flame className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <strong className="text-white">Today's Group Goal:</strong> {selectedGroup.dailySprintGoal}
              </div>
            </div>

            {/* Chat Box */}
            <div className="h-72 overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-950/40 border border-white/[0.04]">
              {(groupMessages[selectedGroupId] || []).map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3.5 rounded-2xl bg-slate-800/40 border border-white/[0.06] text-xs text-slate-200 leading-relaxed"
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2.5 pt-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-md shadow-teal-600/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
