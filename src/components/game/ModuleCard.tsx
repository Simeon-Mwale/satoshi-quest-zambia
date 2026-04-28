// src/components/game/ModuleCard.tsx
'use client';
import { Module, Lesson } from '@/data/lessons';
import type { Language } from '@/data/lessons';
import LessonCard from './LessonCard';

interface ModuleCardProps {
  module: Module;
  completedLessons: string[];
  completedModules: string[];
  isUnlocked: boolean;
  lang: Language;
}

export default function ModuleCard({
  module,
  completedLessons,
  completedModules,
  isUnlocked,
  lang,
}: ModuleCardProps) {
  const isCompleted = completedModules.includes(module.id);
  const completedCount = module.lessons.filter((l) => completedLessons.includes(l.id)).length;
  const progressPct = (completedCount / module.lessons.length) * 100;

  const moduleLabel =
    lang === 'en' ? 'Module' : lang === 'bem' ? 'Icipande' : 'Gawo';

  return (
    <div
      className={`module-card glass-card rounded-2xl overflow-hidden border ${
        isCompleted
          ? 'border-emerald-500/30'
          : isUnlocked
          ? 'border-white/10 hover:border-bitcoin-orange/30'
          : 'border-white/5 opacity-60'
      }`}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${module.gradient} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{module.icon}</span>
            <div>
              <h3 className="font-display font-bold text-white text-lg leading-tight">
                {module.title[lang]}
              </h3>
              <p className="text-white/70 text-xs font-mono">
                {moduleLabel} {module.order}
              </p>
            </div>
          </div>
          <div className="text-right">
            {isCompleted ? (
              <span className="text-2xl">✅</span>
            ) : !isUnlocked ? (
              <span className="text-2xl">🔒</span>
            ) : (
              <span className="text-sm font-mono text-white/80">
                {completedCount}/{module.lessons.length}
              </span>
            )}
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3 h-1.5 bg-black/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/60 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-white/60 text-sm mb-4">{module.description[lang]}</p>
        <div className="space-y-2">
          {module.lessons.map((lesson: Lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={completedLessons.includes(lesson.id)}
              isUnlocked={isUnlocked}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
