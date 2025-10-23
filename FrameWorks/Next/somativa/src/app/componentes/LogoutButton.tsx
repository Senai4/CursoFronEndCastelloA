// components/LogoutButton.tsx
"use client"; // Este componente precisa de interação do usuário

import { useRouter } from 'next/navigation';
import React from 'react';

// Estilo CSS para o botão (pode mudar depois)
const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600'
};

export default function LogoutButton() {
    const router = useRouter(); // Para redirecionar o usuário

    const handleLogout = async () => {
        try {
            // 1. Chama a API de logout que acabamos de criar
            const response = await fetch('/api/usuarios/logout', {
                method: 'POST',
            });

            if (response.ok) {
                // 2. Se a API funcionou, manda o usuário para a tela de login
                router.push('/login');
            } else {
                console.error('Falha no logout');
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <button onClick={handleLogout} style={buttonStyle}>
            Logout
        </button>
    );
}