import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[95vh] w-full overflow-hidden">
      {/* Simulated Video Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618193108628-97cb244c4b9b?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-cinematic-fade"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-32 z-20 flex items-end">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* AI Match Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amitosh-rainbow animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-amitosh-rainbow">
              99% Match • Cyberpunk Thriller
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-[0.9] drop-shadow-2xl">
            NEON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">GODS</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 line-clamp-3 drop-shadow-lg max-w-2xl font-light">
            In a city that never sleeps, humanity is the only currency left. 
            An Amitosh Original Series that redefines the visual boundaries of imagination.
          </p>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-amitosh-rainbow hover:text-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <Play className="fill-current w-5 h-5" />
              Watch Now
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10">
              <Info className="w-5 h-5" />
              Details
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}