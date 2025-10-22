// app/api/rooms/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/services/mongodb";
import Room from "@/models/Room"; // Importe seu model 'Room'

// --- GET: Listar todas as salas (rooms) ---
export async function GET() {
  try {
    await dbConnect();

    // Busca todas as salas (rooms) e ordena por nome
    const rooms = await Room.find({}).sort({ name: 1 }); // Usando 'name' do seu model Room

    return NextResponse.json(rooms);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
