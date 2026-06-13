import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE } from '@/server/auth/session';
import { getSettings, saveSettings } from '@/server/settings/repository';
import type { AppSettings } from '@/server/store/types';

export const runtime = 'nodejs';

async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ settings: getSettings() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as AppSettings;

    if (
      !body ||
      !Array.isArray(body.telegramRecipients) ||
      !body.telegramRecipients.every((r) => typeof r === 'string')
    ) {
      return NextResponse.json(
        { error: 'telegramRecipients must be an array of strings' },
        { status: 400 },
      );
    }

    saveSettings(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Validation error';
    return NextResponse.json({ error: message.slice(0, 300) }, { status: 400 });
  }
}
