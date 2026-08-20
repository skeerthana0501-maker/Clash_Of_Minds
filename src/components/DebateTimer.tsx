import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, Plus, Minus, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface DebateTimerProps {
  categoryColor: 'cyan' | 'amber';
}

const TIMER_PRESETS = [
  { label: '3 min (Opening)', seconds: 180 },
  { label: '2 min (Rebuttal)', seconds: 120 },
  { label: '1 min (Cross-Ex)', seconds: 60 },
  { label: '30 sec (Warning)', seconds: 30 },
  { label: '5 min (Extended)', seconds: 300 },
];

export function DebateTimer({ categoryColor }: DebateTimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(180);
  const [remainingSeconds, setRemainingSeconds] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  const warnedRef = useRef(false);
  const endedRef = useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            if (!endedRef.current) {
              endedRef.current = true;
              soundManager.playTimeUpBuzzer();
            }
            return 0;
          }
          if (prev === 31 && !warnedRef.current) {
            warnedRef.current = true;
            soundManager.playWarningDing();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPause = () => {
    if (!isRunning) {
      soundManager.playBell();
      warnedRef.current = false;
      endedRef.current = false;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
    warnedRef.current = false;
    endedRef.current = false;
  };

  const handlePresetSelect = (seconds: number, index: number) => {
    setIsRunning(false);
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    setActivePresetIndex(index);
    warnedRef.current = false;
    endedRef.current = false;
  };

  const handleAdjustTime = (deltaSeconds: number) => {
    setRemainingSeconds((prev) => Math.max(0, prev + deltaSeconds));
    setTotalSeconds((prev) => Math.max(0, prev + deltaSeconds));
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
  const isUrgent = remainingSeconds <= 30 && remainingSeconds > 0;
  const isExpired = remainingSeconds === 0;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col">
      {/* Header & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Bell className={`w-4 h-4 ${categoryColor === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Debate Round Timer
          </span>
        </div>

        {/* Preset Rounds */}
        <div className="flex flex-wrap gap-1.5">
          {TIMER_PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => handlePresetSelect(preset.seconds, idx)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                activePresetIndex === idx
                  ? categoryColor === 'cyan'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Countdown Display */}
      <div className="relative py-4 my-1 flex flex-col items-center justify-center rounded-xl bg-slate-950/80 border border-slate-800/80 overflow-hidden">
        {/* Progress Bar Background */}
        <div
          className={`absolute bottom-0 left-0 h-1 transition-all duration-300 ${
            isExpired
              ? 'bg-rose-500 w-full'
              : isUrgent
              ? 'bg-amber-400'
              : categoryColor === 'cyan'
              ? 'bg-cyan-400'
              : 'bg-amber-400'
          }`}
          style={{ width: `${progressPercent}%` }}
        />

        <div className="flex items-baseline gap-2">
          <span
            className={`font-mono text-5xl sm:text-6xl font-black tracking-tight ${
              isExpired
                ? 'text-rose-400 animate-pulse'
                : isUrgent
                ? 'text-amber-400 animate-pulse'
                : 'text-white'
            }`}
          >
            {formattedTime}
          </span>
        </div>

        {/* Time Status Label */}
        <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
          {isExpired ? 'Time Expired (Floor Closed)' : isRunning ? 'Speaker on Floor' : 'Ready to Start'}
        </span>
      </div>

      {/* Timer Controls */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleAdjustTime(-15)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="Subtract 15 seconds"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>15s</span>
          </button>
          <button
            onClick={() => handleAdjustTime(15)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="Add 15 seconds"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>15s</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleStartPause}
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                : categoryColor === 'cyan'
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/30'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Start Floor
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
