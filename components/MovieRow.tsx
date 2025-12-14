import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  moodColor?: boolean;
}

export default function MovieRow({ title, movies, moodColor = false }: MovieRowProps) {
  return (
    <div className="mb-12">
      <div className="flex items-end gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-starlight hover:text-white transition-colors cursor-pointer">
              {moodColor ? (
                <>Mood: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{title}</span></>
              ) : title}
          </h2>
          {!moodColor && <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent mb-2"></div>}
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="relative group/list">
          <div className="flex gap-4 overflow-x-auto pb-32 pt-4 px-2 no-scrollbar scroll-smooth" style={{ scrollbarWidth: 'none' }}>
              {movies.map((movie, index) => (
                  <MovieCard key={`${movie.title}-${index}`} {...movie} />
              ))}
          </div>
          {/* Gradient fade on right */}
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-amitosh-void to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}