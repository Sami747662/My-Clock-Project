
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { GlassContainer } from './GlassContainer';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('zenclock_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('zenclock_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <GlassContainer className="w-full flex flex-col h-[380px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">Daily Focus</h3>
        <span className="text-[10px] opacity-40">{tasks.filter(t => t.completed).length}/{tasks.length} Done</span>
      </div>
      
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's next?"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-white/30 transition-all"
        />
        <button 
          type="submit"
          className="p-2 bg-white text-black rounded-xl hover:scale-105 active:scale-95 transition-transform"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
            <CheckCircle2 size={40} className="mb-2" strokeWidth={1} />
            <p className="text-xs uppercase tracking-widest">Clear for takeoff</p>
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${task.completed ? 'opacity-40' : 'bg-white/5 hover:bg-white/10'}`}
            >
              <button onClick={() => toggleTask(task.id)} className="shrink-0">
                {task.completed ? <CheckCircle2 size={18} className="text-green-400" /> : <Circle size={18} />}
              </button>
              <span className={`flex-1 text-sm ${task.completed ? 'line-through' : ''}`}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all p-1">
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </GlassContainer>
  );
};
