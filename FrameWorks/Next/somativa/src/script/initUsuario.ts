import Usuario from "@/models/Usuario";
import connectMongo from "@/services/mongodb";

// 1. Sua função original, sem alterações
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
