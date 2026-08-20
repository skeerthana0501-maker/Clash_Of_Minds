import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sparkles, ChevronRight, Volume2, VolumeX, Shield, Award, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface IntroScreenProps {
  onEnter: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function IntroScreen({ onEnter, isMuted, onToggleMute }: IntroScreenProps) {
  const [clashPulse, setClashPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setClashPulse((prev) => prev + 1);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleEnterClick = () => {
    soundManager.playClashSound();
    onEnter();
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.25),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.15),rgba(0,0,0,0)_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(56,189,248,0.15),rgba(0,0,0,0)_50%)]" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Bar with Event Badge & Audio Toggle */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">ANNUAL DEBATE CHAMPIONSHIP</span>
            <p className="text-sm font-semibold text-slate-200">Clash of Minds Arena</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMute}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-slate-500 text-slate-300 hover:text-white transition-all shadow-md flex items-center gap-2 text-xs font-medium"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            id="intro-sound-toggle-btn"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
          </button>
        </div>
      </header>

      {/* Main Clash Animation Canvas */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto w-full text-center">
        
        {/* TWO MINDS CLASHING VISUAL STAGE */}
        <div className="relative w-full max-w-2xl h-64 sm:h-80 flex items-center justify-center my-4">
          
          {/* Central Clash Energy Vortex */}
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/30 via-purple-500/30 to-amber-500/30 blur-2xl pointer-events-none"
          />

          {/* Electric Clash Shockwave Rings */}
          <motion.div
            key={clashPulse}
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute w-32 h-32 rounded-full border border-cyan-400/60 pointer-events-none"
          />
          <motion.div
            key={`pulse-2-${clashPulse}`}
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 2.2, delay: 0.1, ease: "easeOut" }}
            className="absolute w-32 h-32 rounded-full border border-amber-400/60 pointer-events-none"
          />

          {/* LEFT MIND (CYAN / LOGIC / PROPOSITION) */}
          <motion.div
            initial={{ x: -160, opacity: 0 }}
            animate={{ 
              x: [-140, -40, -50, -40],
              y: [0, -6, 6, 0],
              opacity: 1
            }}
            transition={{ 
              x: { duration: 1.2, ease: "easeOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute left-1/2 -ml-40 sm:-ml-48 z-10 flex flex-col items-center"
          >
            <div className="relative group">
              {/* Cyan Glow Aura */}
              <div className="absolute -inset-4 bg-cyan-500/30 rounded-full blur-xl animate-pulse" />
              
              {/* Left Mind Brain Container */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-cyan-950/90 via-slate-900 to-cyan-900/80 border-2 border-cyan-400/80 p-3 shadow-[0_0_35px_rgba(6,182,212,0.4)] flex items-center justify-center backdrop-blur-md">
                {/* Stylized Mind SVG Graphic */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 fill-current drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                  {/* Left Hemisphere stylized neural paths */}
                  <path d="M 50 15 C 32 15 18 28 18 45 C 18 55 24 64 28 72 C 32 80 40 85 50 85 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 1" />
                  <path d="M 30 35 C 38 30 46 38 48 45 C 50 52 42 60 34 62" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <path d="M 24 50 C 32 48 38 56 46 54" fill="none" stroke="#7dd3fc" strokeWidth="2" />
                  <circle cx="30" cy="35" r="3" fill="#bae6fd" />
                  <circle cx="48" cy="45" r="3.5" fill="#38bdf8" />
                  <circle cx="34" cy="62" r="3" fill="#0284c7" />
                  <circle cx="24" cy="50" r="2.5" fill="#38bdf8" />
                  <circle cx="44" cy="72" r="3" fill="#7dd3fc" />
                </svg>

                {/* Left Sparks */}
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-2 -left-2 bg-cyan-400/20 text-cyan-300 p-1 rounded-full border border-cyan-400/40"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </motion.div>
              </div>

              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-bold tracking-wider text-cyan-300 uppercase shadow-sm">
                <Shield className="w-3 h-3 text-cyan-400" /> Affirmative / Reason
              </div>
            </div>
          </motion.div>

          {/* SPARKS & LIGHTNING IMPACT CENTER */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.4, 0.9, 1.3, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-3 rounded-full bg-gradient-to-r from-cyan-500 via-white to-amber-500 shadow-[0_0_40px_rgba(255,255,255,0.9)] flex items-center justify-center"
            >
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950 fill-slate-950 drop-shadow-md" />
            </motion.div>
            <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase mt-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700">
              VS
            </span>
          </div>

          {/* RIGHT MIND (AMBER / PASSION / OPPOSITION) */}
          <motion.div
            initial={{ x: 160, opacity: 0 }}
            animate={{ 
              x: [140, 40, 50, 40],
              y: [0, 6, -6, 0],
              opacity: 1
            }}
            transition={{ 
              x: { duration: 1.2, ease: "easeOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            className="absolute right-1/2 -mr-40 sm:-mr-48 z-10 flex flex-col items-center"
          >
            <div className="relative group">
              {/* Amber Glow Aura */}
              <div className="absolute -inset-4 bg-amber-500/30 rounded-full blur-xl animate-pulse" />
              
              {/* Right Mind Brain Container */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-bl from-amber-950/90 via-slate-900 to-orange-950/80 border-2 border-amber-400/80 p-3 shadow-[0_0_35px_rgba(245,158,11,0.4)] flex items-center justify-center backdrop-blur-md">
                {/* Stylized Right Mind SVG Graphic */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400 fill-current drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                  {/* Right Hemisphere stylized neural paths */}
                  <path d="M 50 15 C 68 15 82 28 82 45 C 82 55 76 64 72 72 C 68 80 60 85 50 85 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 1" />
                  <path d="M 70 35 C 62 30 54 38 52 45 C 50 52 58 60 66 62" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                  <path d="M 76 50 C 68 48 62 56 54 54" fill="none" stroke="#fde68a" strokeWidth="2" />
                  <circle cx="70" cy="35" r="3" fill="#fef3c7" />
                  <circle cx="52" cy="45" r="3.5" fill="#f59e0b" />
                  <circle cx="66" cy="62" r="3" fill="#d97706" />
                  <circle cx="76" cy="50" r="2.5" fill="#f59e0b" />
                  <circle cx="56" cy="72" r="3" fill="#fde68a" />
                </svg>

                {/* Right Sparks */}
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="absolute -top-2 -right-2 bg-amber-400/20 text-amber-300 p-1 rounded-full border border-amber-400/40"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                </motion.div>
              </div>

              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-[11px] font-bold tracking-wider text-amber-300 uppercase shadow-sm">
                <Flame className="w-3 h-3 text-amber-400" /> Opposition / Critiques
              </div>
            </div>
          </motion.div>

        </div>

        {/* HERO TITLE & EMBLEM */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4 max-w-3xl"
        >
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-cyan-950/50">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>WELCOME TO CLASH OF MINDS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {/* Main Tournament Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
            CLASH OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-amber-400">MINDS</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Where intellect confronts conviction. Select your debate track, unlock secret motions, and defend your perspective on the grand stage.
          </p>

          {/* Key Metrics / Features Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>General Track: 20 Motions</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Technical Track: 20 Motions</span>
            </div>
          </div>
        </motion.div>

        {/* ENTER ACTION BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 sm:mt-10"
        >
          <button
            onClick={handleEnterClick}
            id="enter-arena-button"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-amber-500 text-slate-950 text-base sm:text-lg font-extrabold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(14,165,233,0.5)] hover:shadow-[0_0_55px_rgba(245,158,11,0.7)] cursor-pointer"
          >
            {/* Glow ring */}
            <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-amber-400 opacity-75 blur group-hover:opacity-100 transition duration-300" />
            
            <span className="relative z-10 flex items-center gap-2.5 font-black text-slate-950">
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
              ENTER THE ARENA
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <p className="mt-3 text-xs text-slate-500 font-medium">
            Press Enter to select your debate category & unlock numbers
          </p>
        </motion.div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-slate-900/80 text-xs text-slate-500">
        Clash of Minds Debate Platform • Dual-Track Motion Selector System
      </footer>
    </div>
  );
}
