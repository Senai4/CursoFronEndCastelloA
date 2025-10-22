"use client"; // Este componente terá botões e formulários

import React from 'react';
// Importe aqui seus componentes de CRUD de Salas, etc.

export default function AdminDashboard() {
  return (
    <div>
      <h1>Painel do Administrador</h1>
      <p>Olá, admin! Você pode gerenciar as salas e reservas.</p>
      
      {/* Aqui você vai adicionar:
        1. Um componente/formulário para CRIAR/EDITAR Salas.
        2. Um componente que lista TODAS as reservas (de GET /api/reservas)
           com botão para cancelar.
      */}
    </div>
  );
}