import {
  StudentProfile,
  Backlog,
  StudyPlanItem,
  QuizAttempt,
} from '../types';
import {
  initialStudentProfile,
  initialBacklogs,
} from '../data/mockData';
import { generateAdaptiveStudyPlan } from './priorityEngine';

const STORAGE_KEYS = {
  AUTH: 'backlift_auth_session',
  PROFILE: 'backlift_student_profile',
  BACKLOGS: 'backlift_student_backlogs',
  STUDY_PLAN: 'backlift_study_plan',
  QUIZ_ATTEMPTS: 'backlift_quiz_attempts',
  WEAK_TOPICS: 'backlift_weak_topics',
  TIMER_LOGS: 'backlift_timer_logs',
};

export interface AuthSession {
  isAuthenticated: boolean;
  studentName: string;
  studentEmail?: string;
  usn?: string;
  verifiedAt: string;
  method: 'roll_otp' | 'quick_verify' | 'custom_signup';
}

export const storageService = {
  getAuthSession(): AuthSession | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveAuthSession(session: AuthSession): void {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(session));
  },

  clearAuthSession(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },
  getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : initialStudentProfile;
    } catch {
      return initialStudentProfile;
    }
  },

  saveProfile(profile: StudentProfile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  getBacklogs(): Backlog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BACKLOGS);
      return data ? JSON.parse(data) : initialBacklogs;
    } catch {
      return initialBacklogs;
    }
  },

  saveBacklogs(backlogs: Backlog[]): void {
    localStorage.setItem(STORAGE_KEYS.BACKLOGS, JSON.stringify(backlogs));
  },

  getStudyPlan(backlogs: Backlog[], dailyHours: number): StudyPlanItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDY_PLAN);
      if (data) return JSON.parse(data);
      const generated = generateAdaptiveStudyPlan(backlogs, dailyHours);
      this.saveStudyPlan(generated);
      return generated;
    } catch {
      return generateAdaptiveStudyPlan(backlogs, dailyHours);
    }
  },

  saveStudyPlan(plan: StudyPlanItem[]): void {
    localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(plan));
  },

  getQuizAttempts(): QuizAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveQuizAttempt(attempt: QuizAttempt): QuizAttempt[] {
    const attempts = this.getQuizAttempts();
    attempts.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));
    return attempts;
  },

  getWeakTopics(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WEAK_TOPICS);
      return data
        ? JSON.parse(data)
        : [
            'Laplace Inverse: Convolution Theorem (MATH201)',
            'Bankers Algorithm Numerical Steps (CS302)',
            'JK Flip-Flop Excitation Tables (EC204)',
          ];
    } catch {
      return ['Laplace Inverse: Convolution Theorem (MATH201)'];
    }
  },

  addWeakTopic(topic: string): string[] {
    const current = this.getWeakTopics();
    if (!current.includes(topic)) {
      current.push(topic);
      localStorage.setItem(STORAGE_KEYS.WEAK_TOPICS, JSON.stringify(current));
    }
    return current;
  },

  removeWeakTopic(topic: string): string[] {
    const current = this.getWeakTopics().filter((t) => t !== topic);
    localStorage.setItem(STORAGE_KEYS.WEAK_TOPICS, JSON.stringify(current));
    return current;
  },

  resetAllToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.BACKLOGS);
    localStorage.removeItem(STORAGE_KEYS.STUDY_PLAN);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.WEAK_TOPICS);
    localStorage.removeItem(STORAGE_KEYS.TIMER_LOGS);
  },
};
