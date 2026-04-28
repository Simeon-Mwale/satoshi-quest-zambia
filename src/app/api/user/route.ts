// src/app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/user — create new user
export async function POST(req: NextRequest) {
  try {
    const { username, language } = await req.json();

    if (!username || typeof username !== 'string' || username.trim().length < 2) {
      return NextResponse.json({ error: 'Username must be at least 2 characters' }, { status: 400 });
    }

    const clean = username.trim().slice(0, 20);

    const existing = await prisma.user.findUnique({ where: { username: clean } });
    if (existing) {
      // Return existing user — treat as login
      return NextResponse.json({
        userId: existing.id,
        username: existing.username,
        isNew: false,
      });
    }

    const user = await prisma.user.create({
      data: {
        username: clean,
        language: language ?? 'en',
      },
    });

    return NextResponse.json({ userId: user.id, username: user.username, isNew: true }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/user]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/user?username=Mwale — reset progress (for testing)
export async function DELETE(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username');
  if (!username) return NextResponse.json({ error: 'username required' }, { status: 400 });

  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    await prisma.user.delete({ where: { username } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}
