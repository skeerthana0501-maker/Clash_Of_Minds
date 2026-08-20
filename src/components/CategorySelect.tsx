import { motion } from 'motion/react';
import { Globe2, Cpu, ArrowLeft, Sparkles, Zap, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { CategoryType } from '../types';
import { soundManager } from '../utils/audio';

interface CategorySelectProps {
  onSelectCategory: (cat: CategoryType) => void;
  onBack: () => void;
  generalUsedCount: number;
  technicalUsedCount: number;
}

export function CategorySelect({
  onSelectCategory,
  onBack,
  generalUsedCount,
  technicalUsedCount,
}: CategorySelectProps) {
  const handleSelect = (category: CategoryType) => {
    soundManager.playClick();
    onSelectCategory(category);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,rgba(56,189,248,0.12),transparent)] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <button
          onClick={onBack}
          id="back-to-intro-btn"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all text-sm font-medium shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Intro</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Track Selection Phase</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 py-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            Step 1 of 2
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">CATEGORY</span>
          </h2>
          
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Select your preferred debate track to unlock the 20 numbered secret motion slots.
          </p>
        </motion.div>

        {/* Dual Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
          
          {/* GENERAL CATEGORY CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border-2 border-cyan-500/30 hover:border-cyan-400/80 p-7 sm:p-8 flex flex-col justify-between shadow-xl shadow-cyan-950/30 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />

            <div>
              {/* Card Header Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shadow-lg">
                  <Globe2 className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wider uppercase">
                  20 Topics Total
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                General
              </h3>
              <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                Classic high-stakes motions spanning e-commerce, student life, social psychology, money vs happiness, climate science, and digital ethics.
              </p>

              {/* Sample Topics Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Commerce & Retail', 'Student & College Life', 'Wealth & Values', 'Privacy vs Fame', 'Climate & Society'].map((tag) => (
                  <span key={tag} className="text-[11px] font-semibold bg-slate-800/80 text-cyan-200/90 px-2.5 py-1 rounded-lg border border-slate-700/60">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Revealed Status Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  {generalUsedCount} / 20 Motions Drawn
                </span>
                <span className="text-cyan-400/80 font-medium">Standard Parliamentary Format</span>
              </div>
            </div>

            {/* Selection Button */}
            <div className="mt-8">
              <button
                onClick={() => handleSelect('general')}
                id="select-general-category-btn"
                className="w-full py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-200 cursor-pointer active:scale-98"
              >
                <BookOpen className="w-4 h-4 text-slate-950" />
                Select General Track
              </button>
            </div>
          </motion.div>

          {/* TECHNICAL CATEGORY CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border-2 border-amber-500/30 hover:border-amber-400/80 p-7 sm:p-8 flex flex-col justify-between shadow-xl shadow-amber-950/30 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />

            <div>
              {/* Card Header Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-lg">
                  <Cpu className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
                  20 Topics Total
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                Technical
              </h3>
              <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                Cutting-edge IT debates covering cloud vs on-prem, AI coding agents, cybersecurity, developer career paths, and emerging tech.
              </p>

              {/* Sample Topics Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Cloud & On-Prem', 'AI vs Developers', 'Cybersecurity & 2FA', 'IT Careers & Startups', 'Web vs Mobile'].map((tag) => (
                  <span key={tag} className="text-[11px] font-semibold bg-slate-800/80 text-amber-200/90 px-2.5 py-1 rounded-lg border border-slate-700/60">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Revealed Status Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {technicalUsedCount} / 20 Motions Drawn
                </span>
                <span className="text-amber-400/80 font-medium">Tech & Innovation Forum</span>
              </div>
            </div>

            {/* Selection Button */}
            <div className="mt-8">
              <button
                onClick={() => handleSelect('technical')}
                id="select-technical-category-btn"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:shadow-amber-400/50 transition-all duration-200 cursor-pointer active:scale-98"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                Select Technical Track
              </button>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-slate-900/80 text-xs text-slate-500">
        Click any category above to access its 20 debate topic cards
      </footer>
    </div>
  );
}
