import dbConnect from '@/services/mongodb';
import Usuario, { IUsuario } from '@/models/Usuario';
import jwt from 'jsonwebtoken';

// Função para registrar um novo usuário
export const registerUser = async (data: Pick<IUsuario, 'nome' | 'email' | 'senha' | 'funcao'>) => {
  await dbConnect();

  // 1. Verifica se o email já está em uso
  const existingUser = await Usuario.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('Este endereço de e-mail já está cadastrado.');
  }

  // 2. Cria o novo usuário
  // A criptografia da senha acontece automaticamente graças ao .pre('save') no seu model
  const newUser = await Usuario.create(data);
  
  // 3. Remove a senha do objeto antes de retornar
  const userObject = newUser.toObject();
  delete userObject.senha;

  return userObject;
};

// Função para fazer login de um usuário
export const loginUser = async (data: Pick<IUsuario, 'email' | 'senha'>) => {
  await dbConnect();
  const { email, senha } = data;

  if (!email || !senha) {
    throw new Error('E-mail e senha são obrigatórios.');
  }

  // 1. Encontra o usuário pelo e-mail
  // Usamos .select('+senha') para forçar o Mongoose a incluir o campo da senha,
  // já que definimos `select: false` no schema.
  const user = await Usuario.findOne({ email }).select('+senha');
  if (!user) {
    throw new Error('Credenciais inválidas.'); // Mensagem genérica por segurança
  }

  // 2. Compara a senha enviada com a senha hashada no banco
  // Usamos o método `compareSenha` que você criou no model!
  const isMatch = await user.compareSenha(senha);
  if (!isMatch) {
    throw new Error('Credenciais inválidas.'); // Mensagem genérica
  }

  // 3. Se a senha está correta, gera um JWT
  const token = jwt.sign(
    { id: user._id, role: user.funcao }, // O que guardamos no token (payload)
    process.env.JWT_SECRET!, // A chave secreta do .env
    { expiresIn: '8h' } // Tempo de expiração do token
  );

  // 4. Prepara o objeto do usuário para retorno (sem a senha)
  const userObject = user.toObject();
  delete userObject.senha;

  return { user: userObject, token };
};