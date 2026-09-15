'use client';

import { useState, useRef, useEffect } from 'react';
import chatbotData from './chatbot_data.json';
import Fuse from 'fuse.js';

// ─── Fuse.js fuzzy-search setup ────────────────────────────────────────────────
const fuse = new Fuse(chatbotData.faqs, {
  keys: [
    { name: 'question', weight: 2 },
    { name: 'keywords', weight: 3 },
    { name: 'context', weight: 1 },
  ],
  threshold: 0.35,   // Max fuzziness — tighter = fewer false positives
  ignoreLocation: true,
  includeScore: true,  // Score: 0=perfect, 1=no match
});

// Confidence gate: reject results where Fuse score is too weak (too close to 1 = unrelated)
const SCORE_CUTOFF = 0.38;

// ─── Greeting keyword detector ──────────────────────────────────────────────────
const GREETING_WORDS = new Set([
  'hi','hello','hey','hola','halo','howdy','greetings',
  'good morning','good evening','good afternoon','good night',
  'yo','sup','hai','hii','hiii','start','begin','chat',
]);
function isGreeting(text) {
  const lower = text.toLowerCase().trim().replace(/[!?.]+$/, '');
  return GREETING_WORDS.has(lower);
}

// ─── Topic categories shown after greeting ──────────────────────────────────────
const TOPICS = [
  {
    emoji: '📋',
    label: 'Registration',
    ids: ['team_registration', 'entry_period', 'entry_limit', 'team_size'],
  },
  {
    emoji: '✅',
    label: 'Eligibility',
    ids: ['eligibility', 'repeat_participation', 'different_faculties'],
  },
  {
    emoji: '🏁',
    label: 'Competition Rounds',
    ids: ['round_schedule', 'round1_requirements', 'round1_advancement', 'round2_requirements', 'round2_advancement', 'round3_requirements', 'round3_location'],
  },
  {
    emoji: '🎯',
    label: 'Tracks & Topics',
    ids: ['round1_topics', 'topic_ai', 'topic_iot', 'topic_blockchain', 'topic_sustainability', 'topic_society', 'topic_emerging'],
  },
  {
    emoji: '🏆',
    label: 'Prizes & Judging',
    ids: ['prizes', 'judging_criteria', 'certificate_details'],
  },
  {
    emoji: '📝',
    label: 'Submissions',
    ids: ['proposal_requirements', 'presentation_video_rules', 'live_presentation_rules', 'prototype_requirements'],
  },
  {
    emoji: '💡',
    label: 'Tips & Advice',
    ids: ['preparation_tips', 'what_to_build', 'mentorship'],
  },
  {
    emoji: '⚠️',
    label: 'Rules & Policies',
    ids: ['conduct_rules', 'disqualification', 'intellectual_property', 'can_i_use_ai_tools', 'team_changes', 'tech_stack_restrictions'],
  },
  {
    emoji: '📬',
    label: 'Contact & Info',
    ids: ['contact_general', 'website_link', 'organizer', 'about_hackathon', 'registration_fee', 'results_announcement'],
  },
];

function getFaqById(id) {
  return chatbotData.faqs.find((f) => f.id === id);
}

// ─── Initial bot message (no question list) ─────────────────────────────────────
const INITIAL_MESSAGE = {
  role: 'bot',
  type: 'welcome',
  text: "👋 Hi there! I'm the Mini Hackathon 2026 AI Assistant.\n\nSay **Hello** to get started, or type your question directly below!",
};

// Global asset constant
const AIBOT_ICON_URL = '/images/AIBot.png';

export default function ChatBot() {
  const interFont = { fontFamily: "'Inter', sans-serif" };
  const openSansHebrewCondensed = {
    fontFamily: "'Open Sans Hebrew Condensed', 'Open Sans Condensed', sans-serif",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // ── Push a bot reply with a typing indicator delay ────────────────────────────
  function pushBotMessage(msgObj, delay = 450) {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, msgObj]);
    }, delay);
  }

  // ── Greeting response: warm text + topic cards ────────────────────────────────
  function handleGreeting() {
    pushBotMessage({
      role: 'bot',
      type: 'greeting',
      text: "Hello! 😊 Great to see you here.\n\nI can help you with everything about **Mini Hackathon 2026**. Pick a topic below or just type your question!",
    });
  }

  // ── Topic selected: show clickable questions in that category ─────────────────
  function handleTopicSelect(topic) {
    const questions = topic.ids
      .map(getFaqById)
      .filter(Boolean)
      .map((faq) => ({ label: faq.question, id: faq.id }));

    setMessages((prev) => [
      ...prev,
      { role: 'user', type: 'text', text: `${topic.emoji} ${topic.label}` },
    ]);

    pushBotMessage({
      role: 'bot',
      type: 'questions',
      category: topic.label,
      questions,
    });
  }

  // ── Question chip clicked ─────────────────────────────────────────────────────
  function handleQuestionChip(faqId, questionText) {
    setMessages((prev) => [
      ...prev,
      { role: 'user', type: 'text', text: questionText },
    ]);
    const faq = getFaqById(faqId);
    pushBotMessage({
      role: 'bot',
      type: 'text',
      text: faq ? faq.answer : chatbotData.fallback,
    });
  }

  // ── Main handler ──────────────────────────────────────────────────────────────
  function handleUserMessage(userText) {
    const trimmed = userText.trim();
    if (!trimmed) return;
    setInput('');

    setMessages((prev) => [...prev, { role: 'user', type: 'text', text: trimmed }]);

    if (isGreeting(trimmed)) {
      handleGreeting();
      return;
    }

    // Fuzzy search
    const results = fuse.search(trimmed);

    // Only accept the match if Fuse confidence is above our cutoff.
    // A score near 0 = strong match; near 1 = poor/unrelated match.
    const topResult = results[0];
    const isConfidentMatch = topResult && (topResult.score ?? 1) <= SCORE_CUTOFF;

    if (isConfidentMatch) {
      const best = topResult.item;
      if (best.id === 'greeting' || best.id === 'bot_capabilities_questions') {
        handleGreeting();
        return;
      }
      pushBotMessage({ role: 'bot', type: 'text', text: best.answer });
    } else {
      // No confident match found — topic is unrelated or not in knowledge base
      pushBotMessage({ role: 'bot', type: 'fallback', text: chatbotData.fallback });
    }
  }

  function handleSendMessage(e) {
    e.preventDefault();
    handleUserMessage(input);
  }

  // ── Render a single message bubble ───────────────────────────────────────────
  function renderMessage(msg, idx) {
    if (msg.role === 'user') {
      return (
        <div key={idx} className="flex justify-end">
          <div className="max-w-[78%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-[13px] leading-relaxed bg-[#7248D2] text-white shadow-sm">
            {msg.text}
          </div>
        </div>
      );
    }

    // Bot messages
    if (msg.type === 'welcome') {
      return (
        <div key={idx} className="flex justify-start">
          <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-sm text-[13px] leading-relaxed bg-white/25 backdrop-blur-sm border border-white/40 text-slate-800 shadow-sm">
            <p className="mb-2 font-semibold text-[14px] text-slate-900">👋 Hi there!</p>
            <p className="text-slate-700">I'm the <span className="font-semibold text-[#7248D2]">Mini Hackathon 2026</span> AI Assistant.</p>
            <p className="mt-1.5 text-slate-600 text-[12px]">Say <span className="font-medium text-slate-800">"Hello"</span> to get started, or type your question directly!</p>
            <div className="mt-3 pt-2.5 border-t border-white/40">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Get More Information</p>
              <a
                href="https://www.msclubsliit.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-[#7248D2] hover:underline"
              >
                🔗 www.msclubsliit.org
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (msg.type === 'greeting') {
      return (
        <div key={idx} className="flex flex-col gap-2 items-start">
          {/* Greeting text bubble */}
          <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-sm text-[13px] leading-relaxed bg-white/25 backdrop-blur-sm border border-white/40 text-slate-800 shadow-sm">
            <p className="font-semibold text-slate-900 mb-1">Hello! 😊 Great to see you here.</p>
            <p className="text-slate-600 text-[12px]">Pick a topic below or type your question anytime!</p>
          </div>

          {/* Topic cards grid */}
          <div className="w-full grid grid-cols-3 gap-1.5 pt-1">
            {TOPICS.map((topic) => (
              <button
                key={topic.label}
                onClick={() => handleTopicSelect(topic)}
                className="flex flex-col items-center justify-center gap-0.5 px-1 py-2.5 rounded-xl text-center transition-all duration-150 bg-white/20 hover:bg-[#7248D2]/20 border border-white/30 hover:border-[#7248D2]/40 active:scale-95 group"
              >
                <span className="text-lg leading-none">{topic.emoji}</span>
                <span className="text-[10.5px] font-medium text-slate-700 group-hover:text-[#7248D2] leading-tight">{topic.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (msg.type === 'questions') {
      return (
        <div key={idx} className="flex flex-col gap-1.5 items-start">
          <div className="max-w-[88%] px-4 py-2.5 rounded-2xl rounded-tl-sm text-[13px] bg-white/25 backdrop-blur-sm border border-white/40 text-slate-800 shadow-sm">
            <p className="font-semibold text-[12px] text-[#7248D2] mb-0.5">📂 {msg.category}</p>
            <p className="text-slate-600 text-[12px]">Tap a question to get the answer:</p>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            {msg.questions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuestionChip(q.id, q.label)}
                className="text-left px-3.5 py-2.5 rounded-xl text-[12px] text-slate-700 bg-white/20 hover:bg-[#7248D2]/10 border border-white/30 hover:border-[#7248D2]/30 transition-all duration-150 active:scale-[0.99] leading-snug"
              >
                <span className="text-[#7248D2] font-bold mr-1">›</span> {q.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Fallback bubble — unrelated / unsupported query
    if (msg.type === 'fallback') {
      return (
        <div key={idx} className="flex justify-start">
          <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-sm text-[13px] leading-relaxed bg-amber-50/60 backdrop-blur-sm border border-amber-200/60 text-slate-800 shadow-sm">
            <p className="font-semibold text-slate-800 mb-1">😔 Sorry, I couldn't find any information related to your question.</p>
            <p className="text-slate-600 text-[12px] mb-2">If you're looking for more details about Mini Hackathon 2026, please visit the official MS Club SLIIT website or ask your question there.</p>
            <a
              href="https://www.msclubsliit.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#7248D2] hover:underline"
            >
              🔗 msclubsliit.org
            </a>
          </div>
        </div>
      );
    }

    // Default text bubble
    return (
      <div key={idx} className="flex justify-start">
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm text-[13px] leading-relaxed bg-white/25 backdrop-blur-sm border border-white/40 text-slate-800 shadow-sm whitespace-pre-wrap">
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed z-50 bottom-6 right-6 text-slate-900" style={interFont}>
      <style>{`
        @keyframes custom3DSpinY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .bot-perfect-3d-spin {
          animation: custom3DSpinY 4s linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes typing-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .typing-dot {
          animation: typing-bounce 1.2s infinite ease-in-out;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`absolute bottom-0 right-0 z-50 flex items-center justify-center w-16 h-16 transition-all duration-300 bg-transparent rounded-full hover:scale-110 active:scale-95 drop-shadow-xl ${
          isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 pointer-events-auto scale-100'
        }`}
        aria-label="Open AI Assistant"
      >
        <img src={AIBOT_ICON_URL} alt="AI Assistant" className="object-contain w-16 h-16 bot-perfect-3d-spin" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 md:relative md:inset-auto w-full h-[100dvh] md:w-[400px] md:h-[680px] md:max-h-[88vh] rounded-none md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border-none md:border md:border-white/50 bg-white/10 backdrop-blur-md z-40 animate-in fade-in zoom-in-95 duration-200">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white/10 backdrop-blur-sm" style={openSansHebrewCondensed}>
            <div className="flex items-end font-bold leading-none tracking-tighter text-black select-none">
              <div className="flex flex-col items-start">
                <span className="text-[13px] -mb-1">mini</span>
                <span className="text-[20px]">Hackathon</span>
              </div>
              <span className="bg-[#7248D2] text-white text-[20px] px-1 ml-0.5 rounded-sm shadow-sm">26</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-8 h-8 font-bold text-gray-700 transition-all border rounded-full shadow-sm bg-white/20 hover:bg-white/40 hover:text-black backdrop-blur-sm border-white/30"
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 px-4 py-4 space-y-3 overflow-y-auto"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}
          >
            {messages.map((msg, idx) => renderMessage(msg, idx))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-white/25 backdrop-blur-sm border border-white/40 shadow-sm">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-500 inline-block"></span>
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-500 inline-block"></span>
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-500 inline-block"></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSendMessage}
            className="flex gap-2 px-4 py-3 border-t border-white/20 bg-white/10 backdrop-blur-sm"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2.5 text-[13px] bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#7248D2]/40 text-slate-800 transition-all placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-2.5 font-semibold text-[13px] text-white transition-all bg-[#7248D2] hover:opacity-90 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}