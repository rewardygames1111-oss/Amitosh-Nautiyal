import React from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Movie } from '../types';

const MovieCard: React.FC<Movie> = ({ title, image, match, genres }) => {
  return (
    <motion.div 
      className="relative group min-w-[200px] md:min-w-[280px] h-[120px] md:h-[160px] cursor-pointer"
      whileHover={{ scale: 1.15, zIndex: 30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover rounded-md group-hover:rounded-t-md shadow-lg" 
      />
      
      {/* Expanded Hover Card */}
      <motion.div 
        className="absolute top-[98%] left-0 right-0 bg-[#141414] p-4 rounded-b-md shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto border-x border-b border-white/10"
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-amitosh-rainbow hover:text-white transition-colors">
              <Play className="w-3 h-3 fill-current text-black group-hover:text-inherit" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white text-white">
              <Plus className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white text-white">
              <ThumbsUp className="w-3 h-3" />
            </button>
          </div>
          <button className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white text-white">
             <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
        
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400 mb-2">
          <span className="text-green-400 font-bold">{match}% Match</span>
          <span className="border border-gray-600 px-1 rounded">4K</span>
          <span className="border border-gray-600 px-1 rounded">HDR</span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
           {genres?.map((g, i) => (
             <React.Fragment key={g}>
                <span className="text-[10px] text-gray-300">{g}</span>
                {i < (genres?.length || 0) - 1 && <span className="text-[10px] text-gray-500">•</span>}
             </React.Fragment>
           ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;