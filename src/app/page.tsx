'use client';
import { useEffect, useState } from 'react';
import { useGameStore, getLevel, getXPForNextLevel, getLevelTitle } from '@/lib/store';
import { MODULES } from '@/data/lessons';
import Link from 'next/link';

export default function HomePage() {
  const { user, initUser, toggleLanguage, updateStreak } = useGameStore();
  const [username, setUsername] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('satoshi-quest-user');
    if (!stored) {
      setShowOnboarding(true);
    } else {
      const parsed = JSON.parse(stored);
      initUser(parsed.username);
      updateStreak();
    }
  }, []);

  const handleStart = () => {
    if (!username.trim()) return;
    initUser(username.trim());
    updateStreak();
    setShowOnboarding(false);
  };

  const lang = user?.language || 'en';
  const xpInfo = user ? getXPForNextLevel(user.totalXP) : null;

  if (!mounted) return null;

  if (showOnboarding) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {/* Background decoration */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-bitcoin-orange/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-zambia-green/5 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-bitcoin-orange to-bitcoin-amber mb-6 glow-orange animate-float">
              <span className="text-4xl font-display font-black text-white">₿</span>
            </div>
            <h1 className="font-display text-4xl font-black text-white text-glow mb-2">
              SatoshiQuest
            </h1>
            <p className="text-surface-500 text-sm font-mono tracking-widest uppercase">
              Zambia Edition
            </p>
          </div>

          {/* Tagline */}
          <div className="glass-card rounded-2xl p-6 mb-6 text-center">
            <p className="text-lg text-white/80 mb-1">
              🇿🇲 Learn Bitcoin in <span className="text-bitcoin-orange font-semibold">English</span>,{' '}
              <span className="text-bitcoin-amber font-semibold">Bemba</span> &{' '}
              <span className="text-emerald-400 font-semibold">Nyanja</span>
            </p>
            <p className="text-sm text-white/40">Earn real sats as you level up your knowledge</p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: '⚡', label: '5 Modules' },
                { icon: '🎯', label: '15 Lessons' },
                { icon: '₿', label: 'Earn Sats' },
              ].map((item) => (
                <div key={item.label} className="bg-surface-700 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-white/60">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Username input */}
          <div className="glass-card rounded-2xl p-6">
            <label className="block text-sm text-white/60 mb-2 font-mono">
              {lang === 'en' ? 'Choose your name' : 'Sala izina lako'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder={lang === 'en' ? 'e.g. Mwale, Banda, Zulu...' : 'e.g. Mwale, Banda, Zulu...'}
              className="w-full bg-surface-700 border border-surface-500 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-bitcoin-orange transition-colors mb-4 font-body"
              maxLength={20}
            />
            <button
              onClick={handleStart}
              disabled={!username.trim()}
              className="w-full bg-bitcoin-orange hover:bg-bitcoin-amber disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold text-lg py-4 rounded-xl transition-all duration-200 glow-orange"
            >
              {lang === 'en' ? 'Start Quest →' : 'Tangila Ulendo →'}
            </button>
          </div>

          <p className="text-center text-white/20 text-xs mt-4 font-mono">
            No account needed • Free forever • Open source
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const level = getLevel(user.totalXP);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/5 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bitcoin-orange to-bitcoin-amber flex items-center justify-center glow-orange">
              <span className="font-display font-black text-sm">₿</span>
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm leading-none">
                {user.username}
              </p>
              <p className="text-white/40 text-xs font-mono">
                Lv.{level} • {getLevelTitle(level, lang)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak */}
            {user.streak > 0 && (
              <div className="streak-badge flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-bold">
                🔥 {user.streak}
              </div>
            )}
            {/* Sats balance */}
            <div className="flex items-center gap-1 bg-surface-700 px-3 py-1 rounded-full">
              <span className="text-bitcoin-orange text-xs">⚡</span>
              <span className="font-mono text-sm font-semibold text-bitcoin-amber">
                {user.totalSats.toLocaleString()}
              </span>
              <span className="text-white/40 text-xs">sats</span>
            </div>
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="text-xs font-mono bg-surface-700 hover:bg-surface-600 text-white/70 px-2 py-1 rounded-lg transition-colors"
            >
              {lang === 'en' ? 'BEM' : lang === 'bem' ? 'NYA' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6">
        {/* XP Progress */}
        <div className="glass-card rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60 font-mono">Level {level} Progress</span>
            <span className="text-sm text-bitcoin-amber font-mono font-semibold">
              {user.totalXP} XP
            </span>
          </div>
          <div className="h-3 bg-surface-600 rounded-full overflow-hidden">
            <div
              className="progress-bar h-full"
              style={{ width: `${Math.min(xpInfo?.progress || 0, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-white/30 font-mono">{xpInfo?.current} / {xpInfo?.next} XP</span>
            <span className="text-xs text-white/30 font-mono">Next: Lv.{level + 1}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: lang === 'en' ? 'Lessons' : lang === 'bem' ? 'Imilimo' : 'Maphunziro', value: user.completedLessons.length, icon: '📚' },
            { label: lang === 'en' ? 'Sats Earned' : lang === 'bem' ? 'Sats Zasalwa' : 'Sats Zopezedwa', value: `${user.totalSats}`, icon: '⚡' },
            { label: lang === 'en' ? 'Badges' : lang === 'bem' ? 'Ichilambo' : 'Mabadji', value: user.badges.length, icon: '🏅' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display font-bold text-xl text-white">{stat.value}</div>
              <div className="text-xs text-white/40 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Modules */}
        <h2 className="font-display font-bold text-xl text-white mb-4">
          {lang === 'en' ? 'Learning Path' : lang === 'bem' ? 'Inshila ya Kusambilila' : 'Njira ya Maphunziro'}
        </h2>

        <div className="space-y-4">
          {MODULES.map((module, index) => {
            const isUnlocked = index === 0 || user.completedModules.includes(MODULES[index - 1].id);
            const isCompleted = user.completedModules.includes(module.id);
            const moduleLessons = module.lessons;
            const completedCount = moduleLessons.filter((l) =>
              user.completedLessons.includes(l.id)
            ).length;
            const progressPct = (completedCount / moduleLessons.length) * 100;

            return (
              <div
                key={module.id}
                className={`module-card glass-card rounded-2xl overflow-hidden border ${
                  isCompleted
                    ? 'border-emerald-500/30'
                    : isUnlocked
                    ? 'border-white/10 hover:border-bitcoin-orange/30'
                    : 'border-white/5 opacity-60'
                }`}
              >
                {/* Module header */}
                <div className={`bg-gradient-to-r ${module.gradient} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{module.icon}</span>
                      <div>
                        <h3 className="font-display font-bold text-white text-lg leading-tight">
                          {module.title[lang]}
                        </h3>
                        <p className="text-white/70 text-xs font-mono">
                          {lang === 'en' ? 'Module' : lang === 'bem' ? 'Icipande' : 'Gawo'} {module.order}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {isCompleted ? (
                        <div className="text-2xl">✅</div>
                      ) : !isUnlocked ? (
                        <div className="text-2xl">🔒</div>
                      ) : (
                        <div className="text-sm font-mono text-white/80">
                          {completedCount}/{moduleLessons.length}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 bg-black/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/60 rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Module body */}
                <div className="p-4">
                  <p className="text-white/60 text-sm mb-4">{module.description[lang]}</p>

                  <div className="space-y-2">
                    {moduleLessons.map((lesson) => {
                      const isDone = user.completedLessons.includes(lesson.id);
                      const canAccess = isUnlocked;
                      return (
                        <Link
                          key={lesson.id}
                          href={canAccess ? `/learn/${lesson.id}` : '#'}
                          className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                            isDone
                              ? 'bg-emerald-500/10 border border-emerald-500/20'
                              : canAccess
                              ? 'bg-surface-700 hover:bg-surface-600 border border-transparent hover:border-bitcoin-orange/20'
                              : 'bg-surface-800 border border-transparent cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{lesson.icon}</span>
                            <div>
                              <p className={`text-sm font-semibold ${isDone ? 'text-emerald-400' : 'text-white'}`}>
                                {lesson.title[lang]}
                              </p>
                              <p className="text-xs text-white/40">{lesson.subtitle[lang]}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs font-mono text-bitcoin-amber">+{lesson.satsReward} sats</span>
                            {isDone ? (
                              <span className="text-emerald-400 text-sm">✓</span>
                            ) : canAccess ? (
                              <span className="text-white/30 text-sm">→</span>
                            ) : (
                              <span className="text-white/20 text-sm">🔒</span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community links */}
        <div className="mt-8 glass-card rounded-2xl p-5">
          <h3 className="font-display font-bold text-white mb-3">
            🇿🇲 {lang === 'en' ? 'Zambia Bitcoin Community' : lang === 'bem' ? 'Cimindano ca Bitcoin Zambia' : 'Gulu la Bitcoin Zambia'}
          </h3>
          <div className="space-y-2">
            {[
              { name: 'BitDevs Zambia', url: 'https://github.com/Bitcoin-Zambia', desc: 'Developers & builders' },
              { name: 'Bitcoin for HER', url: '#', desc: 'Women empowerment' },
              { name: 'Bantu Bitcoin Podcast', url: '#', desc: 'Learn in Bemba' },
              { name: 'Bitcoin Zambia', url: '#', desc: 'Community & meetups' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-surface-700 hover:bg-surface-600 rounded-xl transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-bitcoin-orange transition-colors">
                    {link.name}
                  </p>
                  <p className="text-xs text-white/40">{link.desc}</p>
                </div>
                <span className="text-white/30 group-hover:text-bitcoin-orange transition-colors">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Leaderboard link */}
        <Link
          href="/leaderboard"
          className="mt-4 flex items-center justify-between w-full glass-card rounded-2xl p-5 hover:border-bitcoin-orange/30 border border-white/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="font-display font-bold text-white">
                {lang === 'en' ? 'Leaderboard' : 'Ichalo cha Bana Bafwile'}
              </p>
              <p className="text-xs text-white/40">
                {lang === 'en' ? 'See top Zambian learners' : 'Bona abashinda mu Zambia'}
              </p>
            </div>
          </div>
          <span className="text-white/30 group-hover:text-bitcoin-orange transition-colors text-xl">→</span>
        </Link>
      </main>
    </div>
  );
}
