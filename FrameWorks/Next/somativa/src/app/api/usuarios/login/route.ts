import { NextResponse } from 'next/server';
import * as UsuarioController from '@/controllers/UsuarioController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, senha } = body;

    const { user, token } = await UsuarioController.loginUser({ email, senha });

    // Retorna os dados do usuário e o token de acesso
    return NextResponse.json({ user, token });
  } catch (error: any) {
    // Retorna "Credenciais inválidas" para erros de login
    return NextResponse.json({ message: error.message || 'Erro interno do servidor' }, { status: 401 });
  }
}