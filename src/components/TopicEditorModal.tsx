import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, RotateCcw, Check, Sparkles, Globe2, Cpu } from 'lucide-react';
import { DebateTopic, CategoryType } from '../types';
import { soundManager } from '../utils/audio';

interface TopicEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  generalTopics: DebateTopic[];
  technicalTopics: DebateTopic[];
  onSaveTopics: (general: DebateTopic[], technical: DebateTopic[]) => void;
  onResetDefaults: () => void;
}

export function TopicEditorModal({
  isOpen,
  onClose,
  generalTopics,
  technicalTopics,
  onSaveTopics,
  onResetDefaults,
}: TopicEditorModalProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>('general');
  const [editedGeneral, setEditedGeneral] = useState<DebateTopic[]>(generalTopics);
  const [editedTechnical, setEditedTechnical] = useState<DebateTopic[]>(technicalTopics);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentList = activeTab === 'general' ? editedGeneral : editedTechnical;

  const handleMotionChange = (number: number, newMotion: string) => {
    if (activeTab === 'general') {
      setEditedGeneral((prev) =>
        prev.map((t) => (t.number === number ? { ...t, motion: newMotion } : t))
      );
    } else {
      setEditedTechnical((prev) =>
        prev.map((t) => (t.number === number ? { ...t, motion: newMotion } : t))
      );
    }
  };

  const handleTagChange = (number: number, newTag: string) => {
    if (activeTab === 'general') {
      setEditedGeneral((prev) =>
        prev.map((t) => (t.number === number ? { ...t, tag: newTag } : t))
      );
    } else {
      setEditedTechnical((prev) =>
        prev.map((t) => (t.number === number ? { ...t, tag: newTag } : t))
      );
    }
  };

  const handleSave = () => {
    soundManager.playClick();
    onSaveTopics(editedGeneral, editedTechnical);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    if (window.confirm('Reset all 40 debate topics to original defaults?')) {
      onResetDefaults();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Debate Topic Organizer</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize or replace any of the 20 General & 20 Technical debate motions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              General Track (20 Slots)
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'technical'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Technical Track (20 Slots)
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Defaults
          </button>
        </div>

        {/* Topic Input List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {currentList.map((topic) => (
            <div
              key={topic.id}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col gap-2.5 focus-within:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-700">
                    #{topic.number < 10 ? `0${topic.number}` : topic.number}
                  </span>
                  <input
                    type="text"
                    value={topic.tag}
                    onChange={(e) => handleTagChange(topic.number, e.target.value)}
                    placeholder="Domain / Category Tag"
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none focus:border-cyan-400 w-48"
                  />
                </div>
                <span className="text-[11px] text-slate-500">Slot {topic.number} of 15</span>
              </div>

              <div>
                <textarea
                  rows={2}
                  value={topic.motion}
                  onChange={(e) => handleMotionChange(topic.number, e.target.value)}
                  placeholder="Enter the full motion/debate statement for this number..."
                  className="w-full text-sm font-medium px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Changes will be stored locally in your browser session.
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Motions
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
