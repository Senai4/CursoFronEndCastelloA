import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface IReserva extends Document {
  room: mongoose.Types.ObjectId; // Referência ao model 'Sala'
  usuario: mongoose.Types.ObjectId; // Referência ao model 'Usuario'
  dataInicio: Date;
  dataFim: Date;
  status: "confirmada" | "cancelada";
}

const ReservaSchema: Schema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    dataInicio: { type: Date, required: true },
    dataFim: { type: Date, required: true },
    status: {
      type: String,
      enum: ["confirmada", "cancelada"],
      default: "confirmada",
    },
  },
  { timestamps: true }
);

// Índice para otimizar buscas por sala e data
ReservaSchema.index({ room: 1, dataInicio: 1, dataFim: 1 });

const Reserva: Model<IReserva> =
  mongoose.models.Reserva || model<IReserva>("Reserva", ReservaSchema);

export default Reserva;
