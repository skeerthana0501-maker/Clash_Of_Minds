import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Globe2, 
  Cpu, 
  Shuffle, 
  RotateCcw, 
  Edit3, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { CategoryType, DebateTopic } from '../types';
import { soundManager } from '../utils/audio';

interface TopicGridProps {
  category: CategoryType;
  topics: DebateTopic[];
  onSelectTopic: (topic: DebateTopic) => void;
  onBack: () => void;
  onSwitchCategory: (cat: CategoryType) => void;
  onOpenEditor: () => void;
  onResetUsed: () => void;
}

export function TopicGrid({
  category,
  topics,
  onSelectTopic,
  onBack,
  onSwitchCategory,
  onOpenEditor,
  onResetUsed,
}: TopicGridProps) {
  const [isShuffling, setIsShuffling] = useState(false);
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(null);

  const isGeneral = category === 'general';
  const categoryTitle = isGeneral ? 'General Debate Track' : 'Technical Debate Track';
  const themeColor = isGeneral ? 'cyan' : 'amber';
  const CategoryIcon = isGeneral ? Globe2 : Cpu;

  const usedCount = topics.filter((t) => t.isUsed).length;

  const handlePickRandom = () => {
    soundManager.playClick();
    setIsShuffling(true);
    let count = 0;
    const maxSteps = 15;
    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 15) + 1;
      setHighlightedNumber(randomNum);
      count++;
      if (count >= maxSteps) {
        clearInterval(interval);
        setIsShuffling(false);
        const availableTopics = topics.filter((t) => !t.isUsed);
        const targetTopic = availableTopics.length > 0
          ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
          : topics[randomNum - 1];
        setHighlightedNumber(targetTopic.number);
        setTimeout(() => {
          setHighlightedNumber(null);
          onSelectTopic(targetTopic);
        }, 500);
      }
    }, 80);
  };

  const handleCardClick = (topic: DebateTopic) => {
    soundManager.playClick();
    onSelectTopic(topic);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Dynamic Background Glow */}
      <div 
        className={`absolute top-0 inset-x-0 h-96 pointer-events-none ${
          isGeneral 
            ? 'bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(6,182,212,0.15),transparent)]' 
            : 'bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.15),transparent)]'
        }`} 
      />

      {/* Top Header & Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-900/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            id="back-to-categories-btn"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Change Track</span>
          </button>

          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${isGeneral ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white">{categoryTitle}</h1>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${isGeneral ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-amber-950 text-amber-300 border border-amber-500/40'}`}>
                  {topics.length} Numbers
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {usedCount} of {topics.length} revealed • Pick any number to unlock its motion
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls: Switch Track, Random Pick, Edit, Reset */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Quick Track Switcher */}
          <div className="inline-flex rounded-xl bg-slate-900/90 p-1 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => onSwitchCategory('general')}
              id="switch-general-track-btn"
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                isGeneral
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              General (20)
            </button>
            <button
              onClick={() => onSwitchCategory('technical')}
              id="switch-technical-track-btn"
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !isGeneral
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Technical (20)
            </button>
          </div>

          {/* Random Draw Button */}
          <button
            onClick={handlePickRandom}
            disabled={isShuffling}
            id="random-pick-topic-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            title="Randomly choose an unrevealed number"
          >
            <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">Random Draw</span>
          </button>

          {/* Custom Topics Editor */}
          <button
            onClick={onOpenEditor}
            id="open-topic-editor-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
            title="View or Customize Motion list"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Edit Topics</span>
          </button>

          {/* Reset Used */}
          {usedCount > 0 && (
            <button
              onClick={onResetUsed}
              id="reset-used-topics-btn"
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/50 text-slate-400 hover:text-rose-300 text-xs transition-all cursor-pointer"
              title="Reset drawn status for this category"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Grid View */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col justify-center">
        
        {/* Instruction Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 mb-2">
            <Sparkles className={`w-3.5 h-3.5 ${isGeneral ? 'text-cyan-400' : 'text-amber-400'}`} />
            <span>Select any numbered card below to reveal its debate motion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Choose Your Number (1 to 20)
          </h2>
        </div>

        {/* 20 NUMBERED BUTTONS GRID (5x4 on large, 4x5 on medium, 2x10 on small) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3.5 sm:gap-5 w-full max-w-5xl mx-auto">
          {topics.map((topic) => {
            const isHighlighted = highlightedNumber === topic.number;
            const formattedNumber = topic.number < 10 ? `0${topic.number}` : `${topic.number}`;

            return (
              <motion.button
                key={topic.id}
                id={`topic-number-button-${topic.number}`}
                onClick={() => handleCardClick(topic)}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                className={`group relative h-32 sm:h-36 rounded-2xl p-4 flex flex-col justify-between items-center text-center transition-all duration-300 border-2 cursor-pointer ${
                  isHighlighted
                    ? 'ring-4 ring-cyan-400 border-white bg-cyan-900/80 scale-105 shadow-[0_0_30px_rgba(6,182,212,0.8)]'
                    : topic.isUsed
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-80 hover:opacity-100 hover:border-slate-700'
                    : isGeneral
                    ? 'bg-gradient-to-b from-slate-900/95 to-slate-950 border-cyan-500/30 hover:border-cyan-400 shadow-lg shadow-cyan-950/20 hover:shadow-cyan-500/20'
                    : 'bg-gradient-to-b from-slate-900/95 to-slate-950 border-amber-500/30 hover:border-amber-400 shadow-lg shadow-amber-950/20 hover:shadow-amber-500/20'
                }`}
              >
                {/* Glow Overlay */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    isGeneral ? 'bg-cyan-500/5' : 'bg-amber-500/5'
                  }`} 
                />

                {/* Top Mini Header: Track Tag or Status */}
                <div className="w-full flex items-center justify-between text-[11px]">
                  <span className={`font-mono font-bold ${isGeneral ? 'text-cyan-400/80' : 'text-amber-400/80'}`}>
                    SLOT #{formattedNumber}
                  </span>

                  {topic.isUsed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Drawn
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                      Secret
                    </span>
                  )}
                </div>

                {/* Central Number Display */}
                <div className="my-auto flex flex-col items-center">
                  <span className={`text-4xl sm:text-5xl font-black tracking-tight transition-colors ${
                    topic.isUsed
                      ? 'text-slate-400 group-hover:text-slate-200'
                      : isGeneral
                      ? 'text-white group-hover:text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                      : 'text-white group-hover:text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                  }`}>
                    {formattedNumber}
                  </span>
                </div>

                {/* Bottom Bar: Action Hint */}
                <div className="w-full pt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-slate-200 transition-colors">
                  <span className="truncate max-w-[80px] font-medium text-slate-400">
                    {topic.tag}
                  </span>
                  <span className={`font-semibold flex items-center gap-0.5 ${isGeneral ? 'text-cyan-400' : 'text-amber-400'}`}>
                    Reveal <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom Helper Info */}
        <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-600" />
          <span>The motion remains concealed until the contestant confirms their number selection.</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-slate-900/80 text-xs text-slate-500">
        Clash of Minds Debate • {categoryTitle}
      </footer>
    </div>
  );
}
