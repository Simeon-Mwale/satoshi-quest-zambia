// src/components/ui/StreakBadge.tsx
'use client';

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak <= 0) return null;
  return (
    <div className="streak-badge flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-bold">
      🔥 {streak}
    </div>
  );
}
