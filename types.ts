
export type TimerMode = 'WORK' | 'BREAK';

export interface TimerState {
  timeLeft: number;
  isActive: boolean;
  mode: TimerMode;
}
