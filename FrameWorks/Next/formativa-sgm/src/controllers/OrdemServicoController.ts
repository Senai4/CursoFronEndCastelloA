import OrdemServico, { IOrdemServico } from "@/models/OrdemServico";
import connectMongo from "@/services/mongodb";

export const getOrdensServico = async () => {
  await connectMongo();
  const ordensServico = await OrdemServico.find();
  return ordensServico;
};

export const getOrdemServicoById = async (id: string) => {
  await connectMongo();
  const ordemServico = await OrdemServico.findById(id);
  return ordemServico;
};

export const createOrdemServico = async (data: Partial<IOrdemServico>) => {
  await connectMongo();
  const novaOrdemServico = new OrdemServico(data);
  const ordemServicoSalva = await novaOrdemServico.save();
  return ordemServicoSalva;
};

export const updateOrdemServico = async (
  id: string,
  data: Partial<IOrdemServico>
) => {
  await connectMongo();
  const ordemServicoAtualizada = await OrdemServico.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
  return ordemServicoAtualizada;
};

export const deleteOrdemServico = async (id: string) => {
  await connectMongo();
  await OrdemServico.findByIdAndDelete(id);
};
