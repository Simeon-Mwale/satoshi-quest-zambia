// src/app/api/progress/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/progress?username=Mwale
export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username');
  if (!username) {
    return NextResponse.json({ error: 'username required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        completedLessons: true,
        completedModules: true,
        quizScores: true,
        badges: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      userId: user.id,
      username: user.username,
      totalXP: user.totalXP,
      totalSats: user.totalSats,
      streak: user.streak,
      lastActivityDate: user.lastActivityDate,
      level: user.level,
      language: user.language,
      completedLessons: user.completedLessons.map((l) => l.lessonId),
      completedModules: user.completedModules.map((m) => m.moduleId),
      quizScores: Object.fromEntries(user.quizScores.map((q) => [q.lessonId, q.score])),
      badges: user.badges.map((b) => b.name),
    });
  } catch (error) {
    console.error('[GET /api/progress]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/progress — create or update full progress
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      username,
      totalXP,
      totalSats,
      streak,
      lastActivityDate,
      level,
      language,
      completedLessons,
      completedModules,
      quizScores,
      badges,
    } = body;

    if (!username) {
      return NextResponse.json({ error: 'username required' }, { status: 400 });
    }

    // Upsert user
    const user = await prisma.user.upsert({
      where: { username },
      update: {
        totalXP,
        totalSats,
        streak,
        lastActivityDate,
        level,
        language,
      },
      create: {
        username,
        totalXP: totalXP ?? 0,
        totalSats: totalSats ?? 0,
        streak: streak ?? 0,
        lastActivityDate,
        level: level ?? 1,
        language: language ?? 'en',
      },
    });

    // Sync completed lessons
    if (Array.isArray(completedLessons)) {
      for (const lessonId of completedLessons) {
        await prisma.completedLesson.upsert({
          where: { userId_lessonId: { userId: user.id, lessonId } },
          update: {},
          create: { userId: user.id, lessonId },
        });
      }
    }

    // Sync completed modules
    if (Array.isArray(completedModules)) {
      for (const moduleId of completedModules) {
        await prisma.completedModule.upsert({
          where: { userId_moduleId: { userId: user.id, moduleId } },
          update: {},
          create: { userId: user.id, moduleId },
        });
      }
    }

    // Sync quiz scores
    if (quizScores && typeof quizScores === 'object') {
      for (const [lessonId, score] of Object.entries(quizScores)) {
        await prisma.quizScore.upsert({
          where: { userId_lessonId: { userId: user.id, lessonId } },
          update: { score: score as number },
          create: { userId: user.id, lessonId, score: score as number },
        });
      }
    }

    // Sync badges
    if (Array.isArray(badges)) {
      for (const name of badges) {
        await prisma.badge.upsert({
          where: { userId_name: { userId: user.id, name } },
          update: {},
          create: { userId: user.id, name },
        });
      }
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error('[POST /api/progress]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
