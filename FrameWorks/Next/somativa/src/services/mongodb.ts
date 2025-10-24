import mongoose from "mongoose";

const MONGO_URI = process.env.DATABASE_URL;

// Criar e Verificar o Endereço de Conexão
if (!MONGO_URI) {
  throw new Error("Crie o .env.local com a Variável DATABASE_URL");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// criar a função de conexão com o DB

async function connectMongo() {
  //verificar se já existe uma conexão
  if (cached.conn) return cached.conn;

  //se caso não existir a conexão
  if (!cached.promise) {
    const aguarde = { bufferCommands: false };
    //criar uma promessa de conexão
    cached.promise = mongoose.connect(MONGO_URI!, aguarde).then((mongoose) => {
      console.log("Conectado ao Mongo");
      return mongoose;
    });
  }

  try {

    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error; 
  }

  return cached.conn;
}

export default connectMongo;
