// src/app/componentes/UserDashboard.tsx

"use client";

// 1. Importe o 'useState'
import React, { useState } from 'react';
import ReservarSala from './ReservarSala';
import MinhasReservas from './MinhasReservas';
import styles from './UserDashboard.module.css'; // (O CSS que já criamos)
import LogoutButton from './LogoutButton';

export default function UserDashboard() {

  // 2. Crie o estado de "gatilho" (um número que vai mudar)
  const [refreshKey, setRefreshKey] = useState(0);

  // 3. Crie a função que "dispara" o gatilho
  const handleReservaSucesso = () => {
    // Toda vez que for chamada, ela soma +1 no 'refreshKey'
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      <LogoutButton />

      <h1>Minha Área - Connect Coworking</h1>
      <p>Veja a disponibilidade e faça sua reserva.</p>

      <div className={styles.layout}>
        {/* 4. AQUI ESTÁ A MUDANÇA:
          Passe a *função* 'handleReservaSucesso' para o ReservarSala.
          Agora o 'onReservaSucesso' não é mais 'undefined' e o formulário VAI APARECER.
        */}
        <ReservarSala onReservaSucesso={handleReservaSucesso} />
      </div>

      {/* 5. AQUI ESTÁ A OUTRA MUDANÇA:
        Passe o *valor* 'refreshKey' para o MinhasReservas.
      */}
      <MinhasReservas refreshTrigger={refreshKey} />
    </div>
  );
}