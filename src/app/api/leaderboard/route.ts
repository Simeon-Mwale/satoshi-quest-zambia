// src/app/api/leaderboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/leaderboard?limit=20&offset=0
export async function GET(req: NextRequest) {
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') ?? '20'), 50);
  const offset = parseInt(req.nextUrl.searchParams.get('offset') ?? '0');

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        orderBy: { totalXP: 'desc' },
        take: limit,
        skip: offset,
        select: {
          username: true,
          totalXP: true,
          totalSats: true,
          streak: true,
          level: true,
          _count: {
            select: { completedLessons: true },
          },
        },
      }),
      prisma.user.count(),
    ]);

    const ranked = users.map((u, i) => ({
      rank: offset + i + 1,
      username: u.username,
      totalXP: u.totalXP,
      totalSats: u.totalSats,
      streak: u.streak,
      level: u.level,
      completedLessons: u._count.completedLessons,
    }));

    return NextResponse.json({ leaderboard: ranked, total, limit, offset });
  } catch (error) {
    console.error('[GET /api/leaderboard]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
