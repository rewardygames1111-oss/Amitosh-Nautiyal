import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AiAssistantProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function AiAssistant({ onClick, isOpen }: AiAssistantProps) {
  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: isOpen ? 0.9 : 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <button 
        onClick={onClick}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-black border border-white/10 shadow-[0_0_30px_rgba(255,0,204,0.3)] hover:shadow-[0_0_50px_rgba(0,198,255,0.5)] transition-all duration-500"
      >
        
        {/* Spinning Rainbow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-yellow-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-spin-slow"></div>
        <div className="absolute inset-[2px] rounded-full bg-black"></div>

        {/* Icon */}
        <Sparkles className={`relative z-10 w-7 h-7 text-white group-hover:text-cyan-300 transition-transform duration-300 ${isOpen ? 'rotate-90 scale-0' : 'group-hover:rotate-12'}`} />
        
        {/* Active State Icon (optional, simplistic toggle for now) */}
        {isOpen && (
           <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
           </div>
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="hidden md:block absolute right-20 bg-black/80 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
            <p className="text-sm font-semibold text-gradient">Ask Amitosh AI</p>
            <p className="text-xs text-gray-400">"What should I watch next?"</p>
          </div>
        )}
      </button>
    </motion.div>
  );
}