
import React, { useState, useEffect } from 'react';
import { Clock } from './components/Clock';
import { Pomodoro } from './components/Pomodoro';
import { ToDoList } from './components/ToDoList';
import { AmbientSound } from './components/AmbientSound';
import { Settings } from 'lucide-react';

const App: React.FC = () => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('zenclock_user') || 'Sami';
  });
  
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    localStorage.setItem('zenclock_user', userName);
  }, [userName]);

  const backgroundImage = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80";

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center p-4 md:p-8 bg-cover bg-center transition-all duration-1000 overflow-y-auto scroll-smooth"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${backgroundImage})` }}
    >
      {/* Top Header / Sounds */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <span className="text-xs font-bold">Z</span>
          </div>
          <h1 className="text-sm font-light tracking-[0.4em] uppercase opacity-60">ZenClock Hub</h1>
        </div>
        <AmbientSound />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        
        {/* Main Center - Clock & Greeting */}
        <div className="lg:col-span-7 flex flex-col justify-center py-8 md:py-16">
          <div className="relative group cursor-pointer" onClick={() => setIsEditingName(true)}>
            {isEditingName ? (
              <input 
                autoFocus
                className="bg-transparent text-center text-2xl md:text-3xl font-light tracking-widest outline-none border-b border-white/20 w-full mb-4"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
              />
            ) : (
              <Clock userName={userName} />
            )}
            {!isEditingName && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
                <Settings size={14} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Productivity Tools */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full max-w-md mx-auto">
          <Pomodoro />
          <ToDoList />
        </div>

      </div>

      {/* Floating Quote for Inspiration */}
      <div className="mt-auto pt-12 pb-6 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.6em] mb-2 font-light italic">
          "The secret of getting ahead is getting started."
        </p>
        <div className="flex justify-center gap-4 text-[9px] tracking-widest uppercase font-semibold">
          <span>Focus</span>
          <span className="opacity-30">•</span>
          <span>Breathe</span>
          <span className="opacity-30">•</span>
          <span>Achieve</span>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        body {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        /* Mobile Specific Overrides */
        @media (max-width: 640px) {
          .text-glow {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
