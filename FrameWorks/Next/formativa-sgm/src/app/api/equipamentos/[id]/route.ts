import {
  deleteEquipamento,
  getEquipamentoById,
  updateEquipamento,
} from "@/controllers/EquipamentoController";
import { NextRequest, NextResponse } from "next/server";

interface Parametro {
  id: string;
}

// GET (Busca um equipamento pelo ID)
export async function GET(
  request: NextRequest,
  { params }: { params: Parametro }
) {
  try {
    const { id } = params;
    const data = await getEquipamentoById(id);

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Equipamento não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

// PATCH (Atualiza um equipamento pelo ID)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Parametro }
) {
  try {
    const { id } = params;
    const data = await req.json();

    const equipamentoAtualizado = await updateEquipamento(id, data);

    if (!equipamentoAtualizado) {
      return NextResponse.json(
        { success: false, error: "Equipamento não encontrado para atualizar" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: equipamentoAtualizado });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

// DELETE (Deleta um equipamento pelo ID)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Parametro }
) {
  try {
    const { id } = params;
    await deleteEquipamento(id);
    // Um DELETE bem-sucedido geralmente retorna um status 204 (No Content)
    // ou um JSON confirmando a operação.
    return NextResponse.json({
      success: true,
      message: "Equipamento deletado com sucesso.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
