// src/components/ui/SatsBalance.tsx
'use client';

interface SatsBalanceProps {
  sats: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function SatsBalance({ sats, size = 'md' }: SatsBalanceProps) {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div className={`flex items-center gap-1 bg-surface-700 rounded-full ${sizes[size]}`}>
      <span className="text-bitcoin-orange">⚡</span>
      <span className="font-mono font-semibold text-bitcoin-amber">
        {sats.toLocaleString()}
      </span>
      <span className="text-white/40">sats</span>
    </div>
  );
}
