import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  User, 
  Trophy, 
  Save, 
  RotateCcw, 
  Download, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  FileSpreadsheet, 
  CheckCircle,
  Medal,
  Sparkles,
  Search,
  Scale
} from 'lucide-react';
import { EVALUATION_CRITERIA, ParticipantEvaluation, MAX_TOTAL_SCORE } from '../data/evaluationCriteria';
import { soundManager } from '../utils/audio';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopicMotion?: string;
}

const STORAGE_KEY = 'clash_of_minds_evaluations_v1';

export function EvaluationModal({ isOpen, onClose, defaultTopicMotion }: EvaluationModalProps) {
  // Saved evaluations list
  const [evaluations, setEvaluations] = useState<ParticipantEvaluation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Current participant scoring form
  const [participantName, setParticipantName] = useState('');
  const [teamOrSide, setTeamOrSide] = useState<'Affirmative / For' | 'Opposition / Against' | 'Individual Speaker'>('Individual Speaker');
  const [topicMotion, setTopicMotion] = useState(defaultTopicMotion || '');
  const [roundName, setRoundName] = useState('Championship Round');
  const [notes, setNotes] = useState('');
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    EVALUATION_CRITERIA.forEach((c) => {
      initial[c.id] = 7; // default standard benchmark 7/10
    });
    return initial;
  });

  const [activeTab, setActiveTab] = useState<'score_sheet' | 'leaderboard' | 'criteria_guide'>('score_sheet');
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
    } catch (e) {
      console.error(e);
    }
  }, [evaluations]);

  useEffect(() => {
    if (defaultTopicMotion && !topicMotion) {
      setTopicMotion(defaultTopicMotion);
    }
  }, [defaultTopicMotion]);

  if (!isOpen) return null;

  // Calculate live sum
  const currentTotalScore = (Object.values(scores) as number[]).reduce((a: number, b: number) => a + Number(b || 0), 0);
  const currentPercentage = Math.round((currentTotalScore / MAX_TOTAL_SCORE) * 100);

  const handleScoreChange = (criterionId: string, val: number) => {
    const clamped = Math.max(0, Math.min(10, val));
    setScores((prev) => ({
      ...prev,
      [criterionId]: clamped
    }));
  };

  const handleResetForm = () => {
    setParticipantName('');
    setNotes('');
    setEditingId(null);
    const initial: Record<string, number> = {};
    EVALUATION_CRITERIA.forEach((c) => {
      initial[c.id] = 7;
    });
    setScores(initial);
  };

  const handleSaveEvaluation = (e: FormEvent) => {
    e.preventDefault();
    if (!participantName.trim()) {
      alert('Please enter the participant name to record evaluation.');
      return;
    }

    soundManager.playRevealFanfare();

    if (editingId) {
      // Update existing
      setEvaluations((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                participantName: participantName.trim(),
                teamOrSide,
                topicMotion,
                roundName,
                scores,
                notes,
                createdAt: Date.now()
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      // Add new
      const newEntry: ParticipantEvaluation = {
        id: `eval_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        participantName: participantName.trim(),
        teamOrSide,
        topicMotion,
        roundName,
        scores,
        notes,
        createdAt: Date.now()
      };
      setEvaluations((prev) => [newEntry, ...prev]);
    }

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
    handleResetForm();
  };

  const handleEditEntry = (entry: ParticipantEvaluation) => {
    setEditingId(entry.id);
    setParticipantName(entry.participantName);
    setTeamOrSide(entry.teamOrSide);
    setTopicMotion(entry.topicMotion || '');
    setRoundName(entry.roundName || 'Championship Round');
    setScores(entry.scores);
    setNotes(entry.notes || '');
    setActiveTab('score_sheet');
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Delete this participant evaluation record?')) {
      setEvaluations((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) handleResetForm();
    }
  };

  const handleExportCSV = () => {
    if (evaluations.length === 0) {
      alert('No evaluation records available to export.');
      return;
    }

    const headers = [
      'Participant Name',
      'Team / Side',
      'Topic / Motion',
      'Round',
      ...EVALUATION_CRITERIA.map((c) => `"${c.name} (Max ${c.maxScore})"`),
      `"Total Score (Max ${MAX_TOTAL_SCORE})"`,
      'Percentage',
      'Judge Notes',
      'Timestamp'
    ];

    const rows = evaluations.map((item) => {
      const total = (Object.values(item.scores) as number[]).reduce((a: number, b: number) => a + Number(b || 0), 0);
      const pct = Math.round((total / MAX_TOTAL_SCORE) * 100);
      const criterionScores = EVALUATION_CRITERIA.map((c) => item.scores[c.id] || 0);

      return [
        `"${item.participantName.replace(/"/g, '""')}"`,
        `"${item.teamOrSide}"`,
        `"${(item.topicMotion || '').replace(/"/g, '""')}"`,
        `"${(item.roundName || '').replace(/"/g, '""')}"`,
        ...criterionScores,
        total,
        `${pct}%`,
        `"${(item.notes || '').replace(/"/g, '""')}"`,
        `"${new Date(item.createdAt).toLocaleString()}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `clash_of_minds_speaker_evaluations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered & Ranked Leaderboard
  const sortedEvaluations = [...evaluations].sort((a, b) => {
    const totalA = (Object.values(a.scores) as number[]).reduce((acc: number, cur: number) => acc + Number(cur || 0), 0);
    const totalB = (Object.values(b.scores) as number[]).reduce((acc: number, cur: number) => acc + Number(cur || 0), 0);
    return Number(totalB) - Number(totalA);
  });

  const filteredLeaderboard = sortedEvaluations.filter(
    (item) =>
      item.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teamOrSide.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.topicMotion && item.topicMotion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* MODAL HEADER */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-wide">
                  Best Speaker Evaluation Rubric
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                  7 Core Adjudication Criteria
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Independent 70-point individual speaker scorecard & real-time championship leaderboard.
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('score_sheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'score_sheet'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {editingId ? 'Edit Scorecard' : 'Scoring Sheet'}
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'leaderboard'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Leaderboard ({evaluations.length})
            </button>

            <button
              onClick={() => setActiveTab('criteria_guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'criteria_guide'
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Criteria Guide
            </button>

            <button
              onClick={onClose}
              className="ml-2 text-slate-400 hover:text-white text-lg font-bold px-2 py-0.5 rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
        </div>

        {/* NOTIFICATION TOAST */}
        {saveToast && (
          <div className="bg-emerald-500 text-slate-950 text-xs font-bold px-4 py-2 flex items-center justify-center gap-2 shadow-lg animate-bounce">
            <CheckCircle className="w-4 h-4" />
            Evaluation successfully saved to Championship Leaderboard!
          </div>
        )}

        {/* MODAL BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* TAB 1: INDIVIDUAL PARTICIPANT SCORING SHEET */}
          {activeTab === 'score_sheet' && (
            <form onSubmit={handleSaveEvaluation} className="space-y-6">
              {/* Participant Meta Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    Participant / Speaker Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe, Speaker 1"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    Speaker Role / Side
                  </label>
                  <select
                    value={teamOrSide}
                    onChange={(e) => setTeamOrSide(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  >
                    <option value="Affirmative / For">Affirmative (For Motion)</option>
                    <option value="Opposition / Against">Opposition (Against Motion)</option>
                    <option value="Individual Speaker">Individual Speaker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Tournament Round / Stage
                  </label>
                  <input
                    type="text"
                    value={roundName}
                    onChange={(e) => setRoundName(e.target.value)}
                    placeholder="e.g. Preliminary Round, Finals"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Debated Topic / Motion
                  </label>
                  <input
                    type="text"
                    value={topicMotion}
                    onChange={(e) => setTopicMotion(e.target.value)}
                    placeholder="e.g. Will AI Replace Software Developers in the Future?"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              {/* 7 EVALUATION CRITERIA SCORING TABLE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    7 Standard Speaker Criteria (Scale: 0 to 10 points each)
                  </h3>
                  <span className="text-xs text-slate-400">
                    Benchmark: 1-4 (Emerging) • 5-6 (Average) • 7-8 (Strong) • 9-10 (Exceptional)
                  </span>
                </div>

                <div className="bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-850">
                  {EVALUATION_CRITERIA.map((criterion, idx) => {
                    const score = scores[criterion.id] || 0;
                    const isExpanded = expandedCriterion === criterion.id;

                    return (
                      <div key={criterion.id} className="p-3.5 sm:p-4 transition hover:bg-slate-900/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {/* Criterion Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px] flex items-center justify-center font-bold">
                                {idx + 1}
                              </span>
                              <h4 className="text-sm font-bold text-white">
                                {criterion.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => setExpandedCriterion(isExpanded ? null : criterion.id)}
                                className="text-slate-400 hover:text-cyan-300 text-xs flex items-center gap-0.5 ml-1"
                              >
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 pl-7">
                              {criterion.shortDesc}
                            </p>
                          </div>

                          {/* Quick Score Selector & Numeric Input */}
                          <div className="flex items-center gap-2 sm:gap-3 pl-7 sm:pl-0">
                            {/* Score Slider */}
                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="0.5"
                              value={score}
                              onChange={(e) => handleScoreChange(criterion.id, parseFloat(e.target.value))}
                              className="w-28 sm:w-36 accent-amber-400 cursor-pointer"
                            />

                            {/* Score Pill Box */}
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.5"
                                value={score}
                                onChange={(e) => handleScoreChange(criterion.id, parseFloat(e.target.value) || 0)}
                                className="w-14 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-mono font-bold text-amber-300 text-sm focus:border-amber-400 focus:outline-none"
                              />
                              <span className="text-xs text-slate-500 font-mono">/ 10</span>
                            </div>
                          </div>
                        </div>

                        {/* Expandable Benchmark & Guidelines */}
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 pl-7 pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5"
                          >
                            <p className="text-slate-400 italic">{criterion.fullDesc}</p>
                            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 space-y-1">
                              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                                Key Observable Indicators:
                              </span>
                              <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                                {criterion.indicators.map((ind, i) => (
                                  <li key={i}>{ind}</li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* JUDGE NOTES */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Adjudicator Commendations & Constructive Feedback
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Note specific impactful arguments, memorable analogies, or areas for vocal/logical improvement..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* BOTTOM SCORE SUMMARY & ACTIONS */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total Score</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {currentTotalScore} <span className="text-xs text-slate-500 font-normal">/ {MAX_TOTAL_SCORE}</span>
                    </span>
                  </div>

                  <div className="text-center bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Aggregate</span>
                    <span className="text-xl font-bold text-cyan-400 font-mono">
                      {currentPercentage}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold tracking-wider uppercase transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {editingId ? 'Update Evaluation' : 'Record & Save Score'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: BEST SPEAKER CHAMPIONSHIP LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search speakers or motions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleExportCSV}
                    disabled={evaluations.length === 0}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 hover:bg-slate-700 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    Export CSV Scorecard
                  </button>
                  <button
                    onClick={() => {
                      handleResetForm();
                      setActiveTab('score_sheet');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-extrabold transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Evaluation
                  </button>
                </div>
              </div>

              {/* Leaderboard Table */}
              {filteredLeaderboard.length === 0 ? (
                <div className="text-center py-12 bg-slate-950/40 rounded-xl border border-slate-800">
                  <Trophy className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-400">No participant scorecards recorded yet.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the 7-criteria scoring sheet to rank speakers for the "Best Speaker" award.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/90 text-slate-400 uppercase font-bold border-b border-slate-800 text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3 text-center w-12">Rank</th>
                        <th className="p-3">Speaker / Side</th>
                        <th className="p-3 hidden md:table-cell">Motion / Topic</th>
                        <th className="p-3 text-center">Score (Max 70)</th>
                        <th className="p-3 text-center hidden sm:table-cell">Pct</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {filteredLeaderboard.map((item, index) => {
                        const totalScore = (Object.values(item.scores) as number[]).reduce((a: number, b: number) => a + Number(b || 0), 0);
                        const pct = Math.round((totalScore / MAX_TOTAL_SCORE) * 100);

                        let rankBadge = (
                          <span className="font-mono text-slate-400 font-bold">#{index + 1}</span>
                        );
                        if (index === 0) {
                          rankBadge = (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30">
                              🥇
                            </span>
                          );
                        } else if (index === 1) {
                          rankBadge = (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black">
                              🥈
                            </span>
                          );
                        } else if (index === 2) {
                          rankBadge = (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white font-black">
                              🥉
                            </span>
                          );
                        }

                        return (
                          <tr key={item.id} className="hover:bg-slate-900/70 transition">
                            <td className="p-3 text-center">{rankBadge}</td>
                            <td className="p-3">
                              <div className="font-bold text-white text-sm">{item.participantName}</div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                <span className={`px-1.5 py-0.2 rounded font-medium ${
                                  item.teamOrSide.includes('Affirmative') 
                                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' 
                                    : item.teamOrSide.includes('Opposition')
                                    ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                    : 'bg-slate-800 text-slate-300'
                                }`}>
                                  {item.teamOrSide}
                                </span>
                                {item.roundName && <span className="text-slate-500">• {item.roundName}</span>}
                              </div>
                            </td>
                            <td className="p-3 hidden md:table-cell text-slate-300 max-w-xs truncate">
                              {item.topicMotion || <span className="text-slate-600 italic">No topic specified</span>}
                            </td>
                            <td className="p-3 text-center font-mono font-black text-amber-400 text-base">
                              {totalScore}
                            </td>
                            <td className="p-3 text-center hidden sm:table-cell font-mono font-bold text-cyan-400">
                              {pct}%
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleEditEntry(item)}
                                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                                  title="Edit scores"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteEntry(item)}
                                  className="p-1 rounded text-rose-400 hover:bg-rose-950/50"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FULL CRITERIA GUIDE & EXPLANATIONS */}
          {activeTab === 'criteria_guide' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Official Best Speaker Evaluation Standard (7 Core Pillars)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Individual participants are evaluated across 7 distinct dimensions (total 70 marks). Each dimension isolates a vital oratorical skill to guarantee fair, objective adjudication.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EVALUATION_CRITERIA.map((criterion, idx) => (
                  <div
                    key={criterion.id}
                    className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center justify-center font-black border border-amber-500/30">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">{criterion.name}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                        Max {criterion.maxScore} pts
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {criterion.fullDesc}
                    </p>

                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                      <span className="font-semibold text-cyan-400 block uppercase tracking-wider">
                        Observables & Rubric:
                      </span>
                      <ul className="list-disc pl-3.5 space-y-0.5 text-slate-300">
                        {criterion.indicators.map((ind, i) => (
                          <li key={i}>{ind}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Medal className="w-4 h-4 text-amber-400" />
            <span>Clash of Minds Adjudication Suite</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            Close Evaluation
          </button>
        </div>
      </motion.div>
    </div>
  );
}
