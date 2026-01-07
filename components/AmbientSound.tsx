
import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, CloudRain, Wind, Waves } from 'lucide-react';

interface Sound {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
}

const SOUNDS: Sound[] = [
  { id: 'rain', name: 'Rain', icon: <CloudRain size={16} />, url: 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3' },
  { id: 'wind', name: 'Forest', icon: <Wind size={16} />, url: 'https://assets.mixkit.co/active_storage/sfx/2452/2452-preview.mp3' },
  { id: 'waves', name: 'Ocean', icon: <Waves size={16} />, url: 'https://assets.mixkit.co/active_storage/sfx/1110/1110-preview.mp3' },
];

export const AmbientSound: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = (sound: Sound) => {
    if (activeId === sound.id) {
      audioRef.current?.pause();
      setActiveId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = sound.url;
        audioRef.current.loop = true;
        audioRef.current.play();
      }
      setActiveId(sound.id);
    }
  };

  return (
    <div className="flex gap-2 bg-black/20 p-2 rounded-2xl backdrop-blur-md border border-white/5">
      <audio ref={audioRef} />
      {SOUNDS.map(sound => (
        <button
          key={sound.id}
          onClick={() => toggleSound(sound)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all text-[10px] uppercase font-medium tracking-widest ${activeId === sound.id ? 'bg-white text-black' : 'hover:bg-white/10 opacity-60 hover:opacity-100'}`}
        >
          {sound.icon}
          <span className="hidden sm:inline">{sound.name}</span>
        </button>
      ))}
      <div className="w-[1px] bg-white/10 mx-1" />
      <div className="px-2 flex items-center opacity-40">
        {activeId ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
      </div>
    </div>
  );
};
