"use client";

import React from "react";
import ReservarSala from "./ReservarSala";
import MinhasReservas from "./MinhasReservas";
import styles from "./UserDashboard.module.css"; // 1. Importe o CSS

export default function UserDashboard() {
  return (
    // 2. Use a classe .container
    <div className={styles.container}>
      <h1>Minha Área - Connect Coworking</h1>
      <p>Veja a disponibilidade e faça sua reserva.</p>

      {/* 3. Use a classe .layout para organizar */}
      <div className={styles.layout}>
        <ReservarSala />
        {/* O MinhasReservas vai ficar na segunda coluna ou embaixo (mobile) */}
        {/* Vamos colocá-lo fora do grid por enquanto para ser uma seção separada */}
      </div>

      <MinhasReservas />
    </div>
  );
}
