// app/api/rooms/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/services/mongodb';
import Room from '@/models/Room'; // Importe seu model 'Room'

// --- GET: Listar todas as salas (rooms) ---
// (Esta função você provavelmente JÁ TEM. Mantenha ela)
export async function GET() {
  try {
    await dbConnect();

    const rooms = await Room.find({}).sort({ name: 1 }); 
    
    return NextResponse.json(rooms);

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


// --- POST: Criar uma nova sala (Admin) ---
// (Esta função é a que estava FALTANDO e causa o erro 405)
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // 1. Recebe os nomes em Inglês que o frontend envia
    const { name, capacity, features } = body; 

    // 2. Validação
    if (!name || !capacity) {
      return NextResponse.json(
        { message: 'Nome e capacidade são obrigatórios.' },
        { status: 400 }
      );
    }

    // 3. Mapeia para os nomes em Português do seu Model
    const newRoom = new Room({
      nome: name,           // <-- CORREÇÃO: 'name' vira 'nome'
      capacidade: capacity, // <-- CORREÇÃO: 'capacity' vira 'capacidade'
      recursos: features || []  // <-- CORREÇÃO: 'features' vira 'recursos'
    });

    // 4. Agora o .save() vai funcionar
    const savedRoom = await newRoom.save();
    return NextResponse.json(savedRoom, { status: 201 }); // 201: Created

  } catch (error: any) {
    // Erro de duplicidade (se o nome já existir)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Já existe uma sala com este nome.' },
        { status: 409 } // 409: Conflict
      );
    }

    // Para qualquer outro erro, imprima no console
    console.error('--- ERRO FATAL NA API POST /api/rooms ---');
    console.error(error);
    console.error('------------------------------------------');
    
    return NextResponse.json(
      { message: 'Erro ao criar a sala.', error: error.message }, 
      { status: 500 }
    );
  }
}