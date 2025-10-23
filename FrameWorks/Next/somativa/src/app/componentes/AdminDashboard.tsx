"use client";

import React from 'react';
import GerenciadorSalas from './GerenciadorSalas'; // 1. Importe o gerenciador
import LogoutButton from './LogoutButton'; // 2. Importe o botão de Sair
import styles from './UserDashboard.module.css'; // 3. Reutilize o estilo principal

export default function AdminDashboard() {
  return (
    // 4. Use o container e position:relative (para o botão de Sair)
    <div className={styles.container} style={{ position: 'relative' }}>
      <LogoutButton /> {/* 5. Adicione o botão de Sair */}

      <h1>Painel do Administrador</h1>
      <p>Olá, admin! Crie, edite ou delete as salas disponíveis.</p>

      <hr style={{ margin: '2rem 0' }} />

      <GerenciadorSalas /> {/* 6. Adicione o componente de gerenciamento */}
    </div>
  );
}