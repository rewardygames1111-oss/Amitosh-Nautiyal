import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageStream, initializeChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hey! I'm Amitosh AI. Looking for a cyberpunk thriller or something more chill? Ask away!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Init chat on load
  useEffect(() => {
    initializeChat();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await sendMessageStream(userMsg.text);
      
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMsgId, role: 'model', text: '' }]);

      let fullText = '';
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMsgId ? { ...msg, text: fullText } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Sorry, I seem to be having trouble connecting to the neural net. Try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-28 right-6 md:right-12 w-[90vw] md:w-[400px] h-[500px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-amitosh-rainbow/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-yellow-500 p-[1px]">
                 <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                 </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Amitosh AI</h3>
                <p className="text-[10px] text-cyan-400 animate-pulse">Online</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-white text-black rounded-tr-sm' 
                    : 'bg-white/10 text-gray-100 rounded-tl-sm border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-3 rounded-tl-sm flex gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/50">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for a recommendation..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-amitosh-rainbow opacity-80 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}