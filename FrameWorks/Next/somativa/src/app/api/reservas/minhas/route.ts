// app/api/reservas/minhas/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import dbConnect from "@/services/mongodb";
import Reserva from "@/models/Reserva";
import Room from "@/models/Room"; // 1. O import (que estava apagado)

// Helper para pegar o ID do usuário logado
async function getUserIdFromToken() {
  const tokenCookie = (await cookies()).get("auth-token"); // Removi o 'await' desnecessário
  if (!tokenCookie) throw new Error("Token não encontrado");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(tokenCookie.value, secret);

  return payload.id as string;
}

// --- GET: Listar as reservas APENAS do usuário logado ---
export async function GET() {
  try {
    await dbConnect();
    const userId = await getUserIdFromToken();

    // 2. ⬇️ ESTA É A CORREÇÃO MÁGICA ⬇️
    // Esta linha "inútil" força o Next.js a registrar o model 'Room'.
    // Sem ela, o .populate() falha com erro 500.
    const _ = Room.modelName;

    const minhasReservas = await Reserva.find({
      usuario: userId,
      status: "confirmada",
      dataInicio: { $gte: new Date() },
    })
      .populate("room", "name")
      .sort({ dataInicio: 1 });
    return NextResponse.json(minhasReservas);
  } catch (error: any) {
    // Vamos manter o log de erro detalhado por via das dúvidas
    console.error("--- ERRO FATAL NA API /api/reservas/minhas ---");
    console.error(error);
    console.error("------------------------------------------------");

    if (error.message === "Token não encontrado") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }
    return NextResponse.json(
      { message: "Erro ao buscar reservas", error: error.message },
      { status: 500 }
    );
  }
}
