import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET; 

if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET não está definido no .env.local");
}
const secret = new TextEncoder().encode(JWT_SECRET_KEY);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get("auth-token"); 

  // Se o usuário está tentando acessar o dashboard sem token
  if (pathname.startsWith("/dashboard") && !tokenCookie) {
    console.log("Middleware: Sem token, redirecionando para /login");
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Se ele tem um token, vamos verificar se é válido
  if (tokenCookie) {
    try {
      await jwtVerify(tokenCookie.value, secret);
      // Token é válido, continue
      return NextResponse.next();
    } catch (err) {
      // Token inválido ou expirado
      console.log("Middleware: Token inválido, redirecionando para /login");
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      const response = NextResponse.redirect(url);

      // Limpa o cookie inválido
      response.cookies.delete("auth-token");
      return response;
    }
  }

  return NextResponse.next();
}

// Define quais rotas o middleware vai "observar"
export const config = {
  matcher: ["/dashboard/:path*", "/api/reservas/:path*"], // Protege o dashboard e as APIs de reserva
};
