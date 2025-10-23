"use client";

import React, { useState, useEffect } from "react";
// Importando o CSS que criamos (assumindo que está na pasta 'componentes')
import styles from './MinhasReservas.module.css';

// Interface simples para os dados que esperamos
interface MinhaReserva {
  _id: string;
  dataInicio: string;
  dataFim: string;
  room: {
    _id: string;
    nome: string; // <-- 1. CORREÇÃO: de 'name' para 'nome'
  };
}

// Helper para formatar Data e Hora
const formatarDataHora = (data: string) => {
  return new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "UTC", // Ajuste se necessário
  });
};

// 2. DEFINA AS PROPS que o componente vai receber do "Pai"
interface MinhasReservasProps {
  refreshTrigger: number;
}

// 3. RECEBA AS PROPS aqui
export default function MinhasReservas({ refreshTrigger }: MinhasReservasProps) {
  const [reservas, setReservas] = useState<MinhaReserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // --- Função para BUSCAR as reservas ---
  const fetchMinhasReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/reservas/minhas");
      if (!response.ok) throw new Error("Falha ao buscar suas reservas");

      const data: MinhaReserva[] = await response.json();
      setReservas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Efeito para buscar ao carregar ---
  useEffect(() => {
    fetchMinhasReservas();
    // 4. ATUALIZE O ARRAY DE DEPENDÊNCIAS
    // Isso força o 'fetch' a rodar de novo sempre que o 'refreshTrigger' mudar
  }, [refreshTrigger]);

  // --- Função para CANCELAR uma reserva ---
  const handleCancelar = async (reservaId: string) => {
    if (!confirm("Tem certeza que deseja cancelar esta reserva?")) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`/api/reservas/${reservaId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Falha ao cancelar");

      setSuccess("Reserva cancelada com sucesso!");
      // A lógica aqui já estava correta:
      fetchMinhasReservas();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 5. Aplicando as classes de CSS que criamos
    <section className={styles.card}>
      <h2>Minhas Próximas Reservas</h2>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      {reservas.length === 0 && !loading && (
        <p>Você não possui reservas futuras.</p>
      )}

      <ul className={styles.list}>
        {reservas.map((res) => (
          <li
            key={res._id.toString()} // 6. CORREÇÃO: Adicionado .toString()
            className={styles.listItem}
          >
            <div className={styles.info}>
              <strong>Sala: {res.room.nome}</strong> {/* 7. CORREÇÃO: de 'name' para 'nome' */}
              <p>De: {formatarDataHora(res.dataInicio)}</p>
              <p>Até: {formatarDataHora(res.dataFim)}</p>
            </div>
            <button
              onClick={() => handleCancelar(res._id.toString())} // 8. CORREÇÃO: Adicionado .toString()
              disabled={loading}
              className={styles.cancelButton}
            >
              Cancelar Reserva
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}