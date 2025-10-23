import { NextResponse } from 'next/server';
import dbConnect from '@/services/mongodb';
import Room from '@/models/Room'; // Importa o model Room

// --- PUT: Atualizar uma sala (Admin) ---
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const roomId = params.id;
    const body = await request.json(); // { name, capacity, features }
    
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      body,
      { new: true, runValidators: true } // Opções: retornar doc novo, rodar validadores
    );

    if (!updatedRoom) {
      return NextResponse.json({ message: 'Sala (Room) não encontrada' }, { status: 404 });
    }

    return NextResponse.json(updatedRoom);

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// --- DELETE: Deletar uma sala (Admin) ---
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const roomId = params.id;

    // TODO: Adicionar lógica para não deletar se houver reservas futuras
    
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return NextResponse.json({ message: 'Sala (Room) não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Sala (Room) deletada com sucesso' });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}