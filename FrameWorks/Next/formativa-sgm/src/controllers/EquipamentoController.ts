import Equipamento, { IEquipamento } from "@/models/Equipamento";
import connectMongo from "@/services/mongodb";

export const getEquipamentos = async () => {
  await connectMongo();
  const equipamentos = await Equipamento.find();
  return equipamentos;
};

export const getEquipamentoById = async (id: string) => {
  await connectMongo();
  const equipamento = await Equipamento.findById(id);
  return equipamento;
};

export const createEquipamento = async (data: Partial<IEquipamento>) => {
  await connectMongo();
  const novoEquipamento = new Equipamento(data);
  const equipamentoSalvo = await novoEquipamento.save();
  return equipamentoSalvo;
};

export const updateEquipamento = async (
  id: string,
  data: Partial<IEquipamento>
) => {
  await connectMongo();
  const equipamentoAtualizado = await Equipamento.findByIdAndUpdate(id, data, {
    new: true,
  });
  return equipamentoAtualizado;
};

export const deleteEquipamento = async (id: string) => {
  await connectMongo();
  await Equipamento.findByIdAndDelete(id);
};
