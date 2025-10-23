"use client";

import React, { useState, useEffect } from 'react';
import { IRoom } from '@/models/Room'; // Importa interface
import { IReserva } from '@/models/Reserva'; // Importa interface
import styles from './ReservarSala.module.css';

// Helper para formatar data (para input type="date")
const getHojeFormatado = () => {
  return new Date().toISOString().split('T')[0];
};

// Helper para formatar hora (ex: 14:30)
const formatarHora = (data: Date) => {
  return new Date(data).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC' // Ajuste se suas datas no banco não estiverem em UTC
  });
}

export default function ReservarSala() {
  // Estados do formulário
  const [salaSelecionada, setSalaSelecionada] = useState('');
  const [data, setData] = useState(getHojeFormatado());
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [horaFim, setHoraFim] = useState('10:00');

  // Listas de dados
  const [salas, setSalas] = useState<IRoom[]>([]);
  const [reservasDoDia, setReservasDoDia] = useState<any[]>([]); // 'any' para incluir dados populados

  // Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // --- 1. Buscar todas as SALAS (para o <select>) ---
  const fetchSalas = async () => {
    try {
      const response = await fetch("/api/rooms"); // API que o Admin usa
      const data: IRoom[] = await response.json();
      setSalas(data);
      if (data.length > 0) {
        const firstId = String(data[0]._id ?? ''); // Garantir que seja string
        setSalaSelecionada(firstId); // Seleciona a primeira por padrão
      }
    } catch (err) {
      setError('Falha ao carregar salas.');
    }
  };

  // --- 2. Buscar RESERVAS do dia selecionado (para ver disponibilidade) ---
  const fetchReservasDoDia = async (dataSelecionada: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reservas?data=${dataSelecionada}`);
      const data: IReserva[] = await response.json();
      setReservasDoDia(data);
    } catch (err) {
      setError('Falha ao carregar reservas.');
    } finally {
      setLoading(false);
    }
  };

  // --- Efeitos ---
  useEffect(() => {
    fetchSalas(); // Busca salas 1x ao carregar
  }, []);

  useEffect(() => {
    fetchReservasDoDia(data); // Busca reservas sempre que a data mudar
  }, [data]);

  // --- 3. Ação de SUBMIT do formulário (POST) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Combina data e hora para o formato ISO (ex: 2025-10-22T09:00:00)
    const dataInicioISO = `${data}T${horaInicio}:00`;
    const dataFimISO = `${data}T${horaFim}:00`;

    try {
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sala: salaSelecionada,
          dataInicio: dataInicioISO,
          dataFim: dataFimISO,
        }),
      });

      const resData = await response.json();

      if (response.status === 409) { // Conflito!
        throw new Error(resData.message);
      }
      if (!response.ok) {
        throw new Error(resData.message || 'Erro ao criar reserva.');
      }

      setSuccess('Reserva criada com sucesso!');
      fetchReservasDoDia(data); // Atualiza a lista de disponibilidade

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      
      {/* Coluna 1: Formulário de Reserva */}
      <section style={{ flex: 1 }}>
        <h2>Fazer uma Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sala">Sala:</label>
            <select
              id="sala"
              value={salaSelecionada}
              onChange={(e) => setSalaSelecionada(e.target.value)}
              required
            >
              {salas.map((s) => (
                <option key={String(s._id)} value={String(s._id)}>
                  {s.nome} (Cap: {s.capacidade})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="data">Data:</label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="horaInicio">Hora Início:</label>
            <input
              id="horaInicio"
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="horaFim">Hora Fim:</label>
            <input
              id="horaFim"
              type="time"
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Reservando...' : 'Reservar Sala'}
          </button>

          {success && <p style={{ color: 'green' }}>{success}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>

      {/* Coluna 2: Disponibilidade do Dia */}
      <section style={{ flex: 2 }}>
        <h3>Disponibilidade para {new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')}</h3>
        {loading && <p>Carregando horários...</p>}
        {reservasDoDia.length === 0 && !loading && (
          <p>Todas as salas estão livres neste dia!</p>
        )}
        <ul>
          {reservasDoDia.map((res) => (
            <li key={res._id.toString()}>
              <strong>{res.room.name}</strong>: ocupada das{' '}
              <strong>{formatarHora(res.dataInicio)}</strong> às{' '}
              <strong>{formatarHora(res.dataFim)}</strong>
              {' '}por {res.usuario.nome}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}