// src/app/api/progress/quiz/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/progress/quiz
// Body: { username, lessonId, score, satsEarned }
export async function POST(req: NextRequest) {
  try {
    const { username, lessonId, score, satsEarned } = await req.json();

    if (!username || !lessonId || score === undefined) {
      return NextResponse.json({ error: 'username, lessonId, score required' }, { status: 400 });
    }

    if (score < 0 || score > 100) {
      return NextResponse.json({ error: 'score must be 0–100' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Only award sats if this is the first quiz attempt for this lesson
    const existing = await prisma.quizScore.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId } },
    });

    const isFirstAttempt = !existing;

    await prisma.$transaction([
      // Upsert quiz score (keep best score)
      prisma.quizScore.upsert({
        where: { userId_lessonId: { userId: user.id, lessonId } },
        update: { score: Math.max(existing?.score ?? 0, score) },
        create: { userId: user.id, lessonId, score },
      }),
      // Award sats only on first attempt
      ...(isFirstAttempt && satsEarned > 0
        ? [
            prisma.user.update({
              where: { id: user.id },
              data: { totalSats: { increment: satsEarned } },
            }),
          ]
        : []),
    ]);

    return NextResponse.json({
      success: true,
      score,
      isFirstAttempt,
      satsAwarded: isFirstAttempt ? satsEarned : 0,
    });
  } catch (error) {
    console.error('[POST /api/progress/quiz]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
