import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import AiAssistant from './components/AiAssistant';
import ChatWindow from './components/ChatWindow';
import { TRENDING_MOVIES, MOOD_MOVIES } from './constants';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

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