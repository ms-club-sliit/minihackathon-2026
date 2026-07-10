'use client';

import { useState, useRef, useEffect } from 'react';
import chatbotData from './chatbot_data.json';
const AIBOT_ICON_URL = '/images/AIBot.png';
const AIBOT_3D_MODEL_URL =
  process.env.NEXT_PUBLIC_AIBOT_3D_MODEL_URL ||
  'https://sketchfab.com/models/200d00d02dfa40cf8c71822d9ee3ee66/embed?autospin=1&autostart=1&ui_hint=0&ui_theme=dark&dnt=1&hint=0&preload=1&camera=0&transparent=1&ui_infos=1&ui_controls=0&ui_stop=0';

export default function ChatBot() {
  const interFont = { fontFamily: "'Inter', sans-serif" };
  const openSansHebrewCondensed = {
    fontFamily: "'Open Sans Hebrew Condensed', 'Open Sans Condensed', sans-serif",
  };
  const has3DModel = Boolean(AIBOT_3D_MODEL_URL?.trim());

  // State to handle opening and closing of the chatbot UI window
  const [isOpen, setIsOpen] = useState(false);

  // State tracking the chat history, preloaded with a friendly welcome message from the bot
  const [messages, setMessages] = useState([
    { role: 'bot', text: chatbotData.greeting }
  ]);

  // State capturing the current text value from the input field
  const [input, setInput] = useState('');

  // Reference hook targeting an invisible element at the bottom of the chat to trigger auto-scrolling
  const chatEndRef = useRef(null);

  // RAG / AI State
  const worker = useRef(null);
  const [modelReady, setModelReady] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Initializing AI...');
  const faqEmbeddings = useRef({});
  const pendingRequests = useRef({});
  const requestCounter = useRef(0);

  // Initialize the Web Worker for Transformers.js
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

      worker.current.onmessage = (e) => {
        const { type, payload } = e.data;
        if (type === 'progress') {
          if (payload.status === 'downloading') {
            setLoadingStatus(`Downloading AI Model... (${Math.round(payload.progress)}%)`);
          }
        } else if (type === 'ready') {
          setLoadingStatus('Processing Knowledge Base...');
          // Calculate embeddings for all FAQs to establish the Vector Database
          chatbotData.faqs.forEach(faq => {
            // Combine question, keywords, and answer to create a rich semantic document
            const textToEmbed = `${faq.question}. ${faq.keywords.join(' ')}. ${faq.answer}`;
            worker.current.postMessage({ type: 'embed', payload: { id: faq.id, text: textToEmbed } });
          });
        } else if (type === 'embed_result') {
          const { id, embedding } = payload;

          if (id.startsWith('user_')) {
            // Resolve the pending promise for a user query
            if (pendingRequests.current[id]) {
              pendingRequests.current[id](embedding);
              delete pendingRequests.current[id];
            }
          } else {
            // Store the FAQ embedding in memory
            faqEmbeddings.current[id] = embedding;
            // Check if all knowledge base embeddings are fully loaded
            if (Object.keys(faqEmbeddings.current).length === chatbotData.faqs.length) {
              setModelReady(true);
              setLoadingStatus('AI Ready!');
            }
          }
        }
      };

      worker.current.postMessage({ type: 'load' });
    }

    return () => {
      // We do not terminate the worker on unmount strictly here because in Strict Mode it would kill it while loading
      // For a global chatbot, leaving the worker alive is preferred.
    };
  }, []);

  // Utility to calculate Cosine Similarity between two vectors
  const cosineSimilarity = (vecA, vecB) => {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  };


  // Automatically scroll down smoothly to show the latest messages whenever the history updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  // Helper to handle any user message (from form or starter buttons)
  const handleUserMessage = async (userText) => {
    if (!userText.trim()) return;

    const userMessage = userText.trim();

    // 1. Instantly push user input to the chat list and clear out the textbox
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');

    // Ensure the model is ready before processing
    if (!modelReady) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'bot', text: 'I am still downloading and initializing the AI model in your browser. Please wait a few seconds and try again!' }]);
      }, 600);
      return;
    }

    const reqId = 'user_' + (requestCounter.current++);

    // Create a promise to wait for the Web Worker to compute the embedding for the user's query
    const getEmbedding = new Promise((resolve) => {
      pendingRequests.current[reqId] = resolve;
      worker.current.postMessage({ type: 'embed', payload: { id: reqId, text: userMessage } });
    });

    // 2. Perform Semantic Search (RAG)
    const userEmbedding = await getEmbedding;

    let bestMatch = null;
    let maxScore = -Infinity;

    for (const faq of chatbotData.faqs) {
      const faqEmb = faqEmbeddings.current[faq.id];
      if (faqEmb) {
        let score = cosineSimilarity(userEmbedding, faqEmb);
        
        // --- Hybrid Search Heuristics for Rounds ---
        const lowerMsg = userMessage.toLowerCase();
        
        const isRound1 = lowerMsg.includes('round 1') || lowerMsg.includes('1st round') || lowerMsg.includes('round one') || lowerMsg.includes('first round');
        const isRound2 = lowerMsg.includes('round 2') || lowerMsg.includes('2nd round') || lowerMsg.includes('round two') || lowerMsg.includes('second round');
        const isRound3 = lowerMsg.includes('round 3') || lowerMsg.includes('3rd round') || lowerMsg.includes('round three') || lowerMsg.includes('third round') || lowerMsg.includes('final round');

        if (isRound1) {
          if (faq.id.includes('round1')) score += 0.2;
          else if (faq.id.includes('round2') || faq.id.includes('round3')) score -= 0.5;
        }
        if (isRound2) {
          if (faq.id.includes('round2')) score += 0.2;
          else if (faq.id.includes('round1') || faq.id.includes('round3')) score -= 0.5;
        }
        if (isRound3) {
          if (faq.id.includes('round3')) score += 0.2;
          else if (faq.id.includes('round1') || faq.id.includes('round2')) score -= 0.5;
        }
        
        // Boost for 'thank you' / gratitude since short conversational queries get diluted in embeddings
        const isThankYou = lowerMsg.includes('thank you') || lowerMsg.includes('thanks') || lowerMsg.includes('thank u') || lowerMsg.includes('tq') || lowerMsg.includes('ty');
        if (isThankYou && faq.id === 'thanks') {
          score += 0.5;
        }
        // -------------------------------------------

        if (score > maxScore) {
          maxScore = score;
          bestMatch = faq;
        }
      }
    }

    // Set a strict minimum similarity threshold to avoid wildly incorrect matches
    let botReply = chatbotData.fallback;
    if (bestMatch && maxScore > 0.4) {
      botReply = bestMatch.answer;
    }

    // 3. Inject a minor delay before the bot pushes its answer to emulate a lifelike typing feedback loop
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: botReply }]);
    }, 600);
  };

  // Form submission handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    handleUserMessage(input);
  };

  return (
    <div className="fixed z-50 bottom-6 right-6 text-slate-900" style={interFont}>
      {/* Floating Action Button (FAB) - Visible only when the chat panel is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative z-50 w-16 h-16 flex items-center justify-center rounded-full bg-transparent hover:scale-110 transition-transform duration-200 drop-shadow-xl"
          aria-label="Open AI Assistant"
        >
          <img
            src="/images/AIBot.png"
            alt="AI Assistant"
            className="w-16 h-16 object-contain animate-spin-y"
          />
        </button>
      )}


      {/* Main Chat Interface Window - Rendered conditionally when opened */}
      {isOpen && (
        <div className="w-80 md:w-[400px] h-[700px] max-h-[85vh] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col overflow-hidden border border-white/60 bg-white/40 backdrop-blur-2xl bg-gradient-to-br from-[#cbf4f8]/80 via-[#e2dcf8]/80 to-[#fce3da]/80 relative z-50">

          {/* Chat Window Branding Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/30 bg-white/30 backdrop-blur-md" style={openSansHebrewCondensed}>
            <div className="flex flex-col">
              <img
                src="/images/2026-images/logo-main-2026.png"
                alt="MH '26 Bot"
                className="object-contain w-auto h-8 mb-1 drop-shadow-sm"
              />
              {!modelReady && (
                <span className="text-[11px] italic font-semibold text-[#1d3bf3] opacity-90 animate-pulse tracking-wide">{loadingStatus}</span>
              )}
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 bg-white/50 hover:bg-white/80 hover:text-black rounded-full transition-all self-start backdrop-blur-md shadow-sm">✕</button>
          </div>

          {/* Chat Logs Content Area - Scrollable */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.1) transparent' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {/* Dynamically shift alignment and theme presets depending on message origins */}
                <div 
                  className={`whitespace-pre-wrap max-w-[80%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm 
                  ${msg.role === 'user' 
                    ? 'bg-[#1d3bf3] text-white rounded-tr-sm' 
                    : 'bg-white/90 backdrop-blur-xl text-gray-800 border border-white/60 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Safe zone target for scroll anchor management */}
            <div ref={chatEndRef} />
          </div>

          {/* Starter Questions */}
          <div
            className="flex px-4 py-3 space-x-2 overflow-x-auto border-t border-white/30 bg-white/20 backdrop-blur-md"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {chatbotData.starterQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleUserMessage(q)}
                disabled={!modelReady}
                className={`whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-full border transition-all shrink-0 shadow-sm
                  ${modelReady 
                    ? 'text-[#1d3bf3] bg-white/80 hover:bg-[#1d3bf3] hover:text-white border-white' 
                    : 'text-gray-400 bg-white/40 border-transparent cursor-not-allowed'
                  }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* User Entry Submission Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2 p-4 border-t border-white/30 bg-white/30 backdrop-blur-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!modelReady}
              placeholder={modelReady ? "Ask me anything..." : "Loading AI..."}
              className="flex-1 px-4 py-3 text-sm bg-white/70 backdrop-blur-md border border-white rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#1d3bf3]/50 focus:bg-white text-gray-800 transition-all placeholder-gray-500 disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={!modelReady} 
              className="px-5 py-3 font-semibold text-sm text-white transition-all bg-[#1d3bf3] rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}