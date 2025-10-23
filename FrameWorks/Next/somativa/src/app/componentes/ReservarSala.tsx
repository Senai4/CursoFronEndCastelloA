// src/app/componentes/ReservarSala.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { IRoom } from '@/models/Room';
import { IReserva } from '@/models/Reserva';
import styles from './ReservarSala.module.css';

// ... (helpers getHojeFormatado e formatarHora) ...
const getHojeFormatado = () => {
  return new Date().toISOString().split('T')[0];
};
const formatarHora = (data: Date) => {
  return new Date(data).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

// 1. Definimos a "Prop" que o componente vai receber
interface ReservarSalaProps {
  onReservaSucesso: () => void; // Esta é a função "gatilho"
}

// 2. Recebemos a prop aqui
export default function ReservarSala({ onReservaSucesso }: ReservarSalaProps) {
  // ... (Todos os seus 'useState' continuam iguais) ...
  const [salaSelecionada, setSalaSelecionada] = useState('');
  const [data, setData] = useState(getHojeFormatado());
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [horaFim, setHoraFim] = useState('10:00');
  const [salas, setSalas] = useState<IRoom[]>([]);
  const [reservasDoDia, setReservasDoDia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ... (Sua função 'fetchSalas' continua igual) ...
  const fetchSalas = async () => {
    try {
      const response = await fetch("/api/rooms");
      const data: IRoom[] = await response.json();
      setSalas(data);
      if (data.length > 0) {
        const firstId = String(data[0]._id ?? '');
        setSalaSelecionada(firstId);
      }
    } catch (err) {
      setError('Falha ao carregar salas.');
    }
  };

  // ... (Sua função 'fetchReservasDoDia' continua igual) ...
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

  // ... (Seus 'useEffect' continuam iguais) ...
  useEffect(() => {
    fetchSalas();
  }, []);
  useEffect(() => {
    fetchReservasDoDia(data);
  }, [data]);


  // --- 3. Ação de SUBMIT (Atualizada) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const dataInicioISO = `${data}T${horaInicio}:00`;
    const dataFimISO = `${data}T${horaFim}:00`;

    try {
      // ... (o 'fetch' continua igual) ...
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
      // ... (a verificação de erro 409 e !response.ok continua igual) ...
      if (response.status === 409) { throw new Error(resData.message); }
      if (!response.ok) { throw new Error(resData.message || 'Erro ao criar reserva.'); }

      setSuccess('Reserva criada com sucesso!');
      fetchReservasDoDia(data); // Atualiza a lista de disponibilidade

      // 3. ✨ CORREÇÃO DO BUG: Chame a função "gatilho"
      // Isso vai avisar o UserDashboard, que vai avisar o MinhasReservas.
      onReservaSucesso();

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
        {/* ... (o formulário continua igual) ... */}
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
                  {/* Seu model usa 'nome' e 'capacidade' */}
                  {s.nome} (Cap: {s.capacidade})
                </option>
              ))}
            </select>
          </div>
          {/* ... (inputs de data, horaInicio, horaFim) ... */}
          <div>
            <label htmlFor="data">Data:</label>
            <input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="horaInicio">Hora Início:</label>
            <input id="horaInicio" type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="horaFim">Hora Fim:</label>
            <input id="horaFim" type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} required />
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
        {/* ... (loading/etc) ... */}
        {loading && <p>Carregando horários...</p>}
        {reservasDoDia.length === 0 && !loading && (
          <p>Todas as salas estão livres neste dia!</p>
        )}
        <ul>
          {reservasDoDia.map((res) => (
            <li key={res._id.toString()}>
              {/* 4. CORREÇÃO DE BUG: Sua API envia 'nome' (pt-br) */}
              <strong>{res.room.nome}</strong>: ocupada das{' '}
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