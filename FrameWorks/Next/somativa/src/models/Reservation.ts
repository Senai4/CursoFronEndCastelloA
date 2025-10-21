import mongoose, { Schema, Document, models, Model } from 'mongoose';
import { IUsuario } from './Usuario';
import { IRoom } from './Room';

export interface IReservation extends Document {
  startTime: Date;
  endTime: Date;
  user: IUsuario['_id']; // Referência ao Usuário
  room: IRoom['_id'];   // Referência à Sala
}

const ReservationSchema: Schema = new Schema({
  startTime: {
    type: Date,
    required: [true, 'Please provide the reservation start time.'],
  },
  endTime: {
    type: Date,
    required: [true, 'Please provide the reservation end time.'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // O nome do model de Usuário
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room', // O nome do model de Sala
    required: true,
  },
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

const Reservation: Model<IReservation> = models.Reservation || mongoose.model<IReservation>('Reservation', ReservationSchema);

export default Reservation;