// src/app/api/progress/lesson/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getLevel } from '@/lib/store';

// POST /api/progress/lesson
// Body: { username, lessonId, xpReward, satsReward }
export async function POST(req: NextRequest) {
  try {
    const { username, lessonId, xpReward, satsReward } = await req.json();

    if (!username || !lessonId) {
      return NextResponse.json({ error: 'username and lessonId required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already completed — no double rewards
    const alreadyDone = await prisma.completedLesson.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId } },
    });

    if (alreadyDone) {
      return NextResponse.json({ message: 'Already completed', alreadyDone: true });
    }

    const newXP = user.totalXP + (xpReward ?? 0);
    const newSats = user.totalSats + (satsReward ?? 0);
    const newLevel = getLevel(newXP);

    // Update user + create completed lesson in a transaction
    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { totalXP: newXP, totalSats: newSats, level: newLevel },
      }),
      prisma.completedLesson.create({
        data: { userId: user.id, lessonId },
      }),
    ]);

    return NextResponse.json({
      success: true,
      totalXP: updatedUser.totalXP,
      totalSats: updatedUser.totalSats,
      level: updatedUser.level,
      leveledUp: newLevel > user.level,
    });
  } catch (error) {
    console.error('[POST /api/progress/lesson]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
