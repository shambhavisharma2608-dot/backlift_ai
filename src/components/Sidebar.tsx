import React from 'react';
import {
  LayoutDashboard,
  AlertTriangle,
  Calendar,
  Bot,
  FileSearch,
  BookOpen,
  HelpCircle,
  Timer,
  Users2,
  Building2,
  Briefcase,
  ChevronRight,
  Home,
  Settings,
  LogOut,
} from 'lucide-react';

export type NavTab =
  | 'landing'
  | 'dashboard'
  | 'backlogs'
  | 'planner'
  | 'chatbot'
  | 'analyzer'
  | 'resources'
  | 'quizzes'
  | 'timer'
  | 'buddy'
  | 'campus'
  | 'blueprint'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  backlogCount: number;
  criticalCount: number;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  backlogCount,
  criticalCount,
  onLogout,
}) => {
  const sections = [
    {
      group: 'EXPLORE & SHOWCASE',
      items: [
        {
          id: 'landing' as NavTab,
          label: 'Home / Landing Page',
          icon: Home,
          badge: 'Live',
          badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        },
      ],
    },
    {
      group: 'RECOVERY CORE',
      items: [
        {
          id: 'dashboard' as NavTab,
          label: 'Overview',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          id: 'backlogs' as NavTab,
          label: 'Backlogs',
          icon: AlertTriangle,
          badge: criticalCount > 0 ? `${criticalCount} Urgent` : `${backlogCount}`,
          badgeColor: criticalCount > 0 ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-slate-800 text-slate-400',
        },
        {
          id: 'planner' as NavTab,
          label: 'Study Planner',
          icon: Calendar,
          badge: 'Adaptive',
          badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
        },
        {
          id: 'chatbot' as NavTab,
          label: 'AI Coach (LiftBot)',
          icon: Bot,
          badge: 'Q1-Q5',
          badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
        },
      ],
    },
    {
      group: 'PRACTICE & TOOLS',
      items: [
        {
          id: 'analyzer' as NavTab,
          label: 'Paper Analyzer',
          icon: FileSearch,
          badge: null,
        },
        {
          id: 'resources' as NavTab,
          label: 'Resources Hub',
          icon: BookOpen,
          badge: null,
        },
        {
          id: 'quizzes' as NavTab,
          label: 'AI Quizzes',
          icon: HelpCircle,
          badge: null,
        },
        {
          id: 'timer' as NavTab,
          label: 'Focus Timer',
          icon: Timer,
          badge: '25m',
          badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        },
      ],
    },
    {
      group: 'COMMUNITY & DEFENSE',
      items: [
        {
          id: 'buddy' as NavTab,
          label: 'Study Buddy',
          icon: Users2,
          badge: 'Live',
          badgeColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
        },
        {
          id: 'campus' as NavTab,
          label: 'Campus Faculty (B2B)',
          icon: Building2,
          badge: null,
        },
        {
          id: 'blueprint' as NavTab,
          label: 'Pitch & Blueprint',
          icon: Briefcase,
          badge: 'Defense',
          badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
        },
      ],
    },
    {
      group: 'PREFERENCES',
      items: [
        {
          id: 'settings' as NavTab,
          label: 'Profile & Settings',
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-[#080c15]/60 lg:min-h-[calc(100vh-65px)] border-r border-white/[0.06] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {section.group}
            </div>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            isActive
                              ? 'bg-white/20 text-white border-white/30'
                              : item.badgeColor
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Modern Motivational Quote Footer & Logout */}
      <div className="space-y-2 mt-6">
        <div className="hidden lg:block p-4 rounded-3xl bg-slate-900/40 border border-white/[0.06] text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              Turnaround Mode
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
            Small daily focus sprints compound into degree completion.
          </p>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-bold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition cursor-pointer"
            title="Log out of student account"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Log Out</span>
          </button>
        )}
      </div>
    </aside>
  );
};
