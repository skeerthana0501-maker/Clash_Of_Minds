/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenState, CategoryType, DebateTopic } from './types';
import { 
  getStoredTopics, 
  saveStoredTopics, 
  resetStoredTopics, 
  INITIAL_GENERAL_TOPICS, 
  INITIAL_TECHNICAL_TOPICS 
} from './data/defaultTopics';
import { soundManager } from './utils/audio';
import { IntroScreen } from './components/IntroScreen';
import { CategorySelect } from './components/CategorySelect';
import { TopicGrid } from './components/TopicGrid';
import { TopicRevealView } from './components/TopicRevealView';
import { TopicEditorModal } from './components/TopicEditorModal';
import { EvaluationModal } from './components/EvaluationModal';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('intro');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('general');
  const [selectedTopic, setSelectedTopic] = useState<DebateTopic | null>(null);

  // Store 20 general and 20 technical topics
  const [generalTopics, setGeneralTopics] = useState<DebateTopic[]>(() => {
    const data = getStoredTopics();
    return data.general;
  });

  const [technicalTopics, setTechnicalTopics] = useState<DebateTopic[]>(() => {
    const data = getStoredTopics();
    return data.technical;
  });

  const [isMuted, setIsMuted] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEvaluatorOpen, setIsEvaluatorOpen] = useState(false);

  // Sync to local storage on changes
  useEffect(() => {
    saveStoredTopics({ general: generalTopics, technical: technicalTopics });
  }, [generalTopics, technicalTopics]);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleEnterFromIntro = () => {
    setScreen('category_select');
  };

  const handleSelectCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setScreen('topic_grid');
  };

  const handleSelectTopicNumber = (topic: DebateTopic) => {
    setSelectedTopic(topic);
    setScreen('topic_detail');
  };

  const handleToggleTopicUsed = (topicId: string) => {
    soundManager.playClick();
    if (selectedCategory === 'general') {
      setGeneralTopics((prev) =>
        prev.map((t) => (t.id === topicId ? { ...t, isUsed: !t.isUsed } : t))
      );
      if (selectedTopic && selectedTopic.id === topicId) {
        setSelectedTopic((prev) => (prev ? { ...prev, isUsed: !prev.isUsed } : null));
      }
    } else {
      setTechnicalTopics((prev) =>
        prev.map((t) => (t.id === topicId ? { ...t, isUsed: !t.isUsed } : t))
      );
      if (selectedTopic && selectedTopic.id === topicId) {
        setSelectedTopic((prev) => (prev ? { ...prev, isUsed: !prev.isUsed } : null));
      }
    }
  };

  const handleUpdateTopicMotion = (topicId: string, newMotion: string) => {
    if (selectedCategory === 'general') {
      setGeneralTopics((prev) =>
        prev.map((t) => (t.id === topicId ? { ...t, motion: newMotion } : t))
      );
      if (selectedTopic && selectedTopic.id === topicId) {
        setSelectedTopic((prev) => (prev ? { ...prev, motion: newMotion } : null));
      }
    } else {
      setTechnicalTopics((prev) =>
        prev.map((t) => (t.id === topicId ? { ...t, motion: newMotion } : t))
      );
      if (selectedTopic && selectedTopic.id === topicId) {
        setSelectedTopic((prev) => (prev ? { ...prev, motion: newMotion } : null));
      }
    }
  };

  const handleResetUsedForCurrentCategory = () => {
    if (window.confirm(`Reset all drawn marks for ${selectedCategory.toUpperCase()} track?`)) {
      if (selectedCategory === 'general') {
        setGeneralTopics((prev) => prev.map((t) => ({ ...t, isUsed: false })));
      } else {
        setTechnicalTopics((prev) => prev.map((t) => ({ ...t, isUsed: false })));
      }
      soundManager.playClick();
    }
  };

  const handleSaveEditorTopics = (newGeneral: DebateTopic[], newTechnical: DebateTopic[]) => {
    setGeneralTopics(newGeneral);
    setTechnicalTopics(newTechnical);
    saveStoredTopics({ general: newGeneral, technical: newTechnical });
    if (selectedTopic) {
      const refreshed = (selectedCategory === 'general' ? newGeneral : newTechnical).find(
        (t) => t.id === selectedTopic.id
      );
      if (refreshed) setSelectedTopic(refreshed);
    }
  };

  const handleResetDefaults = () => {
    const res = resetStoredTopics();
    setGeneralTopics(res.general);
    setTechnicalTopics(res.technical);
    if (selectedTopic) {
      const refreshed = (selectedCategory === 'general' ? res.general : res.technical).find(
        (t) => t.number === selectedTopic.number
      );
      if (refreshed) setSelectedTopic(refreshed);
    }
    soundManager.playClick();
  };

  const currentCategoryTopics = selectedCategory === 'general' ? generalTopics : technicalTopics;
  const generalUsedCount = generalTopics.filter((t) => t.isUsed).length;
  const technicalUsedCount = technicalTopics.filter((t) => t.isUsed).length;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans select-none antialiased">
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div
            key="screen-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen"
          >
            <IntroScreen
              onEnter={handleEnterFromIntro}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              onOpenEvaluator={() => setIsEvaluatorOpen(true)}
              onRandomTrackSelect={handleSelectCategory}
            />
          </motion.div>
        )}

        {screen === 'category_select' && (
          <motion.div
            key="screen-category-select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen"
          >
            <CategorySelect
              onSelectCategory={handleSelectCategory}
              onBack={() => setScreen('intro')}
              generalUsedCount={generalUsedCount}
              technicalUsedCount={technicalUsedCount}
              onOpenEvaluator={() => setIsEvaluatorOpen(true)}
            />
          </motion.div>
        )}

        {screen === 'topic_grid' && (
          <motion.div
            key={`screen-topic-grid-${selectedCategory}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen"
          >
            <TopicGrid
              category={selectedCategory}
              topics={currentCategoryTopics}
              onSelectTopic={handleSelectTopicNumber}
              onBack={() => setScreen('category_select')}
              onSwitchCategory={(cat) => setSelectedCategory(cat)}
              onOpenEditor={() => setIsEditorOpen(true)}
              onResetUsed={handleResetUsedForCurrentCategory}
              onOpenEvaluator={() => setIsEvaluatorOpen(true)}
            />
          </motion.div>
        )}

        {screen === 'topic_detail' && selectedTopic && (
          <motion.div
            key={`screen-topic-detail-${selectedTopic.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen"
          >
            <TopicRevealView
              topic={selectedTopic}
              category={selectedCategory}
              allTopics={currentCategoryTopics}
              onBack={() => setScreen('topic_grid')}
              onSelectTopic={(t) => setSelectedTopic(t)}
              onToggleUsed={handleToggleTopicUsed}
              onUpdateTopicMotion={handleUpdateTopicMotion}
              onOpenEvaluator={() => setIsEvaluatorOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Organizer Topic Editor Modal */}
      <TopicEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        generalTopics={generalTopics}
        technicalTopics={technicalTopics}
        onSaveTopics={handleSaveEditorTopics}
        onResetDefaults={handleResetDefaults}
      />

      {/* Best Speaker 7-Criteria Adjudication Modal & Leaderboard */}
      <EvaluationModal
        isOpen={isEvaluatorOpen}
        onClose={() => setIsEvaluatorOpen(false)}
        defaultTopicMotion={selectedTopic?.motion}
      />
    </div>
  );
}
