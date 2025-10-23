"use client";

import React from 'react';
import GerenciadorSalas from './GerenciadorSalas';
import LogoutButton from './LogoutButton';
import styles from './UserDashboard.module.css';
import GerenciadorReservasAdmin from './GerenciadorReservasAdmin'; // 1. IMPORTE

export default function AdminDashboard() {
  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      <LogoutButton />

      <h1>Painel do Administrador</h1>
      <p>Olá, admin! Crie, edite ou delete as salas disponíveis.</p>

      <hr style={{ margin: '2rem 0' }} />

      <GerenciadorSalas />

      <GerenciadorReservasAdmin /> {/* 2. ADICIONE AQUI */}
    </div>
  );
}