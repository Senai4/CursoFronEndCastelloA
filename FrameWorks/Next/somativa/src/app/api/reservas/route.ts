import { NextResponse, NextRequest } from 'next/server';
import * as ReservationController from '@/controllers/ReservationController';

export async function POST(request: NextRequest) { // Mude para NextRequest para acessar headers
  try {
    // Pega o ID do usuário que o middleware validou e injetou no header
    const userId = request.headers.get('X-User-Id');
    if (!userId) {
      // Isso não deveria acontecer se o middleware estiver funcionando
      return NextResponse.json({ message: 'ID do usuário não encontrado.' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Adiciona o userId ao corpo da reserva para que o controller possa usá-lo
    const reservationData = { ...body, user: userId };

    const newReservation = await ReservationController.createReservation(reservationData);
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Erro ao criar reserva' }, { status: 400 });
  }
}