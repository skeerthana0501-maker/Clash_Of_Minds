import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  Shield, 
  Flame, 
  Coins, 
  CheckCircle2, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Share2,
  Edit2,
  Trophy
} from 'lucide-react';
import { DebateTopic, CategoryType } from '../types';
import { soundManager } from '../utils/audio';
import { DebateTimer } from './DebateTimer';
import { CoinTossModal } from './CoinTossModal';

interface TopicRevealViewProps {
  topic: DebateTopic;
  category: CategoryType;
  allTopics: DebateTopic[];
  onBack: () => void;
  onSelectTopic: (topic: DebateTopic) => void;
  onToggleUsed: (topicId: string) => void;
  onUpdateTopicMotion: (topicId: string, newMotion: string) => void;
  onOpenEvaluator?: () => void;
}

export function TopicRevealView({
  topic,
  category,
  allTopics,
  onBack,
  onSelectTopic,
  onToggleUsed,
  onUpdateTopicMotion,
  onOpenEvaluator,
}: TopicRevealViewProps) {
  const [copied, setCopied] = useState(false);
  const [showCoinToss, setShowCoinToss] = useState(false);
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [inlineMotion, setInlineMotion] = useState(topic.motion);

  const isGeneral = category === 'general';
  const themeColor = topic.theme?.accent || (isGeneral ? 'cyan' : 'amber');

  // Trigger celebration on initial mount of the revealed topic
  useEffect(() => {
    soundManager.playRevealFanfare();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: isGeneral ? ['#06b6d4', '#38bdf8', '#ffffff'] : ['#f59e0b', '#fbbf24', '#ffffff'],
      });
    } catch {
      // safe ignore
    }
  }, [topic.id, isGeneral]);

  useEffect(() => {
    setInlineMotion(topic.motion);
  }, [topic.motion]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`CLASH OF MINDS (${category.toUpperCase()} #${topic.number}): ${topic.motion}`);
    setCopied(true);
    soundManager.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrev = () => {
    const total = allTopics.length || 20;
    const prevNum = topic.number > 1 ? topic.number - 1 : total;
    const prevTopic = allTopics.find((t) => t.number === prevNum);
    if (prevTopic) {
      soundManager.playClick();
      onSelectTopic(prevTopic);
    }
  };

  const handleNext = () => {
    const total = allTopics.length || 20;
    const nextNum = topic.number < total ? topic.number + 1 : 1;
    const nextTopic = allTopics.find((t) => t.number === nextNum);
    if (nextTopic) {
      soundManager.playClick();
      onSelectTopic(nextTopic);
    }
  };

  const handleSaveInline = () => {
    onUpdateTopicMotion(topic.id, inlineMotion);
    setIsEditingInline(false);
    soundManager.playClick();
  };

  const formattedNumber = topic.number < 10 ? `0${topic.number}` : `${topic.number}`;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Dynamic theme ambient background glow & gradient backdrop */}
      <div 
        className={`absolute inset-0 pointer-events-none opacity-60 bg-gradient-to-br ${
          topic.theme?.gradient || (isGeneral ? 'from-cyan-950/60 via-slate-950 to-blue-950/60' : 'from-amber-950/60 via-slate-950 to-orange-950/60')
        }`} 
      />
      <div 
        className="absolute top-0 inset-x-0 h-[480px] pointer-events-none opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${topic.theme?.glow || (isGeneral ? 'rgba(6,182,212,0.3)' : 'rgba(245,158,11,0.3)')}, transparent 70%)`
        }}
      />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4 border-b border-slate-900">
        <button
          onClick={onBack}
          id="back-to-numbers-grid-btn"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Numbers</span>
        </button>

        {/* Previous / Next slot navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            id="prev-topic-btn"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Previous Topic Number"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-300 px-2">
            SLOT #{formattedNumber} / {allTopics.length || 20}
          </span>
          <button
            onClick={handleNext}
            id="next-topic-btn"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Next Topic Number"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Side Allocation & Copy Actions */}
        <div className="flex items-center gap-2">
          {onOpenEvaluator && (
            <button
              onClick={onOpenEvaluator}
              id="reveal-evaluator-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/50 text-amber-300 text-xs font-bold transition cursor-pointer shadow-sm"
              title="Evaluate Best Speaker (7 Criteria)"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Score Speaker</span>
            </button>
          )}

          <button
            onClick={() => setShowCoinToss(true)}
            id="open-coin-toss-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-semibold cursor-pointer"
            title="Flip Coin for Team Sides"
          >
            <Coins className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Coin Toss</span>
          </button>

          <button
            onClick={handleCopy}
            id="copy-topic-text-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
            title="Copy Motion to Clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Motion'}</span>
          </button>
        </div>
      </header>

      {/* Main Reveal Stage */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full flex flex-col justify-center">
        
        {/* Reveal Card */}
        <motion.div
          key={topic.id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`relative w-full rounded-3xl p-6 sm:p-10 border-2 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950 shadow-2xl ${
            isGeneral
              ? 'border-cyan-500/40 shadow-cyan-950/40'
              : 'border-amber-500/40 shadow-amber-950/40'
          }`}
        >
          {/* Card Top Meta Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                isGeneral 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : 'bg-amber-500 text-slate-950 shadow-md'
              }`}>
                {isGeneral ? 'General Track' : 'Technical Track'}
              </span>

              <span className="px-3 py-1 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-bold text-slate-300">
                {topic.tag}
              </span>
            </div>

            {/* Status & Edit Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleUsed(topic.id)}
                id="toggle-topic-used-btn"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  topic.isUsed
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{topic.isUsed ? 'Marked as Debated' : 'Mark as Debated'}</span>
              </button>

              <button
                onClick={() => setIsEditingInline(!isEditingInline)}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                title="Edit Motion Text"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Number & Motion Heading */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-3">
              <span className={`font-mono text-3xl sm:text-5xl font-black ${
                isGeneral ? 'text-cyan-400' : 'text-amber-400'
              }`}>
                #{formattedNumber}
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400">
                Official Debate Motion
              </span>
            </div>

            {isEditingInline ? (
              <div className="space-y-3">
                <textarea
                  value={inlineMotion}
                  onChange={(e) => setInlineMotion(e.target.value)}
                  className="w-full text-xl sm:text-2xl font-extrabold text-white bg-slate-950 border border-cyan-500/60 p-4 rounded-2xl resize-none focus:outline-none"
                  rows={3}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveInline}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setInlineMotion(topic.motion);
                      setIsEditingInline(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                "{topic.motion}"
              </h2>
            )}

            {topic.context && (
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl border-l-2 border-slate-700 pl-4 py-0.5">
                <span className="font-semibold text-slate-400">Context: </span>
                {topic.context}
              </p>
            )}
          </div>

          {/* Stances Grid: Affirmative vs Opposition */}
          {(topic.forStance || topic.againstStance) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {/* Affirmative Stance Card */}
              {topic.forStance && (
                <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-300 font-black text-xs uppercase tracking-wider mb-2">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      Proposition (Affirmative) Angle
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {topic.forStance}
                    </p>
                  </div>
                </div>
              )}

              {/* Opposition Stance Card */}
              {topic.againstStance && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider mb-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      Opposition (Negative) Angle
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {topic.againstStance}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Integrated Debate Timer */}
          <div className="mt-6">
            <DebateTimer categoryColor={isGeneral ? 'cyan' : 'amber'} />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-slate-900/80 text-xs text-slate-500">
        Clash of Minds Debate • Topic #{formattedNumber} • {category.toUpperCase()}
      </footer>

      {/* Coin Toss Modal */}
      <CoinTossModal
        isOpen={showCoinToss}
        onClose={() => setShowCoinToss(false)}
      />
    </div>
  );
}
