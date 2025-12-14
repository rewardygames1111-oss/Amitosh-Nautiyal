import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import AiAssistant from './components/AiAssistant';
import ChatWindow from './components/ChatWindow';
import { TRENDING_MOVIES, MOOD_MOVIES } from './constants';
import { MonitorPlay, ChevronRight } from 'lucide-react';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [isCheckingKey, setIsCheckingKey] = useState(true);

  useEffect(() => {
    async function checkKey() {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
      setIsCheckingKey(false);
    }
    checkKey();
  }, []);

  const handleConnect = async () => {
    if (window.aistudio) {
      // Per guidelines, assume success after triggering openSelectKey
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  if (isCheckingKey) {
    return <div className="min-h-screen bg-amitosh-void"></div>;
  }

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-amitosh-void flex flex-col items-center justify-center p-6 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618193108628-97cb244c4b9b?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-20 blur-sm"></div>
          <div className="absolute inset-0 bg-black/60"></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-md text-center">
              <div className="w-20 h-20 mb-8 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-amitosh-rainbow blur-xl rounded-full opacity-60 animate-pulse-slow"></div>
                  <MonitorPlay className="relative z-10 w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">AMITOSH <span className="font-light text-gray-400">SHOW</span></h1>
              <p className="text-gray-400 mb-8 text-sm">Initialize your neural link to access the mainframe.</p>
              
              <button 
                  onClick={handleConnect}
                  className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,198,255,0.5)] overflow-hidden"
              >
                  <span className="relative z-10 flex items-center gap-2">
                     Connect API Key <ChevronRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-amitosh-rainbow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="absolute inset-0 z-10 bg-white mix-blend-overlay opacity-0 group-hover:opacity-20"></span>
              </button>
              
               <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 text-xs text-gray-500 hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400"
              >
                  Get a paid API key
              </a>
          </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-amitosh-void text-white selection:bg-purple-500 selection:text-white pb-20">
      <Navbar />
      <Hero />
      
      <div className="relative z-30 -mt-24 px-6 md:px-12 space-y-12">
        <MovieRow title="Trending Now" movies={TRENDING_MOVIES} />
        <MovieRow title="Mind-Bending" movies={MOOD_MOVIES} moodColor={true} />
      </div>

      <AiAssistant onClick={() => setIsChatOpen(!isChatOpen)} isOpen={isChatOpen} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}