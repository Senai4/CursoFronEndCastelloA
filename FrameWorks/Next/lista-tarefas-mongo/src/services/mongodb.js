//fazer a conexão com o MongoDB (mongoose)

import mongoose from "mongoose";

// arrowFunction

const connectMongo = async () => {
  mongoose
    .connect(process.env.DATABASE_URL) //estabelece conexão com BD
    .then(() => console.log("Conectado com o MongoDB"))
    .catch((err) => console.error("Erro ao conectar", err));

  //conexão simples com mongoDB
};

export default connectMongo;
//modulo pode ser usado em outras ações do código

