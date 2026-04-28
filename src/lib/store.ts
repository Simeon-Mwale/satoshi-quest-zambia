// src/lib/store.ts
import { create } from 'zustand';

export interface UserProgress {
  userId: string;
  username: string;
  totalXP: number;
  totalSats: number;
  streak: number;
  lastActivityDate: string | null;
  completedLessons: string[];
  completedModules: string[];
  quizScores: Record<string, number>; // lessonId -> score (0-100)
  language: 'en' | 'bem' | 'nya';
  level: number;
  badges: string[];
}

interface GameState {
  user: UserProgress | null;
  isLoading: boolean;
  currentQuizAnswers: Record<string, number>;
  quizSubmitted: boolean;

  // Actions
  initUser: (username: string) => void;
  completeLesson: (lessonId: string, xp: number, sats: number) => void;
  completeModule: (moduleId: string) => void;
  submitQuiz: (lessonId: string, answers: Record<string, number>, correctAnswers: Record<string, number>, satsEarned: number) => void;
  setQuizAnswer: (questionId: string, answerIndex: number) => void;
  resetQuiz: () => void;
  toggleLanguage: () => void;
  updateStreak: () => void;
  addBadge: (badge: string) => void;
}

const LEVEL_THRESHOLDS = [0, 200, 500, 1000, 2000, 3500, 5000, 7500, 10000, 15000, 20000];

export const getLevel = (xp: number): number => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
};

export const getXPForNextLevel = (currentXP: number): { current: number; next: number; progress: number } => {
  const level = getLevel(currentXP);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const progress = ((currentXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return { current: currentXP - currentThreshold, next: nextThreshold - currentThreshold, progress };
};

const LEVEL_TITLES: Record<number, { en: string; bem: string }> = {
  1: { en: 'Satoshi Seedling', bem: 'Cimuti Cibupene ca Satoshi' },
  2: { en: 'Lightning Learner', bem: 'Mwishibili wa Lightning' },
  3: { en: 'Block Explorer', bem: 'Ufwaya wa Block' },
  4: { en: 'Node Runner', bem: 'Uwutika Node' },
  5: { en: 'Hash Hero', bem: 'Inshinda wa Hash' },
  6: { en: 'Wallet Wizard', bem: 'Mulumendo wa Wallet' },
  7: { en: 'Chain Champion', bem: 'Inshinda wa Chain' },
  8: { en: 'Bitcoin Builder', bem: 'Wapanga Bitcoin' },
  9: { en: 'Satoshi Scholar', bem: 'Mwishibili wa Satoshi' },
  10: { en: 'Zambian Bitcoin Legend', bem: 'Inshibushi ya Bitcoin ya Zambia' },
};

export const getLevelTitle = (level: number, lang: 'en' | 'bem'): string => {
  const title = LEVEL_TITLES[Math.min(level, 10)];
  return title ? title[lang] : LEVEL_TITLES[10][lang];
};

const loadFromStorage = (): UserProgress | null => {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem('satoshi-quest-user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (user: UserProgress) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('satoshi-quest-user', JSON.stringify(user));
  } catch {}
};

export const useGameStore = create<GameState>((set, get) => ({
  user: null,
  isLoading: true,
  currentQuizAnswers: {},
  quizSubmitted: false,

  initUser: (username: string) => {
    const existing = loadFromStorage();
    if (existing) {
      set({ user: existing, isLoading: false });
      return;
    }
    const newUser: UserProgress = {
      userId: Date.now().toString(),
      username,
      totalXP: 0,
      totalSats: 0,
      streak: 0,
      lastActivityDate: null,
      completedLessons: [],
      completedModules: [],
      quizScores: {},
      language: 'en',
      level: 1,
      badges: [],
    };
    saveToStorage(newUser);
    set({ user: newUser, isLoading: false });
  },

  completeLesson: (lessonId, xp, sats) => {
    const { user } = get();
    if (!user || user.completedLessons.includes(lessonId)) return;
    const updated = {
      ...user,
      totalXP: user.totalXP + xp,
      totalSats: user.totalSats + sats,
      completedLessons: [...user.completedLessons, lessonId],
      level: getLevel(user.totalXP + xp),
    };
    saveToStorage(updated);
    set({ user: updated });
  },

  completeModule: (moduleId) => {
    const { user } = get();
    if (!user || user.completedModules.includes(moduleId)) return;
    const updated = {
      ...user,
      completedModules: [...user.completedModules, moduleId],
      badges: [...user.badges, `module-${moduleId}`],
    };
    saveToStorage(updated);
    set({ user: updated });
  },

  submitQuiz: (lessonId, answers, correctAnswers, satsEarned) => {
    const { user } = get();
    if (!user) return;
    const total = Object.keys(correctAnswers).length;
    const correct = Object.keys(answers).filter(
      (qId) => answers[qId] === correctAnswers[qId]
    ).length;
    const score = Math.round((correct / total) * 100);
    const updated = {
      ...user,
      totalSats: user.totalSats + satsEarned,
      quizScores: { ...user.quizScores, [lessonId]: score },
    };
    saveToStorage(updated);
    set({ user: updated, quizSubmitted: true });
  },

  setQuizAnswer: (questionId, answerIndex) => {
    set((state) => ({
      currentQuizAnswers: { ...state.currentQuizAnswers, [questionId]: answerIndex },
    }));
  },

  resetQuiz: () => {
    set({ currentQuizAnswers: {}, quizSubmitted: false });
  },

  toggleLanguage: () => {
    const { user } = get();
    if (!user) return;
    const cycle: Array<'en' | 'bem' | 'nya'> = ['en', 'bem', 'nya'];
    const next = cycle[(cycle.indexOf(user.language) + 1) % cycle.length];
    const updated = { ...user, language: next };
    saveToStorage(updated);
    set({ user: updated });
  },

  updateStreak: () => {
    const { user } = get();
    if (!user) return;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let newStreak = user.streak;
    if (user.lastActivityDate === today) return;
    if (user.lastActivityDate === yesterday) {
      newStreak = user.streak + 1;
    } else if (user.lastActivityDate !== today) {
      newStreak = 1;
    }
    const updated = { ...user, streak: newStreak, lastActivityDate: today };
    saveToStorage(updated);
    set({ user: updated });
  },

  addBadge: (badge) => {
    const { user } = get();
    if (!user || user.badges.includes(badge)) return;
    const updated = { ...user, badges: [...user.badges, badge] };
    saveToStorage(updated);
    set({ user: updated });
  },
}));
