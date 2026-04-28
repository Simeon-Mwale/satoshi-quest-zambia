// src/components/game/LessonCard.tsx
'use client';
import Link from 'next/link';
import { Lesson } from '@/data/lessons';
import type { Language } from '@/data/lessons';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isUnlocked: boolean;
  lang: Language;
}

export default function LessonCard({ lesson, isCompleted, isUnlocked, lang }: LessonCardProps) {
  const href = isUnlocked ? `/learn/${lesson.id}` : '#';

  return (
    <Link
      href={href}
      className={`flex items-center justify-between p-3 rounded-xl transition-all ${
        isCompleted
          ? 'bg-emerald-500/10 border border-emerald-500/20'
          : isUnlocked
          ? 'bg-surface-700 hover:bg-surface-600 border border-transparent hover:border-bitcoin-orange/20'
          : 'bg-surface-800 border border-transparent cursor-not-allowed opacity-60'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{lesson.icon}</span>
        <div>
          <p className={`text-sm font-semibold ${isCompleted ? 'text-emerald-400' : 'text-white'}`}>
            {lesson.title[lang]}
          </p>
          <p className="text-xs text-white/40">{lesson.subtitle[lang]}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs font-mono text-bitcoin-amber">+{lesson.satsReward} sats</span>
        {isCompleted ? (
          <span className="text-emerald-400 text-sm">✓</span>
        ) : isUnlocked ? (
          <span className="text-white/30 text-sm">→</span>
        ) : (
          <span className="text-white/20 text-sm">🔒</span>
        )}
      </div>
    </Link>
  );
}
