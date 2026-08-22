export interface EvaluationCriterion {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  maxScore: number;
  indicators: string[];
}

export interface ParticipantScore {
  criterionId: string;
  score: number;
}

export interface ParticipantEvaluation {
  id: string;
  participantName: string;
  teamOrSide: 'Affirmative / For' | 'Opposition / Against' | 'Individual Speaker';
  topicMotion?: string;
  roundName?: string;
  scores: Record<string, number>; // criterionId -> score
  notes: string;
  createdAt: number;
}

export const EVALUATION_CRITERIA: EvaluationCriterion[] = [
  {
    id: 'matter_content',
    name: 'Matter & Content Quality',
    shortDesc: 'Depth of knowledge, substantive arguments, facts & research relevance',
    fullDesc: 'Evaluates the intellectual weight, factuality, relevant examples, and substantive depth of arguments presented.',
    maxScore: 10,
    indicators: [
      'Strong real-world evidence, statistics, or case studies',
      'Originality and depth of insight rather than superficial points',
      'Clear conceptual grounding and relevance to the central topic'
    ]
  },
  {
    id: 'logical_reasoning',
    name: 'Logical Reasoning & Structure',
    shortDesc: 'Coherence, causal links, premise-to-conclusion flow, and structure',
    fullDesc: 'Assesses whether points follow a sound logical chain (claims supported by warrants, impacts, and logical conclusions) with clear signposting.',
    maxScore: 10,
    indicators: [
      'Claims are backed by logical "why" and "how" (not mere assertions)',
      'Clear structured flow: Introduction, key points, impact analysis, conclusion',
      'Strong internal consistency with no logical fallacies or contradictions'
    ]
  },
  {
    id: 'rebuttal_clash',
    name: 'Rebuttal, Clash & Responsiveness',
    shortDesc: 'Targeting opponent core points, exposing fallacies, and adaptability',
    fullDesc: 'Measures the ability to listen actively, deconstruct opposing arguments on the spot, and directly defend against incoming critiques.',
    maxScore: 10,
    indicators: [
      'Direct refutation of the core mechanism of the other side',
      'Quick-witted responsiveness without relying solely on prepared notes',
      'Effective balance between building own case and tearing down counter-arguments'
    ]
  },
  {
    id: 'oratory_delivery',
    name: 'Oratory Delivery & Vocal Dynamics',
    shortDesc: 'Clarity, voice modulation, tone variation, pacing, and projection',
    fullDesc: 'Evaluates vocal control, articulate diction, cadence, appropriate pacing, deliberate pauses, and volume without shouting or trailing off.',
    maxScore: 10,
    indicators: [
      'Crisp pronunciation and audible, commanding vocal projection',
      'Engaging voice modulation (avoiding monotonous or flat delivery)',
      'Natural pacing with deliberate rhetorical pauses for dramatic effect'
    ]
  },
  {
    id: 'body_language',
    name: 'Stage Presence & Non-Verbal Impact',
    shortDesc: 'Eye contact, posture, purposeful hand gestures, and composure',
    fullDesc: 'Assesses physical confidence, sustained eye contact across judges and audience, controlled gestures, and poised demeanor under pressure.',
    maxScore: 10,
    indicators: [
      'Confident eye contact connecting with the entire room and adjudicators',
      'Natural, purposeful body gestures reinforcing spoken points',
      'Graceful poise, calmness, and professional stage etiquette'
    ]
  },
  {
    id: 'persuasion_rhetoric',
    name: 'Persuasion, Rhetoric & Audience Engagement',
    shortDesc: 'Emotional resonance, compelling analogies, ethos, pathos & hooks',
    fullDesc: 'Evaluates the rhetorical magnetism, memorable analogies, storytelling ability, and capacity to convince skeptical listeners.',
    maxScore: 10,
    indicators: [
      'Powerful opening hook and memorable, punchy closing statement',
      'Effective use of rhetorical questions, relatable analogies, or metaphors',
      'Compelling emotional and ethical resonance (Ethos, Pathos, Logos)'
    ]
  },
  {
    id: 'time_discipline',
    name: 'Time Discipline & Floor Etiquette',
    shortDesc: 'Pacing within time limits, POI handling, respect, and debate ethics',
    fullDesc: 'Measures precision in time management (finishing within allotted seconds without rushing), graceful handling of interruptions, and intellectual humility.',
    maxScore: 10,
    indicators: [
      'Maximizes allotted time effectively without running overtime or cutting short',
      'Courteous floor etiquette, respectful tone toward opponents and judges',
      'Strategic handling of Points of Information (POIs) or cross-examinations'
    ]
  }
];

export const MAX_TOTAL_SCORE = EVALUATION_CRITERIA.reduce((acc, c) => acc + c.maxScore, 0); // 70 points
