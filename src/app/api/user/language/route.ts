// src/app/api/user/language/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/user/language
// Body: { username, language: 'en' | 'bem' | 'nya' }
export async function PATCH(req: NextRequest) {
  try {
    const { username, language } = await req.json();

    if (!username || !['en', 'bem', 'nya'].includes(language)) {
      return NextResponse.json({ error: "language must be 'en', 'bem', or 'nya'" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { username },
      data: { language },
    });

    return NextResponse.json({ success: true, language: user.language });
  } catch (error) {
    console.error('[PATCH /api/user/language]', error);
    return NextResponse.json({ error: 'User not found or server error' }, { status: 500 });
  }
}
