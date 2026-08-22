import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Globe2, Cpu, Sparkles, Shuffle, ArrowRight, RotateCcw, X, Zap, Award } from 'lucide-react';
import { CategoryType } from '../types';
import { soundManager } from '../utils/audio';

interface CategoryRandomDrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: CategoryType) => void;
}

export function CategoryRandomDrawModal({
  isOpen,
  onClose,
  onSelectCategory,
}: CategoryRandomDrawModalProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [highlightedCategory, setHighlightedCategory] = useState<CategoryType>('general');
  const [finalSelectedCategory, setFinalSelectedCategory] = useState<CategoryType | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Trigger confetti burst on reveal
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#f59e0b', '#38bdf8', '#fbbf24', '#ffffff']
      });
    } catch {
      // safe ignore
    }
  };

  const startDraw = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setFinalSelectedCategory(null);
    soundManager.playClick();

    // Determine target randomly (50% chance each)
    const targetCategory: CategoryType = Math.random() < 0.5 ? 'general' : 'technical';

    // Sequence of interval steps for suspenseful deceleration (starts fast, slows down)
    const steps = [
      70, 70, 70, 70, 80, 80, 90, 90, 110, 130, 160, 200, 260, 340, 450
    ];

    let currentStep = 0;
    let currentCat: CategoryType = highlightedCategory;

    const runStep = () => {
      currentCat = currentCat === 'general' ? 'technical' : 'general';
      setHighlightedCategory(currentCat);
      soundManager.playTick(currentCat === 'general' ? 750 : 550);

      currentStep++;
      if (currentStep < steps.length) {
        intervalRef.current = window.setTimeout(runStep, steps[currentStep]);
      } else {
        // Final landing step
        setHighlightedCategory(targetCategory);
        setFinalSelectedCategory(targetCategory);
        setIsDrawing(false);
        soundManager.playRevealFanfare();
        fireConfetti();
      }
    };

    intervalRef.current = window.setTimeout(runStep, steps[0]);
  };

  // Start automatic draw when opened if not yet decided
  useEffect(() => {
    if (isOpen) {
      setFinalSelectedCategory(null);
      // Small timeout to allow modal animation to complete
      const timer = setTimeout(() => {
        startDraw();
      }, 400);
      return () => clearTimeout(timer);
    } else {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      setIsDrawing(false);
      setFinalSelectedCategory(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isGeneralWinning = (finalSelectedCategory || highlightedCategory) === 'general';
  const isTechWinning = (finalSelectedCategory || highlightedCategory) === 'technical';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* MODAL HEADER */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-md">
              <Shuffle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-wide">
                  Random Track Selector
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
                  General vs Technical
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Randomized lottery to assign the category for this debate round.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center">
          {/* Suspense Status Banner */}
          <div className="mb-6 text-center">
            {isDrawing ? (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-black tracking-widest uppercase shadow-md"
              >
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                <span>Spinning Random Draw...</span>
              </motion.div>
            ) : finalSelectedCategory ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-lg ${
                  finalSelectedCategory === 'general'
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-cyan-500/20'
                    : 'bg-amber-500/20 border border-amber-400 text-amber-300 shadow-amber-500/20'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Track Selected by Random Draw!</span>
              </motion.div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
                <span>Click "Draw Again" to randomize</span>
              </div>
            )}
          </div>

          {/* DUAL CATEGORY CARDS SHOWDOWN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl mb-8">
            {/* GENERAL TRACK POD */}
            <div
              className={`relative rounded-2xl p-6 border-2 transition-all duration-200 flex flex-col items-center text-center overflow-hidden ${
                (isDrawing && highlightedCategory === 'general') || finalSelectedCategory === 'general'
                  ? 'bg-gradient-to-b from-cyan-950/90 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/30 scale-102 ring-4 ring-cyan-500/20'
                  : 'bg-slate-950/70 border-slate-800 opacity-55 scale-98'
              }`}
            >
              {finalSelectedCategory === 'general' && (
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                  Winner
                </div>
              )}

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                  isGeneralWinning
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/50 scale-110'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Globe2 className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">
                General Track
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Commerce, Society, Student Life & Philosophy
              </p>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                20 Motions (01–20)
              </span>
            </div>

            {/* TECHNICAL TRACK POD */}
            <div
              className={`relative rounded-2xl p-6 border-2 transition-all duration-200 flex flex-col items-center text-center overflow-hidden ${
                (isDrawing && highlightedCategory === 'technical') || finalSelectedCategory === 'technical'
                  ? 'bg-gradient-to-b from-amber-950/90 to-slate-900 border-amber-400 shadow-xl shadow-amber-500/30 scale-102 ring-4 ring-amber-500/20'
                  : 'bg-slate-950/70 border-slate-800 opacity-55 scale-98'
              }`}
            >
              {finalSelectedCategory === 'technical' && (
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                  Winner
                </div>
              )}

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                  isTechWinning
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/50 scale-110'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Cpu className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">
                Technical Track
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                AI Engineering, Cloud, Cyber & IT Careers
              </p>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                20 Motions (01–20)
              </span>
            </div>
          </div>

          {/* ACTION CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
            {finalSelectedCategory ? (
              <>
                <button
                  onClick={() => onSelectCategory(finalSelectedCategory)}
                  id="confirm-random-category-btn"
                  className={`flex-1 w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-98 ${
                    finalSelectedCategory === 'general'
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/40'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/40'
                  }`}
                >
                  <span>Proceed to {finalSelectedCategory === 'general' ? 'General' : 'Technical'} Track</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={startDraw}
                  disabled={isDrawing}
                  id="redraw-category-btn"
                  className="px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Draw again"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-Draw</span>
                </button>
              </>
            ) : (
              <button
                onClick={startDraw}
                disabled={isDrawing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
              >
                <Shuffle className="w-4 h-4 animate-pulse" />
                <span>{isDrawing ? 'Spinning Track Roulette...' : 'Spin Random Track'}</span>
              </button>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
          Fair 50/50 randomized track selector for unbiased debate topic allocations
        </div>
      </motion.div>
    </div>
  );
}
