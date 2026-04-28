// src/app/api/progress/streak/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/progress/streak
// Body: { username }
// Call this once per day when user opens the app
export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    if (!username) {
      return NextResponse.json({ error: 'username required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86_400_000).toDateString();

    // Already updated today — no change
    if (user.lastActivityDate === today) {
      return NextResponse.json({ streak: user.streak, updated: false });
    }

    let newStreak: number;
    if (user.lastActivityDate === yesterday) {
      newStreak = user.streak + 1;
    } else {
      // Streak broken
      newStreak = 1;
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { streak: newStreak, lastActivityDate: today },
    });

    return NextResponse.json({
      streak: updated.streak,
      updated: true,
      streakBroken: newStreak === 1 && user.streak > 1,
    });
  } catch (error) {
    console.error('[POST /api/progress/streak]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
