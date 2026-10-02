# 🎓 BackLift AI — Academic Recovery & Study Management Platform

> **Working Prototype for Internship Project Submission**
> 
> 🌐 **Live Prototype Demonstration**: [https://shambhavisharma2608-dot.github.io/backlift_ai/](https://shambhavisharma2608-dot.github.io/backlift_ai/)
> 
> 📂 **GitHub Repository**: [https://github.com/shambhavisharma2608-dot/backlift_ai](https://github.com/shambhavisharma2608-dot/backlift_ai)

---

## 📌 Problem Statement
Many university and college students face academic backlogs, failed exams, and dense study workloads. This often leads to:
1. **Panic and Confusion**: Students don't know which subject to prioritize first (credits vs. exam date vs. difficulty).
2. **Lack of a Realistic Plan**: Traditional timetables fail because missing one day causes the entire schedule to collapse.
3. **No Central Recovery Hub**: Study materials, past paper trends, focus timers, and syllabus trackers are scattered everywhere.

---

## 💡 Solution & What BackLift AI Does
**BackLift AI** is a smart academic recovery system that turns overwhelming exam backlogs into structured, manageable daily micro-tasks.

### Key Features in this Prototype:
- 📊 **Smart Dashboard**: Displays an Academic Recovery Score (0–100) and exam countdowns.
- 🎯 **Priority Engine**: Automatically ranks subjects by credit weight, days remaining, and difficulty so students always know what to study first.
- 📅 **Adaptive Study Planner**: Creates a 7-day schedule with a "Missed-Day Recovery" button to rebalance tasks without stress.
- 🤖 **AI LiftBot (Academic Coach)**: An on-demand tutor to simplify difficult concepts and guide revision.
- ⏱️ **Focus Timer**: Built-in 25-minute Pomodoro timer tagged to specific subjects.
- 📑 **Exam Paper Analyzer**: Highlights repeated questions and high-weightage topics from past papers.
- 📄 **1-Click Progress Report**: Generates an exportable/printable academic turnaround report.

---

## 🚀 How to Run the Project Locally (3 Easy Steps)

### Step 1: Open Terminal in the Project Folder
Make sure you are in the project folder:
```bash
cd backlift-ai
```

### Step 2: Install Dependencies
Run this command once to install required packages:
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Open your browser and visit:
👉 **http://localhost:5173/**

*Note: All data (backlog list, quiz results, timer history) is saved automatically in your browser's local storage. No external database or server setup is required!*

---

## 🛠️ Technology Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS
- **Icons & Visuals**: Lucide React & Canvas Confetti
- **Storage**: Browser LocalStorage (Zero backend configuration needed)

---

## 📦 How to Build for Production
To create an optimized production build:
```bash
npm run build
```
The output files will be in the `dist/` directory, ready to deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 👨‍💻 Submission Details
- **Project Type**: Internship Working Prototype
- **Domain**: EdTech / AI-Assisted Learning / Productivity Management
