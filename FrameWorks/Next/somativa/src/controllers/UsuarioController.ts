// src/controllers/UsuarioController.ts

import dbConnect from "@/services/mongodb";
import Usuario, { IUsuario } from "@/models/Usuario";
// import jwt from 'jsonwebtoken'; // 1. REMOVA a biblioteca 'jsonwebtoken'
import { SignJWT } from "jose"; // 2. IMPORTE 'jose' no lugar

// Função de registro (não mudou, está perfeita)
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

  // --- 3. Geração de JWT ATUALIZADA para 'jose' ---

  // 3.1. Valide e pegue a chave secreta do .env
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não está definido no .env.local");
  }
  const secretKey = new TextEncoder().encode(secret);

  // 3.2. Crie o PAYLOAD COMPLETO que o dashboard espera
  const payload = {
    id: user._id.toString(),
    email: user.email,
    nome: user.nome,
    funcao: user.funcao, // Usando 'funcao', como o dashboard espera
  }; // 3.3. Crie o token usando 'jose'

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h") // O mesmo '8h' que você já tinha
    .sign(secretKey); // 4. Prepara o objeto do usuário para retorno (sem a senha)

  const userObject = user.toObject();
  delete userObject.senha;

  return { user: userObject, token };
};
