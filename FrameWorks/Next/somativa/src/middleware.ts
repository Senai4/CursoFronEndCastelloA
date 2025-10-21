import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Biblioteca moderna e segura para JWT em ambientes Edge

// Defina os tipos para o payload do token para ter autocomplete e segurança
interface UserJwtPayload {
  id: string;
  role: 'admin' | 'user';
  iat: number; // Issued at
  exp: number; // Expires at
}

// 1. FUNÇÃO PRINCIPAL DO MIDDLEWARE
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas que exigem a função 'admin'
  const adminRoutes = [
    '/api/salas', // Acesso total ao CRUD de salas
  ];

  // Rotas que exigem apenas um usuário logado (qualquer função)
  const protectedRoutes = [
    '/api/reservas'
  ];

  // Verifica se a rota atual precisa de proteção (seja admin ou geral)
  const requiresAdmin = adminRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Se a rota não é protegida, deixa passar
  if (!requiresAdmin && !isProtectedRoute) {
    return NextResponse.next();
  }

  // 2. EXTRAÇÃO E VALIDAÇÃO DO TOKEN
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    return NextResponse.json({ message: 'Token de autenticação não fornecido.' }, { status: 401 });
  }

  try {
    // Usando 'jose' para verificar o token, é mais compatível com o Edge Runtime do Next.js
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify<UserJwtPayload>(token, secret);

    // 3. VERIFICAÇÃO DE PERMISSÃO (ROLE)
    if (requiresAdmin && payload.role !== 'admin') {
      return NextResponse.json({ message: 'Acesso negado. Requer permissão de administrador.' }, { status: 403 });
    }
    
    // Se chegou até aqui, o usuário está autenticado e tem permissão.
    // Opcional: Adicionar o ID do usuário aos headers para fácil acesso no controller
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-User-Id', payload.id);
    requestHeaders.set('X-User-Role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    // O token é inválido (expirado, malformado, etc.)
    return NextResponse.json({ message: 'Token inválido ou expirado.' }, { status: 401 });
  }
}

// 4. CONFIGURAÇÃO DO MATCHER
// Isso informa ao Next.js em quais rotas o middleware deve ser executado.
// É mais eficiente do que verificar a rota dentro da função.
export const config = {
  matcher: [
    '/api/salas/:path*', // Aplica a /api/salas e todas as suas sub-rotas (ex: /api/salas/123)
    '/api/reservas/:path*', // Aplica a /api/reservas e todas as suas sub-rotas
  ],
};