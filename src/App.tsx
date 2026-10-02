import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { StudentDashboard } from './components/Dashboard/StudentDashboard';
import { BacklogManager } from './components/Backlogs/BacklogManager';
import { StudyPlanner } from './components/Planner/StudyPlanner';
import { AIChatbot } from './components/Chatbot/AIChatbot';
import { PaperAnalyzer } from './components/Analyzer/PaperAnalyzer';
import { ResourceHub } from './components/Resources/ResourceHub';
import { QuizGenerator } from './components/Quizzes/QuizGenerator';
import { FocusTimer } from './components/Timer/FocusTimer';
import { StudyBuddy } from './components/Buddy/StudyBuddy';
import { CollegeDashboard } from './components/Institutional/CollegeDashboard';
import { StartupBlueprint } from './components/Documentation/StartupBlueprint';
import { OnboardingModal } from './components/OnboardingModal';
import { RecoveryReportModal } from './components/Modals/RecoveryReportModal';
import { LandingPage } from './components/Landing/LandingPage';
import { AuthModal } from './components/Auth/AuthModal';
import { ProfileSettings } from './components/Settings/ProfileSettings';
import { VerificationGate } from './components/Auth/VerificationGate';

import { StudentProfile, Backlog, StudyPlanItem, QuizAttempt } from './types';
import { storageService } from './services/storageService';
import { calculateAcademicRecoveryScore, rebalanceMissedDayPlan } from './services/priorityEngine';
import { initialStudentProfile, initialBacklogs } from './data/mockData';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const session = storageService.getAuthSession();
    return session ? session.isAuthenticated : false;
  });

  const [student, setStudent] = useState<StudentProfile>(() => storageService.getProfile());
  const [backlogs, setBacklogs] = useState<Backlog[]>(() => storageService.getBacklogs());
  const [plan, setPlan] = useState<StudyPlanItem[]>(() =>
    storageService.getStudyPlan(storageService.getBacklogs(), storageService.getProfile().dailyStudyHours)
  );
  const [weakTopics, setWeakTopics] = useState<string[]>(() => storageService.getWeakTopics());
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => storageService.getQuizAttempts());

  const [activeTab, setActiveTab] = useState<NavTab>('landing');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Sync state to storage
  useEffect(() => {
    storageService.saveProfile(student);
  }, [student]);

  useEffect(() => {
    storageService.saveBacklogs(backlogs);
  }, [backlogs]);

  useEffect(() => {
    storageService.saveStudyPlan(plan);
  }, [plan]);

  // Dynamic recovery score calculation
  const { overallScore, gradeBadge, factors, statusMessage } = calculateAcademicRecoveryScore(
    backlogs,
    student.streakDays,
    quizAttempts
  );

  // Handlers
  const handleUpdateBacklogs = (updated: Backlog[]) => {
    setBacklogs(updated);
  };

  const handleUpdatePlan = (newPlan: StudyPlanItem[]) => {
    setPlan(newPlan);
  };

  const handleTogglePlanItem = (itemId: string) => {
    const updated = plan.map((item) =>
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setPlan(updated);
  };

  const handleTriggerMissedDay = () => {
    const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const { updatedPlan, rescheduledCount } = rebalanceMissedDayPlan(plan, yesterdayStr);
    if (rescheduledCount > 0) {
      setPlan(updatedPlan);
      alert(`Missed-Day Recovery: Rebalanced ${rescheduledCount} missed tasks across upcoming days.`);
    } else {
      // Rebalance any unfinished tasks before today
      const todayStr = new Date().toISOString().split('T')[0];
      const { updatedPlan: fallbackPlan, rescheduledCount: fallbackCount } = rebalanceMissedDayPlan(plan, todayStr);
      if (fallbackCount > 0) {
        setPlan(fallbackPlan);
        alert(`Missed-Day Recovery: Rebalanced ${fallbackCount} tasks across upcoming sprint days.`);
      } else {
        alert("Your study schedule is currently on track! No unstudied past tasks were detected.");
      }
    }
  };

  const handleSaveQuizAttempt = (attempt: QuizAttempt) => {
    const updated = storageService.saveQuizAttempt(attempt);
    setQuizAttempts(updated);
  };

  const handleAddWeakTopic = (topic: string) => {
    const updated = storageService.addWeakTopic(topic);
    setWeakTopics(updated);
  };

  const handleLogStudyMinutes = (minutes: number, subjectCode: string) => {
    const addedHours = Number((minutes / 60).toFixed(1));
    setStudent((prev) => ({
      ...prev,
      totalHoursStudied: Number((prev.totalHoursStudied + addedHours).toFixed(1)),
    }));
  };

  const handleResetData = () => {
    if (window.confirm("Reset all prototype data to the default academic recovery scenario?")) {
      storageService.resetAllToDefault();
      setStudent(initialStudentProfile);
      setBacklogs(initialBacklogs);
      const defaultPlan = storageService.getStudyPlan(initialBacklogs, initialStudentProfile.dailyStudyHours);
      setPlan(defaultPlan);
      setWeakTopics(storageService.getWeakTopics());
      setQuizAttempts([]);
    }
  };

  const handleSaveOnboardedProfile = (newProfile: StudentProfile, newBacklogs: Backlog[]) => {
    setStudent(newProfile);
    setBacklogs(newBacklogs);
    const refreshedPlan = storageService.getStudyPlan(newBacklogs, newProfile.dailyStudyHours);
    setPlan(refreshedPlan);
  };

  const handleVerificationSuccess = (
    profile: Partial<StudentProfile>,
    sessionInfo: {
      studentName: string;
      studentEmail?: string;
      usn?: string;
      method: 'roll_otp' | 'quick_verify' | 'custom_signup';
    }
  ) => {
    storageService.saveAuthSession({
      isAuthenticated: true,
      studentName: sessionInfo.studentName,
      studentEmail: sessionInfo.studentEmail,
      usn: sessionInfo.usn,
      verifiedAt: new Date().toISOString(),
      method: sessionInfo.method,
    });
    setStudent((prev) => ({
      ...prev,
      ...profile,
    }));
    setIsAuthenticated(true);
    setActiveTab('landing');
  };

  const handleLogout = () => {
    storageService.clearAuthSession();
    setIsAuthenticated(false);
    setActiveTab('landing');
  };

  // If unauthenticated, gate all tools behind the Student Verification Gate
  if (!isAuthenticated) {
    return (
      <VerificationGate
        onVerificationSuccess={handleVerificationSuccess}
      />
    );
  }

  // Critical backlog count
  const criticalCount = backlogs.filter((b) => b.status === 'critical').length;

  // Filter today's plan items
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysPlan = plan.filter((p) => p.date === todayStr).length > 0
    ? plan.filter((p) => p.date === todayStr)
    : plan.slice(0, 3); // Fallback to first sprint day if dates shifted

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        student={student}
        recoveryScore={overallScore}
        recoveryFactors={factors}
        gradeBadge={gradeBadge}
        activeTab={activeTab}
        onNavigateTab={setActiveTab}
        onOpenReportModal={() => setShowReportModal(true)}
        onResetData={handleResetData}
        onOpenOnboarding={() => setShowOnboarding(true)}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          backlogCount={backlogs.length}
          criticalCount={criticalCount}
          onLogout={handleLogout}
        />

        {/* Dynamic Main Workspace Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {activeTab === 'landing' && (
            <LandingPage
              student={student}
              backlogs={backlogs}
              onLaunchApp={() => setActiveTab('dashboard')}
              onOpenLogin={() => setShowAuthModal(true)}
            />
          )}

          {activeTab === 'dashboard' && (
            <StudentDashboard
              student={student}
              backlogs={backlogs}
              recoveryScore={overallScore}
              gradeBadge={gradeBadge}
              factors={factors}
              todaysPlan={todaysPlan}
              weakTopics={weakTopics}
              onNavigateTab={setActiveTab}
              onTogglePlanItem={handleTogglePlanItem}
              onTriggerMissedDay={handleTriggerMissedDay}
            />
          )}

          {activeTab === 'backlogs' && (
            <BacklogManager
              backlogs={backlogs}
              onUpdateBacklogs={handleUpdateBacklogs}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'planner' && (
            <StudyPlanner
              plan={plan}
              backlogs={backlogs}
              student={student}
              onUpdatePlan={handleUpdatePlan}
              onToggleItem={handleTogglePlanItem}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'chatbot' && (
            <AIChatbot
              student={student}
              backlogs={backlogs}
              weakTopics={weakTopics}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'analyzer' && (
            <PaperAnalyzer onNavigateTab={setActiveTab} />
          )}

          {activeTab === 'resources' && (
            <ResourceHub
              backlogs={backlogs}
              weakTopics={weakTopics}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'quizzes' && (
            <QuizGenerator
              backlogs={backlogs}
              weakTopics={weakTopics}
              onSaveAttempt={handleSaveQuizAttempt}
              onAddWeakTopic={handleAddWeakTopic}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'timer' && (
            <FocusTimer
              student={student}
              backlogs={backlogs}
              onLogStudyMinutes={handleLogStudyMinutes}
            />
          )}

          {activeTab === 'buddy' && (
            <StudyBuddy
              backlogs={backlogs}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'campus' && (
            <CollegeDashboard />
          )}

          {activeTab === 'blueprint' && (
            <StartupBlueprint />
          )}

          {activeTab === 'settings' && (
            <ProfileSettings
              student={student}
              backlogs={backlogs}
              onUpdateProfile={(updated) => setStudent(updated)}
              onOpenReportModal={() => setShowReportModal(true)}
              onResetData={handleResetData}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>

      {/* Student Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(newProfile) => {
          if (newProfile) {
            setStudent((prev) => ({ ...prev, ...newProfile }));
            storageService.saveAuthSession({
              isAuthenticated: true,
              studentName: newProfile.name || student.name,
              studentEmail: `${(newProfile.name || student.name).toLowerCase().replace(/\s+/g, '.')}@college.edu`,
              verifiedAt: new Date().toISOString(),
              method: 'quick_verify',
            });
          }
          setIsAuthenticated(true);
          setActiveTab('dashboard');
        }}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onSaveProfile={handleSaveOnboardedProfile}
        initialProfile={student}
        initialBacklogsList={backlogs}
      />

      {/* Academic Recovery Progress Report Modal */}
      <RecoveryReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        student={student}
        backlogs={backlogs}
        recoveryScore={overallScore}
        gradeBadge={gradeBadge}
        factors={factors}
      />
    </div>
  );
}

export default App;
