import mongoose, { Schema, Document, models, Model } from "mongoose";

// 1. MUDANÇA: Atualize a interface para usar os nomes em português
export interface IRoom extends Document {
  nome: string; // 'name' mudou para 'nome'
  capacidade: number; // 'capacity' mudou para 'capacidade'
  recursos: string[]; // 'features' mudou para 'recursos'
}

const RoomSchema: Schema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "Por favor, informe o nome da sala."], // 'name' mudou para 'nome'
      unique: true,
    },
    capacidade: {
      type: Number,
      required: [true, "Por favor, informe a capacidade da sala."],
    },
    recursos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// A exportação continua a mesma
const Room: Model<IRoom> =
  models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
