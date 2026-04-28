'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLessonById, getModuleById } from '@/data/lessons';
import { useGameStore } from '@/lib/store';

type QuizState = 'reading' | 'quiz' | 'results';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  const lesson = getLessonById(lessonId);
  const module_ = lesson ? getModuleById(lesson.moduleId) : null;

  const { user, completeLesson, setQuizAnswer, resetQuiz, currentQuizAnswers, submitQuiz } =
    useGameStore();

  const [quizState, setQuizState] = useState<QuizState>('reading');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [contentPage, setContentPage] = useState(0);

  const lang = user?.language || 'en';

  useEffect(() => {
    resetQuiz();
    setSelectedAnswers({});
    setSubmitted(false);
    setContentPage(0);
    setQuizState('reading');
  }, [lessonId]);

  const handleAnswer = (questionId: string, answerIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    setQuizAnswer(questionId, answerIndex);
  };

  const handleSubmitQuiz = useCallback(() => {
    if (!lesson || !user) return;
    const correctAnswers: Record<string, number> = {};
    lesson.quiz.forEach((q) => { correctAnswers[q.id] = q.correctIndex; });

    const correctCount = lesson.quiz.filter(
      (q) => selectedAnswers[q.id] === q.correctIndex
    ).length;
    const satsEarned = lesson.quiz.reduce((total, q) => {
      return selectedAnswers[q.id] === q.correctIndex ? total + q.satsReward : total;
    }, 0);

    submitQuiz(lessonId, selectedAnswers, correctAnswers, satsEarned);
    setSubmitted(true);
    setQuizState('results');

    if (!user.completedLessons.includes(lessonId)) {
      completeLesson(lessonId, lesson.xpReward, lesson.satsReward);
    }

    if (correctCount === lesson.quiz.length) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [lesson, selectedAnswers, lessonId, user, completeLesson, submitQuiz]);

  if (!lesson || !module_) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">Lesson not found</p>
          <Link href="/" className="text-bitcoin-orange hover:underline">← Go back</Link>
        </div>
      </div>
    );
  }

  const contentParagraphs = lesson.content[lang];
  const totalPages = contentParagraphs.length;
  const isLastPage = contentPage >= totalPages - 1;

  const correctCount = lesson.quiz.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const totalQuestions = lesson.quiz.length;
  const scorePct = Math.round((correctCount / totalQuestions) * 100);
  const satsEarned = lesson.quiz.reduce(
    (total, q) => (selectedAnswers[q.id] === q.correctIndex ? total + q.satsReward : total),
    0
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="bounce-in text-center">
            <div className="text-8xl mb-4">🎉</div>
            <p className="font-display text-3xl font-black text-bitcoin-orange text-glow">
              {lang === 'en' ? 'PERFECT!' : 'BUSUMA!'}
            </p>
            <p className="text-white/80 mt-2">+{lesson.xpReward} XP • +{lesson.satsReward} sats</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-white/5 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
            <span>←</span>
            <span className="text-sm">{lang === 'en' ? 'Back' : 'Bwela'}</span>
          </Link>
          <div className="text-center">
            <p className="text-sm font-display font-bold text-white">{lesson.title[lang]}</p>
            <p className="text-xs text-white/40 font-mono">{module_.title[lang]}</p>
          </div>
          <div className="flex items-center gap-1 bg-surface-700 px-2 py-1 rounded-full">
            <span className="text-xs text-bitcoin-amber">⚡</span>
            <span className="text-xs font-mono text-white">{user?.totalSats || 0}</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6">
        {/* Lesson icon + title */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-4xl mb-4 animate-float"
            style={{ background: `linear-gradient(135deg, ${lesson.color}33, ${lesson.color}11)`, border: `1px solid ${lesson.color}33` }}
          >
            {lesson.icon}
          </div>
          <h1 className="font-display text-2xl font-black text-white mb-1">{lesson.title[lang]}</h1>
          <p className="text-white/50 text-sm">{lesson.subtitle[lang]}</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="text-xs font-mono text-white/40">+{lesson.xpReward} XP</span>
            <span className="text-xs font-mono text-bitcoin-amber">+{lesson.satsReward} sats</span>
          </div>
        </div>

        {/* Reading phase */}
        {quizState === 'reading' && (
          <div className="animate-slide-up">
            {/* Content card */}
            <div className="glass-card rounded-2xl p-6 mb-4 min-h-[200px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                  {lang === 'en' ? 'Lesson Content' : 'Ifyakusambilila'}
                </span>
                <span className="text-xs font-mono text-white/40">
                  {contentPage + 1} / {totalPages}
                </span>
              </div>

              <p className="text-white/85 leading-relaxed text-[15px]">
                {contentParagraphs[contentPage]}
              </p>

              {/* Page indicator dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {contentParagraphs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setContentPage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === contentPage ? 'bg-bitcoin-orange w-4' : 'bg-surface-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {contentPage > 0 && (
                <button
                  onClick={() => setContentPage((p) => p - 1)}
                  className="flex-1 bg-surface-700 hover:bg-surface-600 text-white py-4 rounded-xl transition-colors font-semibold"
                >
                  ← {lang === 'en' ? 'Previous' : 'Ilya Kufita'}
                </button>
              )}
              {!isLastPage ? (
                <button
                  onClick={() => setContentPage((p) => p + 1)}
                  className="flex-1 bg-surface-700 hover:bg-surface-600 text-white py-4 rounded-xl transition-colors font-semibold"
                >
                  {lang === 'en' ? 'Next' : 'Ici Cikuya'} →
                </button>
              ) : (
                <button
                  onClick={() => setQuizState('quiz')}
                  className="flex-1 bg-bitcoin-orange hover:bg-bitcoin-amber text-white py-4 rounded-xl transition-colors font-display font-bold text-lg glow-orange"
                >
                  {lang === 'en' ? '🎯 Take Quiz' : '🎯 Yezya Ulukundo'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quiz phase */}
        {quizState === 'quiz' && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl text-white">
                {lang === 'en' ? 'Quiz Time!' : 'Inshita ya Lukundo!'}
              </h2>
              <span className="text-sm font-mono text-white/40">
                {Object.keys(selectedAnswers).length}/{totalQuestions} answered
              </span>
            </div>

            <div className="space-y-6">
              {lesson.quiz.map((question, qIndex) => (
                <div key={question.id} className="glass-card rounded-2xl p-5">
                  <p className="font-semibold text-white mb-1 text-sm font-mono text-bitcoin-amber">
                    {lang === 'en' ? `Question ${qIndex + 1}` : `Fumbi ${qIndex + 1}`} •{' '}
                    +{question.satsReward} sats
                  </p>
                  <p className="text-white text-base mb-4 leading-relaxed">
                    {question.question[lang]}
                  </p>

                  <div className="space-y-2">
                    {question.options[lang].map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswer(question.id, oIndex)}
                        className={`answer-option w-full text-left p-4 rounded-xl border transition-all ${
                          selectedAnswers[question.id] === oIndex
                            ? 'selected border-bitcoin-orange/70 bg-bitcoin-orange/10'
                            : 'border-surface-500 bg-surface-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                              selectedAnswers[question.id] === oIndex
                                ? 'border-bitcoin-orange bg-bitcoin-orange text-white'
                                : 'border-surface-500 text-white/30'
                            }`}
                          >
                            {['A', 'B', 'C', 'D'][oIndex]}
                          </div>
                          <span className="text-white/85 text-sm">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < totalQuestions}
              className="w-full mt-6 bg-bitcoin-orange hover:bg-bitcoin-amber disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold text-lg py-4 rounded-xl transition-all glow-orange"
            >
              {lang === 'en' ? 'Submit Answers' : 'Tuma Iminwe'}
            </button>
          </div>
        )}

        {/* Results phase */}
        {quizState === 'results' && (
          <div className="animate-slide-up">
            {/* Score card */}
            <div
              className={`glass-card rounded-2xl p-6 mb-6 text-center border ${
                scorePct === 100
                  ? 'border-yellow-400/40'
                  : scorePct >= 66
                  ? 'border-emerald-500/40'
                  : 'border-red-500/30'
              }`}
            >
              <div className="text-6xl mb-3">
                {scorePct === 100 ? '🏆' : scorePct >= 66 ? '✅' : '💪'}
              </div>
              <p className="font-display text-4xl font-black text-white mb-1">
                {scorePct}%
              </p>
              <p className="text-white/60 text-sm mb-4">
                {correctCount}/{totalQuestions} {lang === 'en' ? 'correct' : 'baitwile'}
              </p>
              <div className="flex items-center justify-center gap-6">
                <div>
                  <p className="text-2xl font-bold text-bitcoin-amber">+{lesson.xpReward}</p>
                  <p className="text-xs text-white/40">XP</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-bitcoin-orange">⚡ +{satsEarned}</p>
                  <p className="text-xs text-white/40">sats</p>
                </div>
              </div>
            </div>

            {/* Question review */}
            <div className="space-y-4 mb-6">
              {lesson.quiz.map((question, qIndex) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctIndex;
                return (
                  <div
                    key={question.id}
                    className={`glass-card rounded-2xl p-5 border ${
                      isCorrect ? 'border-emerald-500/30' : 'border-red-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
                      <p className="text-white text-sm font-semibold">{question.question[lang]}</p>
                    </div>

                    {!isCorrect && (
                      <div className="mb-2">
                        <p className="text-xs text-red-400 font-mono mb-1">
                          {lang === 'en' ? 'Your answer:' : 'Iyo wabula:'}
                        </p>
                        <p className="text-sm text-red-300/80 bg-red-500/10 px-3 py-2 rounded-lg">
                          {question.options[lang][userAnswer]}
                        </p>
                      </div>
                    )}

                    <div className="mb-3">
                      <p className="text-xs text-emerald-400 font-mono mb-1">
                        {lang === 'en' ? 'Correct answer:' : 'Iyo yaitwile:'}
                      </p>
                      <p className="text-sm text-emerald-300/80 bg-emerald-500/10 px-3 py-2 rounded-lg">
                        {question.options[lang][question.correctIndex]}
                      </p>
                    </div>

                    <div className="bg-surface-700 rounded-xl p-3">
                      <p className="text-xs text-white/40 font-mono mb-1">💡 {lang === 'en' ? 'Explanation' : 'Ukufundulula'}</p>
                      <p className="text-sm text-white/70">{question.explanation[lang]}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setQuizState('reading');
                  setContentPage(0);
                  setSelectedAnswers({});
                  setSubmitted(false);
                }}
                className="flex-1 bg-surface-700 hover:bg-surface-600 text-white py-4 rounded-xl transition-colors font-semibold"
              >
                {lang === 'en' ? '↩ Review Lesson' : '↩ Bwela ku Ifyakusambilila'}
              </button>
              <Link
                href="/"
                className="flex-1 bg-bitcoin-orange hover:bg-bitcoin-amber text-white py-4 rounded-xl transition-colors font-display font-bold text-center glow-orange"
              >
                {lang === 'en' ? 'Next Lesson →' : 'Imilimo Yikuya →'}
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
