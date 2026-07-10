'use client';

import { useState, useRef, useEffect } from 'react';
import chatbotData from './chatbot_data.json';

const AIBOT_ICON_URL = '/images/AIBot.png';

export default function ChatBot() {
  const interFont = { fontFamily: "'Inter', sans-serif" };
  const openSansHebrewCondensed = {
    fontFamily: "'Open Sans Hebrew Condensed', 'Open Sans Condensed', sans-serif",
  };

  // State to handle opening and closing of the chatbot UI window
  const [isOpen, setIsOpen] = useState(false);

  // State tracking the chat history
  const [messages, setMessages] = useState([
    { role: 'bot', text: chatbotData.greeting }
  ]);

  // State capturing the current text value from the input field
  const [input, setInput] = useState('');

  // Reference hook targeting an invisible element at the bottom of the chat to trigger auto-scrolling
  const chatEndRef = useRef(null);

  // Automatically scroll down smoothly to show the latest messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Optimized keyword matching and scoring function
  const findBestMatch = (userText) => {
    // Clean user message by removing punctuation like ?, !, ., , to prevent matching errors
    const cleanMsg = userText.toLowerCase().replace(/[?.!,]/g, '').trim();
    
    let bestMatch = null;
    let maxScore = 0;

    for (const faq of chatbotData.faqs) {
      let score = 0;

      // Clean the FAQ question similarly for an accurate comparison
      const cleanQuestion = faq.question.toLowerCase().replace(/[?.!,]/g, '').trim();

      // 1. Check for strict exact question match after removing punctuation
      if (cleanMsg === cleanQuestion) {
        score += 20; 
      }

      // 2. Cross-inclusion check: Does user query contain the FAQ question or vice versa
      if (cleanQuestion.includes(cleanMsg) || cleanMsg.includes(cleanQuestion)) {
        score += 12;
      }

      // 3. Smart Keyword scoring: Matches clean keywords
      faq.keywords.forEach(keyword => {
        const cleanKeyword = keyword.toLowerCase().replace(/[?.!,]/g, '').trim();
        
        // Exact keyword match gets a major boost
        if (cleanMsg === cleanKeyword) {
          score += 15;
        } 
        // Word boundary or inclusion check
        else {
          const regex = new RegExp(`\\b${cleanKeyword}\\b`, 'i');
          if (regex.test(cleanMsg)) {
            score += 5;
          }
        }
      });

      // --- Contextual Heuristics for Specific Rounds ---
      const isRound1 = cleanMsg.includes('round 1') || cleanMsg.includes('1st round') || cleanMsg.includes('round one') || cleanMsg.includes('first round');
      const isRound2 = cleanMsg.includes('round 2') || cleanMsg.includes('2nd round') || cleanMsg.includes('round two') || cleanMsg.includes('second round');
      const isRound3 = cleanMsg.includes('round 3') || cleanMsg.includes('3rd round') || cleanMsg.includes('round three') || cleanMsg.includes('third round') || cleanMsg.includes('final round');

      if (isRound1 && faq.id.includes('round1')) score += 6;
      if (isRound2 && faq.id.includes('round2')) score += 6;
      if (isRound3 && faq.id.includes('round3')) score += 6;

      // Direct control for common greetings or gratitude phrases
      const isThankYou = cleanMsg.includes('thank you') || cleanMsg.includes('thanks') || cleanMsg.includes('thank u') || cleanMsg.includes('tq') || cleanMsg.includes('ty');
      if (isThankYou && faq.id === 'thanks') {
        score += 10;
      }

      // Track the highest scoring match
      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    }

    // Return the match if it safely crosses our validation threshold
    if (bestMatch && maxScore > 3) {
      return bestMatch.answer;
    }

    return chatbotData.fallback;
  };

  // Helper to handle any user message
  const handleUserMessage = (userText) => {
    if (!userText.trim()) return;

    const userMessage = userText.trim();

    // 1. Instantly push user input to the chat list
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');

    // 2. Find the answer immediately from JSON knowledge base
    const botReply = findBestMatch(userMessage);

    // 3. Inject a minor delay to emulate a lifelike typing feedback loop
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: botReply }]);
    }, 400);
  };

  // Form submission handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    handleUserMessage(input);
  };

  return (
    <div className="fixed z-50 bottom-6 right-6 text-slate-900" style={interFont}>
      {/* Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative z-50 flex items-center justify-center w-16 h-16 transition-transform duration-200 bg-transparent rounded-full hover:scale-110 drop-shadow-xl"
          aria-label="Open AI Assistant"
        >
          <img
            src={AIBOT_ICON_URL}
            alt="AI Assistant"
            className="object-contain w-16 h-16 animate-spin-y"
          />
        </button>
      )}

      {/* Main Chat Interface Window - Styled with Premium Glassmorphism */}
      {isOpen && (
        <div className="w-80 md:w-[400px] h-[700px] max-h-[85vh] rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] flex flex-col overflow-hidden border border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl relative z-50">

          {/* Chat Window Branding Header - Semi-transparent */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/10 backdrop-blur-md" style={openSansHebrewCondensed}>
            <div className="flex flex-col">
              <img
                src="/images/2026-images/logo-main-2026.png"
                alt="MH '26 Bot"
                className="object-contain w-auto h-8 mb-1 drop-shadow-sm"
              />
            </div>
            <button onClick={() => setIsOpen(false)} className="flex items-center self-start justify-center w-8 h-8 font-bold text-gray-700 transition-all border rounded-full shadow-sm dark:text-gray-300 bg-white/20 hover:bg-white/40 hover:text-black backdrop-blur-md border-white/10">✕</button>
          </div>

          {/* Chat Logs Content Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`whitespace-pre-wrap max-w-[80%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm transition-all
                  ${msg.role === 'user' 
                    ? 'bg-[#1d3bf3]/90 text-white rounded-tr-sm shadow-[0_4px_12px_rgba(29,59,243,0.3)]' 
                    : 'bg-white/15 dark:bg-black/20 backdrop-blur-md text-gray-800 dark:text-slate-100 border border-white/10 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Starter Questions - Floating Glass Pills */}
          <div
            className="flex px-4 py-3 space-x-2 overflow-x-auto border-t border-white/10 bg-white/5 backdrop-blur-md"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {chatbotData.starterQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleUserMessage(q)}
                className="whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-full border border-white/10 transition-all shrink-0 shadow-sm text-[#1d3bf3] dark:text-blue-400 bg-white/30 dark:bg-black/20 hover:bg-[#1d3bf3] hover:text-white dark:hover:bg-blue-600"
              >
                {q}
              </button>
            ))}
          </div>

          {/* User Entry Submission Form - Integrated Glass Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2 p-4 border-t border-white/10 bg-white/10 backdrop-blur-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 text-sm bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#1d3bf3]/40 dark:focus:ring-blue-500/40 text-gray-800 dark:text-slate-100 transition-all placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button 
              type="submit" 
              className="px-5 py-3 font-semibold text-sm text-white transition-all bg-[#1d3bf3]/90 hover:bg-[#1d3bf3] rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}