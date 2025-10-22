"use client";

import React, { useState, useEffect } from "react";

// Interface simples para os dados que esperamos
interface MinhaReserva {
  _id: string;
  dataInicio: string;
  dataFim: string;
  room: {
    // Esperamos o objeto 'room' populado
    _id: string;
    name: string;
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

export default function MinhasReservas() {
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

      const response = await fetch("/api/reservas/minhas"); // API da Etapa 1
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
  }, []);

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
        // API da Etapa 2
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Falha ao cancelar");

      setSuccess("Reserva cancelada com sucesso!");
      // Atualiza a lista, removendo a reserva cancelada
      fetchMinhasReservas();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <hr style={{ margin: "2rem 0" }} />
      <h2>Minhas Próximas Reservas</h2>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {reservas.length === 0 && !loading && (
        <p>Você não possui reservas futuras.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {reservas.map((res) => (
          <li
            key={res._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <strong>Sala: {res.room.name}</strong>
            <p>De: {formatarDataHora(res.dataInicio)}</p>
            <p>Até: {formatarDataHora(res.dataFim)}</p>
            <button
              onClick={() => handleCancelar(res._id)}
              disabled={loading}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "0.5rem",
              }}
            >
              Cancelar Reserva
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
