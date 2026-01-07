
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { TimerMode } from '../types';

export const Pomodoro: React.FC = () => {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('WORK');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    // Simple toggle mode on completion
    const nextMode = mode === 'WORK' ? 'BREAK' : 'WORK';
    setMode(nextMode);
    setTimeLeft(nextMode === 'WORK' ? WORK_TIME : BREAK_TIME);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'WORK' ? WORK_TIME : BREAK_TIME);
  };

  const switchMode = (newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'WORK' ? WORK_TIME : BREAK_TIME);
  };

  const formatTimeLeft = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((mode === 'WORK' ? WORK_TIME : BREAK_TIME) - timeLeft) / (mode === 'WORK' ? WORK_TIME : BREAK_TIME) * 100;

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-xs mx-auto">
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/alarm_clock_short.ogg" />
      
      <div className="flex space-x-2 bg-white/5 p-1 rounded-xl w-full">
        <button
          onClick={() => switchMode('WORK')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-all duration-300 ${mode === 'WORK' ? 'bg-white/10 shadow-lg scale-[1.02]' : 'opacity-40 hover:opacity-100'}`}
        >
          <Brain size={16} />
          <span className="text-xs font-medium uppercase tracking-widest">Focus</span>
        </button>
        <button
          onClick={() => switchMode('BREAK')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-all duration-300 ${mode === 'BREAK' ? 'bg-white/10 shadow-lg scale-[1.02]' : 'opacity-40 hover:opacity-100'}`}
        >
          <Coffee size={16} />
          <span className="text-xs font-medium uppercase tracking-widest">Break</span>
        </button>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Progress Ring Background */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            className="text-white/5"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={552}
            strokeDashoffset={552 - (552 * progress) / 100}
            strokeLinecap="round"
            className="text-white/40 transition-all duration-1000 ease-linear"
          />
        </svg>
        
        <div className="text-center z-10">
          <div className="text-5xl font-mono font-bold tracking-wider">
            {formatTimeLeft(timeLeft)}
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-40 mt-1">
            {mode === 'WORK' ? 'Time to Focus' : 'Take a Rest'}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all active:scale-95"
          title="Reset"
        >
          <RotateCcw size={20} className="opacity-60" />
        </button>
        <button
          onClick={toggleTimer}
          className="p-5 rounded-full bg-white text-black hover:bg-opacity-90 transition-all shadow-xl active:scale-95"
        >
          {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
        </button>
        <div className="w-10" /> {/* Spacer for balance */}
      </div>
    </div>
  );
};
