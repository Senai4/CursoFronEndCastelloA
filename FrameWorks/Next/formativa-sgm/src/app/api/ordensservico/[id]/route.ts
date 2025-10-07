// rotas que precisam passar o ID nos parâmetros (GET by ID / PATCH / DELETE)

import {
  deleteOrdemServico,
  getOrdemServicoById,
  updateOrdemServico,
} from "@/controllers/OrdemServicoController";
import { NextRequest, NextResponse } from "next/server";

interface Parametro {
  id: string;
}

// GET (Busca uma Ordem de Serviço pelo ID)
export async function GET(
  request: NextRequest,
  { params }: { params: Parametro }
) {
  try {
    const { id } = params; //converte o parâmetro da URL em id
    const data = await getOrdemServicoById(id); //busca a ordem de serviço pelo id

    if (!data) {
      //erro se não for encontrada
      return NextResponse.json(
        { success: false, error: "Not Found" },
        { status: 404 }
      );
    }
    //se encontrada, retorna a ordem de serviço
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    //erro de conexão com o banco ou outro erro do servidor
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

// PATCH (Atualiza uma Ordem de Serviço pelo ID)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Parametro }
) {
  try {
    const { id } = params; //converte o parâmetro da URL em id
    const data = await req.json(); //converte o corpo da requisição para json

    const ordemServicoAtualizada = await updateOrdemServico(id, data);

    if (!ordemServicoAtualizada) {
      //erro se a ordem de serviço não for encontrada para atualizar
      return NextResponse.json(
        { success: false, error: "Not Found" },
        { status: 404 }
      );
    }
    //se encontrada e atualizada, retorna os dados atualizados
    return NextResponse.json({ success: true, data: ordemServicoAtualizada });
  } catch (error) {
    //erro de conexão com o banco ou outro erro do servidor
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

// DELETE (Deleta uma Ordem de Serviço pelo ID)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Parametro }
) {
  try {
    const { id } = params; //converte o parâmetro da URL em id
    await deleteOrdemServico(id); //deleta a ordem de serviço
    return NextResponse.json({
      success: true,
      message: "Ordem de serviço deletada com sucesso.",
    });
  } catch (error) {
    //erro de conexão com o banco ou outro erro do servidor
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
