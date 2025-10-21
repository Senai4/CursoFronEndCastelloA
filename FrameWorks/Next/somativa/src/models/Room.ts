import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  capacity: number;
  features: string[];
}

const RoomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a room name.'],
    unique: true,
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide the room capacity.'],
  },
  features: {
    type: [String], // Array de strings, ex: ["Projetor", "Quadro Branco", "Ar Condicionado"]
    default: [],
  },
}, {
  timestamps: true
});

const Room: Model<IRoom> = models.Room || mongoose.model<IRoom>('Room', RoomSchema);

export default Room;