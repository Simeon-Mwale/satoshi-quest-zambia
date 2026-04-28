'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGameStore, getLevel, getLevelTitle } from '@/lib/store';

interface LeaderEntry {
  username: string;
  totalXP: number;
  totalSats: number;
  streak: number;
  completedLessons: number;
  level: number;
}

// Simulated community leaderboard data
const COMMUNITY_LEADERS: LeaderEntry[] = [
  { username: 'MwaleB', totalXP: 4200, totalSats: 1050, streak: 14, completedLessons: 8, level: 7 },
  { username: 'ChilesheN', totalXP: 3800, totalSats: 980, streak: 10, completedLessons: 7, level: 6 },
  { username: 'BandaT', totalXP: 3100, totalSats: 820, streak: 7, completedLessons: 6, level: 6 },
  { username: 'MumbaK', totalXP: 2700, totalSats: 710, streak: 5, completedLessons: 5, level: 5 },
  { username: 'NkausuZ', totalXP: 2400, totalSats: 640, streak: 3, completedLessons: 5, level: 5 },
  { username: 'PhiriS', totalXP: 1900, totalSats: 500, streak: 2, completedLessons: 4, level: 4 },
  { username: 'LubaL', totalXP: 1500, totalSats: 380, streak: 1, completedLessons: 3, level: 3 },
  { username: 'KasumbaE', totalXP: 1100, totalSats: 270, streak: 0, completedLessons: 2, level: 3 },
];

export default function LeaderboardPage() {
  const { user } = useGameStore();
  const [entries, setEntries] = useState<LeaderEntry[]>([]);
  const lang = user?.language || 'en';

  useEffect(() => {
    const allEntries = [...COMMUNITY_LEADERS];
    if (user) {
      const userEntry: LeaderEntry = {
        username: user.username + ' (You)',
        totalXP: user.totalXP,
        totalSats: user.totalSats,
        streak: user.streak,
        completedLessons: user.completedLessons.length,
        level: getLevel(user.totalXP),
      };
      allEntries.push(userEntry);
    }
    allEntries.sort((a, b) => b.totalXP - a.totalXP);
    setEntries(allEntries);
  }, [user]);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 glass-card border-b border-white/5 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
            <span>←</span>
            <span className="text-sm">{lang === 'en' ? 'Back' : 'Bwela'}</span>
          </Link>
          <h1 className="font-display font-bold text-white">
            {lang === 'en' ? '🏆 Leaderboard' : '🏆 Ichalo cha Bana'}
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6">
        <div className="text-center mb-6">
          <p className="text-white/50 text-sm">
            {lang === 'en'
              ? 'Top Bitcoin learners in Zambia'
              : 'Abashinda ba kusambilila Bitcoin mu Zambia'}
          </p>
          <p className="text-xs text-white/30 font-mono mt-1">
            {lang === 'en' ? '* Simulated community data' : '* Ifyo fyacindulwa fya cimindano'}
          </p>
        </div>

        {/* Top 3 podium */}
        {entries.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-8">
            {/* 2nd place */}
            <div className="text-center flex-1">
              <div className="text-3xl mb-2">🥈</div>
              <div className="bg-surface-700 rounded-t-2xl p-3 h-24 flex flex-col items-center justify-end">
                <p className="font-bold text-white text-sm truncate w-full text-center">{entries[1]?.username}</p>
                <p className="text-xs text-white/50 font-mono">{entries[1]?.totalXP} XP</p>
              </div>
            </div>
            {/* 1st place */}
            <div className="text-center flex-1">
              <div className="text-4xl mb-2 animate-float">🥇</div>
              <div className="bg-gradient-to-b from-bitcoin-orange/20 to-surface-700 rounded-t-2xl p-3 h-32 flex flex-col items-center justify-end border border-bitcoin-orange/30">
                <p className="font-bold text-bitcoin-orange text-sm truncate w-full text-center">{entries[0]?.username}</p>
                <p className="text-xs text-bitcoin-amber font-mono">{entries[0]?.totalXP} XP</p>
              </div>
            </div>
            {/* 3rd place */}
            <div className="text-center flex-1">
              <div className="text-3xl mb-2">🥉</div>
              <div className="bg-surface-700 rounded-t-2xl p-3 h-16 flex flex-col items-center justify-end">
                <p className="font-bold text-white text-sm truncate w-full text-center">{entries[2]?.username}</p>
                <p className="text-xs text-white/50 font-mono">{entries[2]?.totalXP} XP</p>
              </div>
            </div>
          </div>
        )}

        {/* Full list */}
        <div className="space-y-2">
          {entries.map((entry, index) => {
            const isYou = entry.username.includes('(You)');
            return (
              <div
                key={entry.username}
                className={`glass-card rounded-2xl p-4 flex items-center gap-4 ${
                  isYou ? 'border border-bitcoin-orange/40 bg-bitcoin-orange/5' : 'border border-white/5'
                }`}
              >
                <div className="w-8 text-center">
                  {index < 3 ? (
                    <span className="text-xl">{medals[index]}</span>
                  ) : (
                    <span className="text-white/40 font-mono font-bold text-sm">#{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm truncate ${isYou ? 'text-bitcoin-orange' : 'text-white'}`}>
                      {entry.username}
                    </p>
                    {entry.streak > 0 && (
                      <span className="text-xs streak-badge px-2 py-0.5 rounded-full text-white">
                        🔥{entry.streak}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 font-mono">
                    Lv.{entry.level} • {entry.completedLessons} lessons
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-mono font-bold text-bitcoin-amber text-sm">{entry.totalXP} XP</p>
                  <p className="text-xs text-white/40 font-mono">⚡ {entry.totalSats} sats</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Your position call to action */}
        {user && user.totalXP === 0 && (
          <div className="mt-6 glass-card rounded-2xl p-5 text-center border border-bitcoin-orange/20">
            <p className="text-white font-semibold mb-2">
              {lang === 'en' ? "You haven't started yet!" : 'Utatangilila nampa!'}
            </p>
            <p className="text-white/50 text-sm mb-4">
              {lang === 'en'
                ? 'Complete your first lesson to appear on the leaderboard'
                : 'Malisya imilimo yako ya kubalilapo ukuboneka ku ichalo'}
            </p>
            <Link
              href="/"
              className="inline-block bg-bitcoin-orange hover:bg-bitcoin-amber text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              {lang === 'en' ? 'Start Learning →' : 'Tangila Ukusambilila →'}
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
