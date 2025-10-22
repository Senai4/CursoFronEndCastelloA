import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import dbConnect from "@/services/mongodb";
import Reserva from "@/models/Reserva";
import Sala from "@/models/Room"; // Importamos Sala para popular
import Usuario from "@/models/Usuario"; // Importamos Usuário para popular

// Helper para pegar o ID do usuário logado a partir do token
async function getUserIdFromToken() {
  const tokenCookie = (await cookies()).get("auth-token");
  if (!tokenCookie) throw new Error("Token não encontrado");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(tokenCookie.value, secret);

  return payload.id as string; // Pegamos o ID do payload
}

// --- POST: Criar uma nova reserva ---
export async function POST(request: Request) {
  try {
    await dbConnect();
    const userId = await getUserIdFromToken(); // Pega o usuário logado
    const body = await request.json();
    const { sala, dataInicio, dataFim } = body;

    // Converte as strings de data/hora em objetos Date
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    // --- LÓGICA DE CONFLITO (O requisito principal) ---
    // Procura por qualquer reserva na MESMA SALA, que esteja CONFIRMADA,
    // e que TENHA SOBREPOSIÇÃO de horário.
    const conflito = await Reserva.findOne({
      sala: sala,
      status: "confirmada",
      $or: [
        // A nova reserva começa DURANTE uma existente
        { dataInicio: { $lt: fim }, dataFim: { $gt: inicio } },
        // A nova reserva TERMINA DURANTE uma existente
        // (Este $or cobre todos os casos de sobreposição)
      ],
    });

    if (conflito) {
      // 409: Conflict
      return NextResponse.json(
        {
          message: "Horário indisponível. Já existe uma reserva neste período.",
        },
        { status: 409 }
      );
    }

    // Se não houver conflito, cria a reserva
    const novaReserva = new Reserva({
      sala,
      usuario: userId,
      dataInicio: inicio,
      dataFim: fim,
    });

    await novaReserva.save();
    return NextResponse.json(novaReserva, { status: 201 });
  } catch (error: any) {
    if (error.message === "Token não encontrado") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// --- GET: Listar as reservas (para ver disponibilidade) ---
export async function GET(request: Request) {
  try {
    await dbConnect();

    // Permite filtrar por data, ex: /api/reservas?data=2025-10-22
    const { searchParams } = new URL(request.url);
    const data = searchParams.get("data");

    let query: any = { status: "confirmada" };

    if (data) {
      const dataInicio = new Date(data); // ex: 2025-10-22T00:00:00
      dataInicio.setUTCHours(0, 0, 0, 0); // Começo do dia em UTC

      const dataFim = new Date(data);
      dataFim.setUTCHours(23, 59, 59, 999); // Fim do dia em UTC

      query.dataInicio = { $gte: dataInicio, $lte: dataFim };
    }

    const reservas = await Reserva.find(query)
      .populate("room", "nome") // Puxa o nome da sala
      .populate("usuario", "nome email") // Puxa nome/email do usuário
      .sort({ dataInicio: 1 }); // Ordena por hora de início

    return NextResponse.json(reservas);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
