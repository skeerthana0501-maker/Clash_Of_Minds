import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Shield, Flame, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CoinTossModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoinTossModal({ isOpen, onClose }: CoinTossModalProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [rotations, setRotations] = useState(0);

  if (!isOpen) return null;

  const handleFlip = () => {
    soundManager.playClick();
    setIsFlipping(true);
    const newResult: 'heads' | 'tails' = Math.random() > 0.5 ? 'heads' : 'tails';
    const extraRotations = 1800 + (newResult === 'heads' ? 0 : 180);
    setRotations((prev) => prev + extraRotations);

    setTimeout(() => {
      setResult(newResult);
      setIsFlipping(false);
      soundManager.playBell();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">FAIR ALLOCATION TOSS</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">
          Team Stance Coin Flip
        </h3>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Heads assigns Affirmative (Proposition). Tails assigns Opposition.
        </p>

        {/* 3D Coin Canvas */}
        <div className="h-44 flex items-center justify-center relative perspective-1000 my-4">
          <motion.div
            animate={{ rotateY: rotations }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-32 h-32 rounded-full border-4 border-amber-400/90 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.5)] flex items-center justify-center text-slate-950 font-black text-2xl select-none"
          >
            {result === 'tails' ? (
              <div className="flex flex-col items-center">
                <Flame className="w-8 h-8 text-slate-950" />
                <span className="text-xs font-extrabold tracking-wider uppercase">OPPOSITION</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-slate-950" />
                <span className="text-xs font-extrabold tracking-wider uppercase">AFFIRMATIVE</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Outcome Display */}
        <div className="my-4 min-h-[50px] flex items-center justify-center">
          {isFlipping ? (
            <span className="text-sm font-semibold text-amber-300 animate-pulse">
              Flipping Coin in the Air...
            </span>
          ) : result ? (
            <div className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700">
              <p className="text-sm font-bold text-white">
                Result: <span className="text-amber-400 uppercase">{result === 'heads' ? 'HEADS' : 'TAILS'}</span>
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                {result === 'heads'
                  ? 'Team 1 takes Affirmative • Team 2 takes Opposition'
                  : 'Team 1 takes Opposition • Team 2 takes Affirmative'}
              </p>
            </div>
          ) : (
            <span className="text-xs text-slate-400">Press the button to toss the coin</span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleFlip}
          disabled={isFlipping}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/30 transition-all cursor-pointer disabled:opacity-50"
        >
          {isFlipping ? 'Tossing...' : result ? 'Toss Again' : 'Toss the Coin'}
        </button>
      </motion.div>
    </div>
  );
}
