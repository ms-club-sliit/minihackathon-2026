'use client';

import { useState, useRef, useEffect } from 'react';


// 1. Base64 Encrypted Knowledge Base to prevent data exposure in the Network Tab/Source View
const ENCRYPTED_DATA = "W3sia2V5d29yZHMiOlsiaGkiLCJoZWxsbyIsImhleSIsImhvbGEiLCJoYWxvIl0sInJlc3BvbnNlIjoiSGVsbG8hIFdlbGNvbWUgdG8gTWluaSBIYWNrYXRob24gMjAyNiBTdXBwb3J0LiBIb3cgY2FuIEkgYXNzaXN0IHlvdXIgdGVhbSB0b2RheT8ifSx7ImtleXdvcmRzIjpbImRhdGUiLCJkYXRlcyIsIndoZW4iLCJzY2hlZHVsZSJdLCJyZXNwb25zZSI6Ik1pbmkgSGFja2F0aG9uIDIwMjYgd2lsbCBiZSBoZWxkIG9uIEF1Z3VzdCAxNXRoIGFuZCAxNnRoLCAyMDI2LiBHZXQgcmVhZHkgZm9yIGEgMjQtaG91ciBjb2Rpbmcgc3ByaW50JSExIn0seyJrZXl3b3JkcyI6WyJyZWdpc3RlciIsInJlZ2lzdHJhdGlvbiIsImFwcGx5Iiwiam9pbiJdLCJyZXNwb25zZSI6IllvdSBjYW4gcmVnaXN0ZXIgeW91ciB0ZWFtIGJ5IGNsaWNraW5nIHRoZSAnUmVnaXN0ZXIgTm93JyVidXR0b24gb24gdGhlIG5hdmlnYXRpb24gYmFyLiBNYWtlIHN1cmUgdG8gc3VibWl0IGFsbCBkZXRhaWxzIGJlZm9yZSB0aGUgZGVhZGxpbmUhIn0seyJrZXl3b3JkcyI6WyJ0ZWFtIiwibWVtYmVycyIsInNpemUiXSwicmVzcG9uc2UiOiJBIHRlYW0gbXVzdCBjb25zaXN0IG9mIDMgdG8gNCBtZW1iZXJzLiBBbGwgbWVtYmVycyBtdXN0IGJlIGN1cnJlbnRseSByZWdpc3RlcmVkIHVuZGVyZ3JhZHVhdGVzLiJ9LHsia2V5d29yZHMiOlsicnVsZXMiLCJndWlkZWxpbmVzIiwiY3JpdGVyaWEiXSwicmVzcG9uc2UiOiJUaGUgY29tcGxldGUgZ3VpZGVsaW5lcyByZWdhcmRpbmcgZWxpZ2liaWxpdHksIHRlY2hub2xvZ3kgc3RhY2tzLCBhbmQgZXZhbHVhdGlvbiBjYml0ZXJpYSBjYW4gYmUgZm91bmQgdW5kZXIgdGhlICdSdWxlcycgc2VjdGlvbiBpbiBvdXIgbmF2aWdhdGlvbiBiYXIuIn0seyJrZXl3b3JkcyI6WyJ2ZW51ZSIsImxvY2F0aW9uIiwid2hlcmUiLCJwbGFjZSJdLCJyZXNwb25zZSI6IlRoZSBwaHlzaWNhbCBldmVudCB3aWxsIHRha2UgcGxhY2UgYXQgdGhlIFNMSUlUIE1haW4gQ2FtcHVzLCBNYWxhYmUuIFNwZWNpZmljIGxhYiBsb2NhdGlvbnMgd2lsbCBiZSBlbWFpbGVkIHRvIHNob3J0bGlzdGVkIHRlYW1zLiJ9LHsia2V5d29yZHMiOlsicHJpY2UiLCJwcml6ZSIsInByaXplcyIsIndpbiJdLCJyZXNwb25zZSI6IkV4Y2l0aW5nIGNhc2ggcHJpemVzLCBjZXJ0aWZpY2F0ZXMsIGFuZCBleGNsdXNpdmUgc3dhZyBhd2FpdCB0aGUgV2lubmVycywgMXN0IFJ1bm5lcnMtVXAsIGFuZCAybmQgUnVubmVycy1VcCExIn0seyJrZXl3b3JkcyI6WyJjb250YWN0IiwiZW1haWwiLCJzdXBwb3J0IiwiaGVscCIsImNsdWIiXSwicmVzcG9uc2UiOiJZb3UgY2FuIHJlYWNoIG91dCB0byB0aGUgTVMgQ2x1YiBvZiBTTElJVCBvcmdhbml6aW5nIGNvbW1pdHRlZSB2aWEgZW1haWwgYXQgaW5mb0Btc2NsdWJzbGlpdC5vcmcgb3IgRE0gdXMgb24gSW5zdGFncmFtL0ZhY2Vib29rLiJ9XQ==";
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
    { role: 'bot', text: 'Hello! Welcome to Mini Hackathon 26. How can I help you today?' }
  ]);
  
  // State capturing the current text value from the input field
  const [input, setInput] = useState('');
  
  // Reference hook targeting an invisible element at the bottom of the chat to trigger auto-scrolling
  const chatEndRef = useRef(null);


  // Helper function that decodes the Base64 data securely in-memory and parses it back into a standard JSON object
  const getDecodedData = () => {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(ENCRYPTED_DATA))));
    } catch (e) {
      console.error("Failed to decode chatbot data", e);
      return []; // Returns an empty array if decoding fails to avoid throwing breaking application errors
    }
  };


  // Automatically scroll down smoothly to show the latest messages whenever the history updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  // Form submission handler to manage message processing and responses
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Disallow submission of blank spaces


    const userMessage = input.trim();
    
    // 1. Instantly push user input to the chat list and clear out the textbox
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');


    // Normalize user message to lowercase for flawless keyword matching
    const cleanInput = userMessage.toLowerCase();
    
    // Fallback answer if no intentional keywords match the query
    let botReply = "I'm sorry, I couldn't find an answer. Please ask about registration, dates, or team size!";


    // 2. Decode the data and loop through the knowledge base to locate relevant matches
    const activeData = getDecodedData();
    for (const item of activeData) {
      // Check if the user input contains at least one phrase or keyword matching the current item
      const matchFound = item.keywords.some(keyword => cleanInput.includes(keyword));
      if (matchFound) {
        botReply = item.response; // Reassign the response with the pre-configured answer
        break; // Stop looking immediately once a valid match is made
      }
    }


    // 3. Inject a minor delay (600ms) before the bot pushes its answer to emulate a lifelike typing feedback loop
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed z-50 bottom-6 right-6 text-slate-900" style={interFont}>
      {/* Floating Action Button (FAB) - Visible only when the chat panel is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 transition-all transform bg-white rounded-full shadow-2xl hover:scale-110"
          style={openSansHebrewCondensed}
          aria-label="Open chat support"
        >
          {has3DModel ? (
            <div
              className="w-12 h-12 overflow-hidden bg-white rounded-full pointer-events-none"
              style={{ position: 'relative' }}
            >
              <iframe
                title="ChatBot"
                src={AIBOT_3D_MODEL_URL}
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking="true"
                execution-while-out-of-viewport="true"
                execution-while-not-rendered="true"
                web-share="true"
                loading="eager"
                width="640"
                height="480"
                style={{
                  border: 0,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(0.1)', // 48px tall / 480px = 0.1, covers the circle
                  transformOrigin: 'center',
                  background: 'transparent',
                }}
              />
            </div>
          ) : (
            <img
              src={AIBOT_ICON_URL}
              alt="AI Bot"
              className="object-contain w-10 h-10"
            />
          )}
        </button>
      )}


      {/* Main Chat Interface Window - Rendered conditionally when opened */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          
          {/* Chat Window Branding Header */}
          <div className="flex items-center justify-between p-4 text-white bg-[#5A6ACF]" style={openSansHebrewCondensed}>
            <img
              src="/images/2026-images/logo-main-2026.png"
              alt="MH '26 Bot"
              className="object-contain w-auto h-8 p-1 bg-white rounded"
            />
            <button onClick={() => setIsOpen(false)} className="font-bold text-white hover:text-gray-200">✕</button>
          </div>


          {/* Chat Logs Content Area - Scrollable */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {/* Dynamically shift alignment and theme presets depending on message origins */}
                <div className={`max-w-[75%] p-3 rounded-2xl text-xs ${msg.role === 'user' ? 'bg-[#5A6ACF] text-white' : 'bg-white text-gray-800 shadow-sm border'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Safe zone target for scroll anchor management */}
            <div ref={chatEndRef} />
          </div>


          {/* User Entry Submission Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2 p-3 bg-white border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 px-4 py-2 text-xs bg-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7A87E8]"
            />
            <button type="submit" className="px-4 py-2 text-xs text-white transition-colors bg-[#5A6ACF] rounded-xl hover:bg-[#4B58B3]">
              Send
            </button>
          </form>


        </div>
      )}
    </div>
  );
}