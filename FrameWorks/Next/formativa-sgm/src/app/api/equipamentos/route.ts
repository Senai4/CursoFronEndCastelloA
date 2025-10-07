import {
  createEquipamento,
  getEquipamentos,
} from "@/controllers/EquipamentoController";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getEquipamentos(); // Busca todos os equipamentos
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // Pega os dados do corpo da requisição
    const novoEquipamento = await createEquipamento(data);
    return NextResponse.json(
      { success: true, data: novoEquipamento },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 }); // Bad Request se os dados forem inválidos
  }
}
