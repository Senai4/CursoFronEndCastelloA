import dbConnect from '@/services/mongodb';
import Room, { IRoom } from '@/models/Room';

// Criar uma nova sala (Admin)
export const createRoom = async (data: { name: string; capacity: number; features: string[] }): Promise<IRoom> => {
  await dbConnect();
  const newRoom = await Room.create(data);
  return newRoom;
};

// Obter todas as salas
export const getAllRooms = async (): Promise<IRoom[]> => {
  await dbConnect();
  const rooms = await Room.find({}).sort({ name: 1 });
  return rooms;
};

// Obter uma sala por ID
export const getRoomById = async (id: string): Promise<IRoom | null> => {
  await dbConnect();
  const room = await Room.findById(id);
  return room;
};

// Atualizar uma sala (Admin)
export const updateRoom = async (id:string, data: Partial<IRoom>): Promise<IRoom | null> => {
    await dbConnect();
    const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return updatedRoom;
}

// Deletar uma sala (Admin)
export const deleteRoom = async (id: string) => {
    await dbConnect();
    await Room.findByIdAndDelete(id);
}