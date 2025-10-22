import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import dbConnect from "@/services/mongodb";
import Reserva from "@/models/Reserva";

// Helper para pegar o PAYLOAD do usuário (ID e Função)
async function getUserPayloadFromToken() {
  const tokenCookie = (await cookies()).get("auth-token");
  if (!tokenCookie) throw new Error("Token não encontrado");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(tokenCookie.value, secret);

  return {
    userId: payload.id as string,
    userFuncao: payload.funcao as "admin" | "user",
  };
}

// --- DELETE: Cancelar uma reserva ---
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { userId, userFuncao } = await getUserPayloadFromToken();
    const reservaId = params.id; // ID da reserva vindo da URL

    const reserva = await Reserva.findById(reservaId);

    if (!reserva) {
      return NextResponse.json(
        { message: "Reserva não encontrada" },
        { status: 404 }
      );
    }

    // --- LÓGICA DE PERMISSÃO ---
    // O usuário é admin? OU
    // O usuário é o dono da reserva?
    if (userFuncao === "admin" || reserva.usuario.toString() === userId) {
      // Em vez de deletar, atualizamos o status para 'cancelada'
      // Isso mantém o histórico no banco.
      reserva.status = "cancelada";
      await reserva.save();

      return NextResponse.json({ message: "Reserva cancelada com sucesso" });
    } else {
      // Se não for admin E não for o dono
      return NextResponse.json({ message: "Não autorizado" }, { status: 403 }); // 403: Forbidden
    }
  } catch (error: any) {
    if (error.message === "Token não encontrado") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
