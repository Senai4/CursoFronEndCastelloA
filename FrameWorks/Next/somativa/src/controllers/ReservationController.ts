import dbConnect from '@/services/mongodb';
import Reservation, { IReserva } from '@/models/Reserva';
import { startOfDay, endOfDay } from 'date-fns'; 

const checkForConflict = async (roomId: string, startTime: Date, endTime: Date): Promise<boolean> => {
  const existingReservation = await Reservation.findOne({
    room: roomId,
    $or: [
     
      { startTime: { $gte: startTime, $lt: endTime } },
     
      { endTime: { $gt: startTime, $lte: endTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
    ]
  });

  return !!existingReservation; 
};


// Criar uma nova reserva
export const createReservation = async (data: { user: string; room: string; startTime: Date; endTime: Date }): Promise<IReserva> => {
  await dbConnect();
  const { user, room, startTime, endTime } = data;
  
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    throw new Error('O horário de término deve ser posterior ao de início.');
  }

  const hasConflict = await checkForConflict(room, start, end);
  if (hasConflict) {
    throw new Error('Este horário já está reservado. Por favor, escolha outro.');
  }

  const newReservation = await Reservation.create({ user, room, startTime: start, endTime: end });
  return newReservation;
};

// Obter reservas para uma sala em um dia específico
export const getReservationsByRoomAndDate = async (roomId: string, date: string) => {
    await dbConnect();
    const searchDate = new Date(date);
    
    // Usando date-fns para pegar o início e o fim do dia corretamente
    const dayStart = startOfDay(searchDate);
    const dayEnd = endOfDay(searchDate);
    
    const reservations = await Reservation.find({
        room: roomId,
        startTime: {
            $gte: dayStart,
            $lte: dayEnd
        }
    })
    .populate('user', 'nome email') // Traz o nome e email do usuário junto
    .sort({ startTime: 'asc' });

    return reservations;
}

// Deletar uma reserva
export const deleteReservation = async (id: string) => {
  await dbConnect();
  await Reservation.findByIdAndDelete(id);
};