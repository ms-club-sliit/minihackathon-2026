'use client';

import { useState, useRef, useEffect } from 'react';
import chatbotData from './chatbot_data.json';

// Global asset constant for the floating action button icon
const AIBOT_ICON_URL = '/images/AIBot.png';

export default function ChatBot() {
  // Inline standard font styling overrides for UI uniformity
  const interFont = { fontFamily: "'Inter', sans-serif" };
  const openSansHebrewCondensed = {
    fontFamily: "'Open Sans Hebrew Condensed', 'Open Sans Condensed', sans-serif",
  };

  // State visibility toggle controlling whether the main chatbot UI is open or hidden
  const [isOpen, setIsOpen] = useState(false);

  // Array state storing live chat dialogue log history, pre-seeded with a welcome greeting
  const [messages, setMessages] = useState([
    { role: 'bot', text: chatbotData.greeting }
  ]);

  // Two-way controlled state binding capturing the active keystrokes inside the input text field
  const [input, setInput] = useState('');

  // Auto-scroller reference node pinned structurally right below the youngest message container
  const chatEndRef = useRef(null);

  // Auto-scroll layout lock triggered seamlessly whenever a new response or user entry shifts the stack length
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * High-Performance Local FAQ Token Scoring Algorithm
   * Processes input strings client-side matching structural relevance in O(N) constraints.
   */
  const findBestMatch = (userText) => {
    // Standardize input matrix by stripping trailing or structural punctuations (? , ! .) to avoid matching failures
    const cleanMsg = userText.toLowerCase().replace(/[?.!,]/g, '').replace(/\s+/g, ' ').trim();
    
    let bestMatch = null;
    let maxScore = 0;

    // Loop through the static knowledge baseline dictionary
    for (const faq of chatbotData.faqs) {
      let score = 0;
      
      // Standardize the targeted dictionary key target question signature using the same validation mapping
      const cleanQuestion = faq.question.toLowerCase().replace(/[?.!,]/g, '').replace(/\s+/g, ' ').trim();

      // 1. Exact Structural Match Hook (Highest Priority Rule Assignment)
      if (cleanMsg === cleanQuestion) {
        score += 20; 
      }

      // 2. Continuous Bi-Directional Cross-Inclusion Verification
      if (cleanQuestion.includes(cleanMsg) || cleanMsg.includes(cleanQuestion)) {
        score += 12;
      }

      // 3. Isolated Target Keyword Extraction & Standalone Token Weighting
      faq.keywords.forEach(keyword => {
        const cleanKeyword = keyword.toLowerCase().replace(/[?.!,]/g, '').replace(/\s+/g, ' ').trim();
        
        // Exact standalone keyword phrase matching condition
        if (cleanMsg === cleanKeyword) {
          score += 15;
        } 
        // Discrete word boundary regex verification to avoid greedy evaluation errors (e.g., matching "hi" inside "membership")
        else {
          const regex = new RegExp(`\\b${cleanKeyword}\\b`, 'i');
          if (regex.test(cleanMsg)) {
            score += 5;
          }
        }
      });

      // 4. Structural Milestone Stage Routing Helpers (Contextual Fallbacks for Ambiguous Rounds queries)
      const isRound1 = cleanMsg.includes('round 1') || cleanMsg.includes('1st round') || cleanMsg.includes('round one') || cleanMsg.includes('first round');
      const isRound2 = cleanMsg.includes('round 2') || cleanMsg.includes('2nd round') || cleanMsg.includes('round two') || cleanMsg.includes('second round');
      const isRound3 = cleanMsg.includes('round 3') || cleanMsg.includes('3rd round') || cleanMsg.includes('round three') || cleanMsg.includes('third round') || cleanMsg.includes('final round');

      if (isRound1 && faq.id.includes('round1')) score += 6;
      if (isRound2 && faq.id.includes('round2')) score += 6;
      if (isRound3 && faq.id.includes('round3')) score += 6;

      // 5. Intercepting expressions of gratitude or common standard conversational exits
      const isThankYou = cleanMsg.includes('thank you') || cleanMsg.includes('thanks') || cleanMsg.includes('thank u') || cleanMsg.includes('tq') || cleanMsg.includes('ty');
      if (isThankYou && faq.id === 'thanks') {
        score += 10;
      }

      // Track the absolute top scoring dataset metadata item
      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    }

    // Evaluate final threshold conditions to determine whether to surface an explicit match or fire a fallback
    if (bestMatch && maxScore > 3) {
      return bestMatch.answer;
    }

    return chatbotData.fallback;
  };

  /**
   * Dispatches conversation logs and controls typing simulation sequences.
   */
  const handleUserMessage = (userText) => {
    if (!userText.trim()) return;

    const userMessage = userText.trim();
    
    // Immediate state commitment logging the fresh payload sent by the user
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');

    // Fetch matching data strings instantly via client execution stack loop
    const botReply = findBestMatch(userMessage);

    // Artificial interface delay loop added to emulate responsive human-like typing behaviors
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: botReply }]);
    }, 400);
  };

  // Explicit form submission listener wrapping keyboard actions or tap clicks
  const handleSendMessage = (e) => {
    e.preventDefault();
    handleUserMessage(input);
  };

  return (
    <div className="fixed z-50 bottom-6 right-6 text-slate-900" style={interFont}>
      {/* The Premium Fixed 3D Animation Definition:
        Restored original Y-Axis spin (turns sideways beautifully), and removed backface visibility hides 
        so both sides of the asset show cleanly during rotation frames.
      */}
      <style>{`
        @keyframes custom3DSpinY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .bot-perfect-3d-spin {
          animation: custom3DSpinY 4s linear infinite;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Floating Action Button (FAB) Trigger Group:
        Instead of unmounting via {!isOpen && ...}, we control visibility using CSS opacity and transitions.
        This fixes the GPU layout splitting bug completely because the element stays rooted safely in the DOM.
      */}
      <button
        onClick={() => setIsOpen(true)}
        className={`absolute bottom-0 right-0 z-50 flex items-center justify-center w-16 h-16 transition-all duration-300 bg-transparent rounded-full hover:scale-110 active:scale-95 drop-shadow-xl ${
          isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 pointer-events-auto scale-100'
        }`}
        aria-label="Open AI Assistant"
      >
        <img
          src={AIBOT_ICON_URL}
          alt="AI Assistant"
          className="object-contain w-16 h-16 bot-perfect-3d-spin"
        />
      </button>

      {/* Main Chat Interface Window - Transparent Glassmorphism */}
      {isOpen && (
        <div className="w-80 md:w-[400px] h-[700px] max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/50 bg-white/10 backdrop-blur-md relative z-40 animate-in fade-in zoom-in-95 duration-200">

          {/* Chat Window Branding Header Section */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/10 backdrop-blur-sm" style={openSansHebrewCondensed}>
            <div className="flex items-end font-bold leading-none tracking-tighter text-black select-none">
              <div className="flex flex-col items-start">
                <span className="text-[14px] -mb-1">mini</span>
                <span className="text-[22px]">Hackathon</span>
              </div>
              <span className="bg-[#7248D2] text-white text-[22px] px-1 ml-0.5 rounded-sm shadow-sm">26</span>
            </div>
            {/* Smooth glass escape button */}
            <button onClick={() => setIsOpen(false)} className="flex items-center self-start justify-center w-8 h-8 font-bold text-gray-700 transition-all border rounded-full shadow-sm bg-white/20 hover:bg-white/40 hover:text-black backdrop-blur-sm border-white/30">✕</button>
          </div>

          {/* Dynamic Scrollable Chat Log Rendering Window Layer */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.4) transparent' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`whitespace-pre-wrap max-w-[80%] p-3.5 rounded-2xl text-[13px] leading-relaxed transition-all
                  ${msg.role === 'user' 
                    ? 'bg-[#7248D2] text-white rounded-tr-sm shadow-sm' 
                    : 'bg-white/20 backdrop-blur-sm text-slate-800 border border-white/40 rounded-tl-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Phantom anchor node targeting scroll locking viewport coordinates */}
            <div ref={chatEndRef} />
          </div>



          {/* User Input Message Submission Form Area */}
          <form onSubmit={handleSendMessage} className="flex gap-2 p-4 border-t border-white/20 bg-white/10 backdrop-blur-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 text-sm bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#7248D2]/40 text-slate-800 transition-all placeholder-slate-600"
            />
            <button 
              type="submit" 
              className="px-5 py-3 font-semibold text-sm text-white transition-all bg-[#7248D2] hover:opacity-90 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}