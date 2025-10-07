//rotas que não precisam de ID ( GET / POST)

import {
  createOrdemServico,
  getOrdensServico,
} from "@/controllers/OrdemServicoController";
import { NextRequest, NextResponse } from "next/server";

// http -> request
export async function GET() {
  try {
    const data = await getOrdensServico(); //busca todos os dados da coleção
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function POST(req: NextRequest) {
  //passa os dados do corpo da requisição (JSON)
  try {
    const data = await req.json();
    const novaOrdemServico = await createOrdemServico(data);
    return NextResponse.json({ success: true, data: novaOrdemServico });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
