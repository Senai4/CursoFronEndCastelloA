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

// 2. Adicionamos a função para criar o Gerente, seguindo o mesmo modelo
export const criarGerente = async () => {
  await connectMongo();
  const gerenteEmail = "gerente@sgm.com";
  const gerenteExiste = await Usuario.findOne({ email: gerenteEmail });

  if (!gerenteExiste) {
    const gerente = new Usuario({
      nome: "Gerente Teste",
      email: gerenteEmail,
      senha: "gerente123",
      funcao: "gerente",
    });
    await gerente.save();
    console.log("✅ Usuário Gerente criado com Sucesso");
  } else {
    console.log("ℹ️ Usuário Gerente já Existe");
  }
};

// 3. Adicionamos a função para criar o Técnico, seguindo o mesmo modelo
export const criarTecnico = async () => {
  await connectMongo();
  const tecnicoEmail = "tecnico@sgm.com";
  const tecnicoExiste = await Usuario.findOne({ email: tecnicoEmail });

  if (!tecnicoExiste) {
    const tecnico = new Usuario({
      nome: "Técnico Teste",
      email: tecnicoEmail,
      senha: "tecnico123",
      funcao: "tecnico",
    });
    await tecnico.save();
    console.log("✅ Usuário Técnico criado com Sucesso");
  } else {
    console.log("ℹ️ Usuário Técnico já Existe");
  }
};

// 4. Função principal que executa todas as criações em sequência
const executarCriacao = async () => {
  try {
    await criarAdmin();
    await criarGerente();
    await criarTecnico();
    console.log("\n✨ Verificação de usuários concluída.");
    // Fechar conexão com o banco se necessário, dependendo da sua configuração
    // mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ocorreu um erro durante a criação dos usuários:", error);
  }
};

// Executa a função principal
executarCriacao();
