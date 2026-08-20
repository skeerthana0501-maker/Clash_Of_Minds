export type CategoryType = 'general' | 'technical';

export type ScreenState = 'intro' | 'category_select' | 'topic_grid' | 'topic_detail';

export interface TopicBackgroundTheme {
  gradient: string;
  accent: string;
  glow: string;
  patternName?: string;
}

export interface DebateTopic {
  id: string;
  number: number; // 1 to 15
  category: CategoryType;
  motion: string; // The debate motion/topic statement
  tag: string;
  context?: string;
  forStance?: string;
  againstStance?: string;
  isUsed?: boolean;
  theme?: TopicBackgroundTheme;
}

export interface DebateTimerSettings {
  roundName: string;
  durationSeconds: number;
}
