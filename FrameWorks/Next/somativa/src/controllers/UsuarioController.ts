import dbConnect from "@/services/mongodb";
import Usuario, { IUsuario } from "@/models/Usuario";
import { SignJWT } from "jose"; 

// Função de registro 
export const registerUser = async (
  data: Pick<IUsuario, "nome" | "email" | "senha" | "funcao">
) => {
  await dbConnect();
  const existingUser = await Usuario.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Este endereço de e-mail já está cadastrado.");
  }
  const newUser = await Usuario.create(data);
  const userObject = newUser.toObject();
  delete userObject.senha;
  return userObject;
};

// Função de login (ATUALIZADA)
export const loginUser = async (data: Pick<IUsuario, "email" | "senha">) => {
  await dbConnect();
  const { email, senha } = data;

  if (!email || !senha) {
    throw new Error("E-mail e senha são obrigatórios.");
  }

  const user = await Usuario.findOne({ email }).select("+senha");
  if (!user) {
    throw new Error("Credenciais inválidas.");
  }

  const isMatch = await user.compareSenha(senha);
  if (!isMatch) {
    throw new Error("Credenciais inválidas.");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não está definido no .env.local");
  }
  const secretKey = new TextEncoder().encode(secret);

  
  const payload = {
    id: user._id.toString(),
    email: user.email,
    nome: user.nome,
    funcao: user.funcao, 
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h") 
    .sign(secretKey); 

  const userObject = user.toObject();
  delete userObject.senha;

  return { user: userObject, token };
};
