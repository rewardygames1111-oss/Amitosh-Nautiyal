import React, { useState, useEffect } from 'react';
import { Search, Bell, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-40 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="w-10 h-10 relative flex items-center justify-center">
           <div className="absolute inset-0 bg-amitosh-rainbow blur-lg rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow"></div>
           <MonitorPlay className="relative z-10 w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-amitosh-rainbow transition-all duration-300 hidden md:block">
          AMITOSH <span className="font-light">SHOW</span>
        </span>
      </div>

      {/* Navigation Dock */}
      <div className="hidden md:flex items-center gap-1 bg-amitosh-glass backdrop-blur-md px-2 py-2 rounded-full border border-white/5 shadow-2xl">
        {['Home', 'Movies', 'Series', 'New & Popular', 'My List'].map((item) => (
          <a key={item} href="#" className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
            {item}
          </a>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer hover:text-amitosh-rainbow transition-colors" />
        <Bell className="w-5 h-5 text-gray-300 cursor-pointer hover:text-amitosh-rainbow transition-colors" />
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-yellow-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
             <span className="text-xs font-bold">AS</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}