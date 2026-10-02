import {
  StudentProfile,
  Backlog,
  PastPaper,
  StudyResource,
  QuizQuestion,
  StudyBuddyGroup,
  CampusBatchMetric,
} from '../types';
import { calculateBacklogPriority } from '../services/priorityEngine';

export const initialStudentProfile: StudentProfile = {
  name: 'Student',
  college: 'Engineering Institution',
  degree: 'B.Tech in Computer Science & Engineering',
  semester: 7,
  dailyStudyHours: 4.0,
  preferredStudyTime: 'evening',
  streakDays: 6,
  lastStudyDate: new Date().toISOString().split('T')[0],
  totalHoursStudied: 38.5,
  isProUser: true,
};

const rawBacklogs = [
  {
    id: 'backlog-1',
    subjectName: 'Engineering Mathematics-II',
    subjectCode: 'MATH201',
    semester: 2,
    credits: 4,
    attemptCount: 2,
    targetExamDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 14 days away
    difficulty: 5,
    prepPercentage: 35,
    colorTag: '#6366F1', // Indigo
    topics: [
      {
        id: 'top-1-1',
        title: 'Fourier Series & Harmonic Analysis',
        unitNumber: 1,
        historicalFrequency: 92,
        isCompleted: true,
      },
      {
        id: 'top-1-2',
        title: 'Laplace Transforms & Inverse Transforms',
        unitNumber: 2,
        historicalFrequency: 88,
        isCompleted: false,
      },
      {
        id: 'top-1-3',
        title: 'Second-Order Linear Differential Equations',
        unitNumber: 3,
        historicalFrequency: 85,
        isCompleted: false,
      },
      {
        id: 'top-1-4',
        title: 'Vector Calculus: Divergence & Stokes Theorem',
        unitNumber: 4,
        historicalFrequency: 78,
        isCompleted: false,
      },
      {
        id: 'top-1-5',
        title: 'Complex Variables & Cauchy-Riemann Equations',
        unitNumber: 5,
        historicalFrequency: 65,
        isCompleted: false,
      },
    ],
  },
  {
    id: 'backlog-2',
    subjectName: 'Operating Systems & System Architecture',
    subjectCode: 'CS302',
    semester: 4,
    credits: 3,
    attemptCount: 1,
    targetExamDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 28 days away
    difficulty: 4,
    prepPercentage: 60,
    colorTag: '#0EA5E9', // Sky Blue
    topics: [
      {
        id: 'top-2-1',
        title: 'Process Synchronization & Semaphores',
        unitNumber: 1,
        historicalFrequency: 94,
        isCompleted: true,
      },
      {
        id: 'top-2-2',
        title: 'Deadlock Detection & Bankers Algorithm',
        unitNumber: 2,
        historicalFrequency: 90,
        isCompleted: true,
      },
      {
        id: 'top-2-3',
        title: 'Virtual Memory & Page Replacement Policies',
        unitNumber: 3,
        historicalFrequency: 82,
        isCompleted: false,
      },
      {
        id: 'top-2-4',
        title: 'Disk Scheduling Algorithms (SCAN/C-LOOK)',
        unitNumber: 4,
        historicalFrequency: 75,
        isCompleted: false,
      },
      {
        id: 'top-2-5',
        title: 'File System Implementation & Inode Allocation',
        unitNumber: 5,
        historicalFrequency: 60,
        isCompleted: false,
      },
    ],
  },
  {
    id: 'backlog-3',
    subjectName: 'Analog & Digital Electronics',
    subjectCode: 'EC204',
    semester: 3,
    credits: 4,
    attemptCount: 1,
    targetExamDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 45 days away
    difficulty: 4,
    prepPercentage: 20,
    colorTag: '#F59E0B', // Amber
    topics: [
      {
        id: 'top-3-1',
        title: 'Operational Amplifiers & Inverting Configurations',
        unitNumber: 1,
        historicalFrequency: 91,
        isCompleted: false,
      },
      {
        id: 'top-3-2',
        title: 'Karnaugh Maps (K-Maps) & Quine-McCluskey',
        unitNumber: 2,
        historicalFrequency: 89,
        isCompleted: true,
      },
      {
        id: 'top-3-3',
        title: 'Synchronous Counters & JK Flip-Flops',
        unitNumber: 3,
        historicalFrequency: 80,
        isCompleted: false,
      },
      {
        id: 'top-3-4',
        title: '555 Timer Astable Multivibrator Circuits',
        unitNumber: 4,
        historicalFrequency: 72,
        isCompleted: false,
      },
      {
        id: 'top-3-5',
        title: 'A/D and D/A Converters: R-2R Ladder Network',
        unitNumber: 5,
        historicalFrequency: 64,
        isCompleted: false,
      },
    ],
  },
];

export const initialBacklogs: Backlog[] = rawBacklogs.map((b) => {
  const { score, status } = calculateBacklogPriority(b);
  return {
    ...b,
    priorityScore: score,
    status,
  };
});

export const pastPapersData: PastPaper[] = [
  {
    id: 'paper-math201-2024',
    subjectCode: 'MATH201',
    subjectName: 'Engineering Mathematics-II',
    sessionYear: 'Summer 2024 (University End-Sem)',
    totalMarks: 100,
    durationHours: 3,
    keyTopics: [
      {
        topic: 'Fourier Series Expansion of Periodic Functions',
        unit: 1,
        frequencyScore: 95,
        recurrenceCount: 5,
        averageMarks: 14,
        priorityCategory: 'high-yield',
      },
      {
        topic: 'Inverse Laplace Transform by Convolution Theorem',
        unit: 2,
        frequencyScore: 90,
        recurrenceCount: 5,
        averageMarks: 14,
        priorityCategory: 'high-yield',
      },
      {
        topic: 'Cauchy-Euler Differential Equations',
        unit: 3,
        frequencyScore: 82,
        recurrenceCount: 4,
        averageMarks: 10,
        priorityCategory: 'high-yield',
      },
      {
        topic: 'Gauss Divergence Theorem Proof & Verification',
        unit: 4,
        frequencyScore: 78,
        recurrenceCount: 4,
        averageMarks: 12,
        priorityCategory: 'moderate',
      },
      {
        topic: 'Harmonic Conjugates & Milne-Thomson Method',
        unit: 5,
        frequencyScore: 65,
        recurrenceCount: 3,
        averageMarks: 8,
        priorityCategory: 'moderate',
      },
    ],
    sampleQuestions: [
      'Obtain Fourier series for f(x) = x^2 in the interval (-pi, pi) and hence deduce that sum(1/n^2) = pi^2/6. (14 Marks)',
      'Find the inverse Laplace transform of s / ((s^2 + 1)(s^2 + 4)) using the convolution theorem. (14 Marks)',
      'Verify Stokes theorem for F = (2x - y)i - yz^2 j - y^2 z k over the upper half of sphere x^2+y^2+z^2 = 1. (12 Marks)',
    ],
  },
  {
    id: 'paper-cs302-2024',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems & System Architecture',
    sessionYear: 'Winter 2024 (Regular & Supplementary)',
    totalMarks: 100,
    durationHours: 3,
    keyTopics: [
      {
        topic: 'Producer-Consumer Problem using Semaphores',
        unit: 1,
        frequencyScore: 96,
        recurrenceCount: 5,
        averageMarks: 14,
        priorityCategory: 'high-yield',
      },
      {
        topic: 'Bankers Algorithm for Deadlock Avoidance',
        unit: 2,
        frequencyScore: 92,
        recurrenceCount: 5,
        averageMarks: 12,
        priorityCategory: 'high-yield',
      },
      {
        topic: 'Page Replacement: LRU vs Optimal vs FIFO Anomalies',
        unit: 3,
        frequencyScore: 88,
        recurrenceCount: 4,
        averageMarks: 12,
        priorityCategory: 'high-yield',
      },
      {
        topic: 'Disk Arm Scheduling: SCAN, C-LOOK and SSTF',
        unit: 4,
        frequencyScore: 74,
        recurrenceCount: 3,
        averageMarks: 10,
        priorityCategory: 'moderate',
      },
    ],
    sampleQuestions: [
      'Write the complete algorithmic solution for the Dining Philosophers Problem avoiding deadlock using condition variables. (14 Marks)',
      'Given 5 processes and 3 resource types (A, B, C), apply Bankers Algorithm to find if system is in a safe state. (12 Marks)',
      'Consider the page reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3. Calculate page faults for 3 frames using LRU and Optimal. (12 Marks)',
    ],
  },
];

export const sampleResources: StudyResource[] = [
  {
    id: 'res-1',
    subjectCode: 'MATH201',
    subjectName: 'Engineering Mathematics-II',
    title: 'Topper Handwritten Notes: Fourier & Laplace Master Formula Sheet',
    type: 'notes',
    url: 'https://example.com/maths2-topper-notes.pdf',
    author: 'Ananya Verma (Rank 2, Batch 2023)',
    meta: '24 Pages PDF • Verified High-Yield',
    topicTag: 'Fourier & Laplace',
    rating: 4.9,
    isVerifiedTopper: true,
  },
  {
    id: 'res-2',
    subjectCode: 'MATH201',
    subjectName: 'Engineering Mathematics-II',
    title: 'Convolution Theorem & Inverse Laplace Explained in 18 Minutes',
    type: 'video',
    url: 'https://youtube.com/watch?v=demo-math-laplace',
    author: 'Prof. Gajendra Purohit Channel',
    meta: '18 mins Video • 1.2M Views',
    topicTag: 'Laplace Transforms',
    rating: 4.8,
    isVerifiedTopper: false,
  },
  {
    id: 'res-3',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems',
    title: 'Bankers Algorithm & Safe State Calculation: Step-by-Step Numerical',
    type: 'notes',
    url: 'https://example.com/os-bankers-cheat-sheet.pdf',
    author: 'GateSmashers Quick Notes',
    meta: '12 Pages PDF • Solved Numericals',
    topicTag: 'Deadlock Avoidance',
    rating: 4.9,
    isVerifiedTopper: true,
  },
  {
    id: 'res-4',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems',
    title: 'Process Synchronization: Classical IPC Problems Animated',
    type: 'video',
    url: 'https://youtube.com/watch?v=demo-os-sync',
    author: 'Neso Academy CS Playlist',
    meta: '25 mins Video • Concept + Code',
    topicTag: 'Process Synchronization',
    rating: 4.7,
    isVerifiedTopper: false,
  },
  {
    id: 'res-5',
    subjectCode: 'EC204',
    subjectName: 'Analog & Digital Electronics',
    title: 'K-Map Minimization Rules & 555 Timer Formula Reference Sheet',
    type: 'formula',
    url: 'https://example.com/ec204-cheat-sheet.pdf',
    author: 'Dept Academic Peer Tutor Cell',
    meta: '6 Pages Condensed Summary',
    topicTag: 'K-Maps & Timers',
    rating: 4.6,
    isVerifiedTopper: true,
  },
];

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-math-1',
    subjectCode: 'MATH201',
    topic: 'Fourier Series',
    question: 'If a function f(x) is an even function in (-pi, pi), what can be said about its Fourier coefficients bn?',
    options: [
      'bn = 0 for all n >= 1',
      'an = 0 for all n >= 1',
      'a0 = 0 and bn is non-zero',
      'Both an and bn are zero',
    ],
    correctIndex: 0,
    explanation: 'For an even function f(-x) = f(x), the sine terms drop out because the integrand f(x)*sin(nx) is odd, hence bn = 0 for all n.',
    difficulty: 'easy',
  },
  {
    id: 'q-math-2',
    subjectCode: 'MATH201',
    topic: 'Laplace Transforms',
    question: 'What is the Laplace Transform of the unit step function u(t - a) for a > 0?',
    options: [
      '1 / (s - a)',
      'e^(-as) / s',
      'e^(as) / s',
      '1 / s^2',
    ],
    correctIndex: 1,
    explanation: 'By the second shifting property of Laplace transforms, L{u(t - a)} = e^(-as) / s for s > 0.',
    difficulty: 'medium',
  },
  {
    id: 'q-os-1',
    subjectCode: 'CS302',
    topic: 'Deadlocks',
    question: 'Which of the following conditions is NOT one of Coffmans four necessary conditions for a deadlock?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemptive Resource Allocation',
      'Circular Wait',
    ],
    correctIndex: 2,
    explanation: 'The condition is NO PREEMPTION. If resources can be preempted, deadlock cannot occur.',
    difficulty: 'easy',
  },
  {
    id: 'q-os-2',
    subjectCode: 'CS302',
    topic: 'Memory Management',
    question: 'Beladys Anomaly refers to the phenomenon where:',
    options: [
      'Page faults decrease when more frames are allocated (FIFO)',
      'Page faults increase when more frames are allocated under FIFO',
      'LRU performs worse than Random replacement',
      'Thrashing occurs due to insufficient disk swap space',
    ],
    correctIndex: 1,
    explanation: 'Beladys anomaly occurs specifically in FIFO page replacement, where allocating more page frames leads to more page faults for certain reference strings.',
    difficulty: 'medium',
  },
  {
    id: 'q-ec-1',
    subjectCode: 'EC204',
    topic: 'Operational Amplifiers',
    question: 'In an ideal operational amplifier, what are the input impedance and output impedance respectively?',
    options: [
      'Zero input impedance, Infinite output impedance',
      'Infinite input impedance, Zero output impedance',
      'Infinite input impedance, Infinite output impedance',
      '50 Ohms input, 50 Ohms output',
    ],
    correctIndex: 1,
    explanation: 'An ideal op-amp draws zero input bias current (infinite input impedance) and can drive any load without internal drop (zero output impedance).',
    difficulty: 'easy',
  },
];

export const sampleStudyBuddyGroups: StudyBuddyGroup[] = [
  {
    id: 'group-1',
    name: 'Maths-II Repeat Slayers 2026',
    subjectCode: 'MATH201',
    subjectName: 'Engineering Mathematics-II',
    memberCount: 42,
    activeOnline: 9,
    targetExamDate: '14 Days Left',
    dailySprintGoal: 'Solve 2 Convolution Theorem questions together at 8 PM',
    recentMessage: 'Priya: Just uploaded Unit 3 solved past paper PDF!',
    avatarSeed: 'math',
  },
  {
    id: 'group-2',
    name: 'OS & Architecture Recovery Lounge',
    subjectCode: 'CS302',
    subjectName: 'Operating Systems',
    memberCount: 28,
    activeOnline: 6,
    targetExamDate: '28 Days Left',
    dailySprintGoal: 'Complete 30 mins Pomodoro on Bankers Algorithm',
    recentMessage: 'Karan: Does anyone have notes for SCAN vs C-LOOK?',
    avatarSeed: 'code',
  },
  {
    id: 'group-3',
    name: 'Analog Electronics Revision Sprint',
    subjectCode: 'EC204',
    subjectName: 'Analog & Digital Electronics',
    memberCount: 19,
    activeOnline: 4,
    targetExamDate: '45 Days Left',
    dailySprintGoal: 'Practice K-Map grouping for 4-variable functions',
    recentMessage: 'Arjun: Starting a 45m focus session now, join room!',
    avatarSeed: 'circuit',
  },
];

export const sampleCampusMetrics: CampusBatchMetric[] = [
  {
    department: 'Computer Science & Engineering',
    totalStudents: 180,
    studentsWithBacklogs: 34,
    averageRecoveryScore: 64,
    bottleneckSubjects: [
      { name: 'Engineering Mathematics-II', code: 'MATH201', failureRate: 28.5, enrolledBacklogs: 24 },
      { name: 'Operating Systems', code: 'CS302', failureRate: 18.2, enrolledBacklogs: 16 },
      { name: 'Theory of Computation', code: 'CS401', failureRate: 22.0, enrolledBacklogs: 18 },
    ],
  },
  {
    department: 'Electronics & Communication',
    totalStudents: 140,
    studentsWithBacklogs: 41,
    averageRecoveryScore: 58,
    bottleneckSubjects: [
      { name: 'Analog & Digital Electronics', code: 'EC204', failureRate: 31.4, enrolledBacklogs: 26 },
      { name: 'Signals & Systems', code: 'EC303', failureRate: 29.0, enrolledBacklogs: 22 },
      { name: 'Electromagnetic Field Theory', code: 'EC301', failureRate: 24.5, enrolledBacklogs: 19 },
    ],
  },
  {
    department: 'Mechanical Engineering',
    totalStudents: 120,
    studentsWithBacklogs: 38,
    averageRecoveryScore: 61,
    bottleneckSubjects: [
      { name: 'Engineering Mechanics', code: 'ME101', failureRate: 33.0, enrolledBacklogs: 28 },
      { name: 'Thermodynamics-I', code: 'ME202', failureRate: 26.5, enrolledBacklogs: 20 },
      { name: 'Strength of Materials', code: 'ME204', failureRate: 27.2, enrolledBacklogs: 21 },
    ],
  },
];
