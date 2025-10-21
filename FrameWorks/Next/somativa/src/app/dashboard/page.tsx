'use client'; // Muito importante para usar hooks como useEffect e useRouter

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Definimos um tipo para os dados do usuário para ser mais seguro
interface UserData {
    nome: string;
    email: string;
    funcao: 'admin' | 'user';
}

export default function DashboardPage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // 1. Tenta pegar o token do localStorage
        const token = localStorage.getItem('authToken');
        const userDataString = localStorage.getItem('userData');

        // 2. Se não houver token, chuta o usuário para a página de login
        if (!token || !userDataString) {
            router.push('/login');
        } else {
            // Se encontrou os dados, atualiza nosso estado com as infos do usuário
            setUser(JSON.parse(userDataString));
            setLoading(false); // Termina o carregamento
        }
    }, [router]); // O useEffect será re-executado se o router mudar

    // Função para fazer logout
    const handleLogout = () => {
        // Limpa o localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        // Redireciona para o login
        router.push('/login');
    };

    // Enquanto a verificação do token estiver acontecendo, mostramos uma mensagem
    if (loading) {
        return <p>Verificando autenticação...</p>;
    }

    // Se passou pela verificação, mostramos o conteúdo da página
    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            {user && (
                <div>
                    <p>Seja bem-vindo(a), <strong>{user.nome}</strong>!</p>
                    <p>Email: {user.email}</p>
                    <p>Função: {user.funcao}</p>
                </div>
            )}
            <button
                onClick={handleLogout}
                style={{ marginTop: '20px', padding: '10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                Sair (Logout)
            </button>

            {/* Aqui você começará a adicionar o conteúdo real do seu sistema */}
            <div style={{ marginTop: '40px' }}>
                <h2>Reservas do Dia</h2>
                {/* Futuramente, aqui você fará uma chamada à API para buscar as salas e reservas */}
                <p>Em breve: Visualização das salas e suas reservas.</p>
            </div>
        </div>
    );
}