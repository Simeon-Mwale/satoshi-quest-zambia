// src/components/game/QuizOption.tsx
'use client';

interface QuizOptionProps {
  label: string;
  text: string;
  index: number;
  selected: boolean;
  submitted: boolean;
  isCorrect: boolean;
  isUserAnswer: boolean;
  onSelect: () => void;
}

export default function QuizOption({
  label,
  text,
  selected,
  submitted,
  isCorrect,
  isUserAnswer,
  onSelect,
}: QuizOptionProps) {
  let className = 'answer-option w-full text-left p-4 rounded-xl border transition-all ';

  if (submitted) {
    if (isCorrect) {
      className += 'correct border-emerald-500 bg-emerald-500/10';
    } else if (isUserAnswer && !isCorrect) {
      className += 'incorrect border-red-500 bg-red-500/10';
    } else {
      className += 'border-surface-500 bg-surface-700 opacity-50';
    }
  } else if (selected) {
    className += 'selected border-bitcoin-orange/70 bg-bitcoin-orange/10';
  } else {
    className += 'border-surface-500 bg-surface-700';
  }

  return (
    <button onClick={submitted ? undefined : onSelect} className={className} disabled={submitted}>
      <div className="flex items-center gap-3">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
            submitted && isCorrect
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : submitted && isUserAnswer && !isCorrect
              ? 'border-red-500 bg-red-500 text-white'
              : selected
              ? 'border-bitcoin-orange bg-bitcoin-orange text-white'
              : 'border-surface-500 text-white/30'
          }`}
        >
          {submitted && isCorrect ? '✓' : submitted && isUserAnswer && !isCorrect ? '✗' : label}
        </div>
        <span className="text-white/85 text-sm">{text}</span>
      </div>
    </button>
  );
}
