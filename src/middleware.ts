// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/signin', '/signup', '/api/auth', '/_next', '/favicon.ico'];
const LOGIN_PATH = '/signin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Пропускаем публичные пути
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('@token')?.value;

  // Если токена нет — редиректим на логин
  if (!token) {
    const url = new URL(LOGIN_PATH, request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Проверяем валидность токена через API
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Invalid token');

    // Токен валиден — продолжаем
    return NextResponse.next();
  } catch (error) {
    console.error('Token validation error:', error);
    // Токен невалиден — очищаем куки и редиректим
    const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    response.cookies.delete('@token');
    return response;
  }
}

// Применяем middleware ко всем защищённым маршрутам
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes under /api (кроме auth)
     * - Static files
     * - Public pages
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};