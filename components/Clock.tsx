
import React, { useState, useEffect } from 'react';

interface ClockProps {
  userName: string;
}

export const Clock: React.FC<ClockProps> = ({ userName }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getGreeting = (date: Date) => {
    const hour = date.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-light tracking-widest opacity-80 animate-fade-in">
          {getGreeting(time)}, <span className="font-semibold">{userName}</span>
        </h2>
        <p className="text-sm md:text-base opacity-60 uppercase tracking-widest">
          {formatDate(time)}
        </p>
      </div>
      
      <div className="relative group">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-glow transition-all duration-300">
          {formatTime(time).split(' ')[0]}
          <span className="text-2xl md:text-4xl ml-4 font-medium opacity-50 align-middle">
            {formatTime(time).split(' ')[1]}
          </span>
        </h1>
      </div>
    </div>
  );
};
