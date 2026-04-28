// src/components/ui/XPBar.tsx
'use client';
import { getXPForNextLevel } from '@/lib/store';

interface XPBarProps {
  totalXP: number;
  level: number;
}

export default function XPBar({ totalXP, level }: XPBarProps) {
  const xpInfo = getXPForNextLevel(totalXP);
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60 font-mono">Level {level} Progress</span>
        <span className="text-sm text-bitcoin-amber font-mono font-semibold">{totalXP} XP</span>
      </div>
      <div className="h-3 bg-surface-600 rounded-full overflow-hidden">
        <div
          className="progress-bar h-full"
          style={{ width: `${Math.min(xpInfo.progress, 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-white/30 font-mono">{xpInfo.current} / {xpInfo.next} XP</span>
        <span className="text-xs text-white/30 font-mono">Next: Lv.{level + 1}</span>
      </div>
    </div>
  );
}
