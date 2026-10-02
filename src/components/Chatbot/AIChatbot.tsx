import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  RotateCcw,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { ChatMessage, StudentProfile, Backlog } from '../../types';
import { generateAIChatResponse } from '../../services/aiEngine';

interface AIChatbotProps {
  student: StudentProfile;
  backlogs: Backlog[];
  weakTopics: string[];
  onNavigateTab: (tab: any) => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  student,
  backlogs,
  weakTopics,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: `Hello ${student.name.split(' ')[0]}! I am **LiftBot**, your dedicated AI Academic Recovery Coach.

I have loaded your profile with **${backlogs.length} active backlogs** and an **Academic Recovery Score of 68/100**.

Click any official assignment evaluation question below or ask me anything about exam strategy, simplifying complex proofs, or creating custom study timetables:`,
      timestamp: 'Just now',
      suggestions: [
        'What are the most repeatedly asked questions in Engineering Mathematics-II over the last 5 years?',
        'I have 4 hours daily and 2 backlogs (Operating Systems + Data Structures). How should I divide my time?',
        'Explain Laplace Transforms using an analogy a 2nd-year student would understand.',
        'I missed studying yesterday. How do I recover without falling behind on my current semester?',
        'Give me a quick 3-question diagnostic quiz on Process Synchronization.',
        'Which subject should I study first?',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'notes'>('chat');
  const [notesText, setNotesText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let contextQuery = query;
      if (activeMode === 'notes' && notesText.trim()) {
        contextQuery = `${query} (Context Notes: ${notesText.slice(0, 300)})`;
      }

      const aiResult = generateAIChatResponse(contextQuery, {
        student,
        backlogs,
        weakTopics,
      });

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: aiResult.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: aiResult.suggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-reset',
        sender: 'bot',
        text: `Chat session reset. What academic turnaround question can I help you with?`,
        timestamp: 'Just now',
        suggestions: [
          'Which subject should I study first?',
          'Explain Semaphores simply',
          'Give me important topics',
        ],
      },
    ]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            AI Academic Recovery Coach (LiftBot)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Personalized guidance grounded in your exam dates, credit weightage, and topic weaknesses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="p-1 rounded-2xl glass-panel flex items-center gap-1">
            <button
              onClick={() => setActiveMode('chat')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMode === 'chat'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Academic Chat
            </button>
            <button
              onClick={() => setActiveMode('notes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeMode === 'notes'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ask My Notes</span>
            </button>
          </div>

          <button
            onClick={handleClearHistory}
            className="p-2.5 rounded-2xl glass-panel text-slate-400 hover:text-white transition cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ask From My Notes Workspace */}
      {activeMode === 'notes' && (
        <div className="p-5 rounded-3xl bg-purple-950/20 border border-purple-500/25 space-y-2.5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-purple-400" />
              "Ask From My Notes" Context Workspace
            </span>
            <span className="text-[10px] text-slate-400">
              Paste teacher slides, PDF excerpts, or handwritten transcripts
            </span>
          </div>
          <textarea
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder="Paste raw notes or textbook paragraphs here. LiftBot will answer questions specifically grounded in these notes."
            rows={3}
            className="w-full bg-slate-900/80 border border-purple-500/20 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-400"
          />
        </div>
      )}

      {/* Chat Messages Container */}
      <div className="h-[500px] glass-panel rounded-3xl p-6 sm:p-8 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3.5 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-white ${
                msg.sender === 'bot'
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-700'
              }`}
            >
              {msg.sender === 'bot' ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
            </div>

            {/* Bubble */}
            <div className="space-y-2.5">
              <div
                className={`p-5 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20'
                    : 'bg-slate-800/60 border border-white/[0.06] text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {/* Suggestions */}
              {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.suggestions.map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800/60 transition-all hover:scale-102 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className={`text-[10px] text-slate-500 px-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-indigo-300 animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <span>LiftBot is analyzing your syllabus and preparing guidance...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 glass-panel rounded-2xl p-2.5 focus-within:border-indigo-500 transition shadow-xl"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              activeMode === 'notes'
                ? "Ask a question from your pasted notes above..."
                : "Ask LiftBot your concept or revision question..."
            }
            className="flex-1 bg-transparent px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Preset Prompt Pills */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-bold text-indigo-400 shrink-0 text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Evaluation Queries:
            </span>
            {[
              {
                label: 'Q1: Repeated Math-II Topics',
                query: 'What are the most repeatedly asked questions in Engineering Mathematics-II over the last 5 years?',
              },
              {
                label: 'Q2: Split 4 Study Hours',
                query: 'I have 4 hours daily and 2 backlogs (Operating Systems + Data Structures). How should I divide my time?',
              },
              {
                label: 'Q3: Laplace Analogy',
                query: 'Explain Laplace Transforms using an analogy a 2nd-year student would understand.',
              },
              {
                label: 'Q4: Missed-Day Recovery',
                query: 'I missed studying yesterday. How do I recover without falling behind on my current semester?',
              },
              {
                label: 'Q5: Diagnostic Quiz',
                query: 'Give me a quick 3-question diagnostic quiz on Process Synchronization.',
              },
            ].map((item, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => handleSendMessage(item.query)}
                className="px-3 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-200 text-xs font-semibold whitespace-nowrap transition cursor-pointer hover:text-white hover:border-indigo-400"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
            <span className="font-bold text-slate-500 shrink-0 text-[11px]">General Turnaround:</span>
            {[
              'Which subject should I study first?',
              'How should I prepare for my 3 backlogs?',
              'Explain Fourier Series simply',
              'I have 15 days before my exam. What should I do?',
            ].map((prompt, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1 rounded-full glass-panel hover:border-indigo-500/30 text-slate-300 text-[11px] whitespace-nowrap transition cursor-pointer hover:text-white"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
