import Usuario from "@/models/Usuario";
import connectMongo from "@/services/mongodb";
import mongoose from "mongoose";

export const criarAdmin = async () => {
  await connectMongo();
  const adminEmail = "admin@admin.com";
  //verificar se usuario já existe
  const adminExiste = await Usuario.findOne({ email: adminEmail });
  //se não achado
  if (!adminExiste) {
    const admin = new Usuario({
      nome: "Administrador",
      email: adminEmail,
      senha: "admin123", // Lembre-se que em produção a senha deve ser criptografada
      funcao: "admin",
    });
    await admin.save();
    console.log("✅ Usuário Administrador criado com Sucesso");
  } else {
    console.log("ℹ️ Usuário Administrador já Existe");
  }
};

(async () => {
  console.log("Iniciando script para criar admin...");
  try {
    await criarAdmin(); // Chama a função que você já criou
  } catch (error) {
    console.error("Erro ao executar o script:", error);
    process.exit(1); // Sai do script com erro
  } finally {
    // Independentemente de sucesso ou falha, fecha a conexão
    await mongoose.disconnect();
    console.log("Conexão com o banco fechada. Script finalizado.");
    process.exit(0); // Sai do script com sucesso
  }
})();
