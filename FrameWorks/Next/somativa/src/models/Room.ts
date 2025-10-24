import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IRoom extends Document {
  nome: string; 
  capacidade: number; 
  recursos: string[]; 
}

const RoomSchema: Schema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "Por favor, informe o nome da sala."], 
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

const Room: Model<IRoom> =
  models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
