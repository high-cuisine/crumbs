import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/server/auth/session';

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Страница и API логина доступны без сессии.
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login')) {
    return NextResponse.next();
  }

  // Server Actions (POST с Next-Action) нельзя редиректить — клиент ждёт RSC-ответ,
  // а не HTML страницы логина. Пропускаем: saveSection сам проверяет сессию и вызывает redirect().
  if (request.headers.has('next-action')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.search = '';
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}
