"use client";

import React, { useState, useEffect } from 'react';
import { IRoom } from '@/models/Room'; // Importe a interface do seu model
// Vamos usar o mesmo CSS do formulário de reserva para manter o padrão
import styles from './ReservarSala.module.css';

export default function GerenciadorSalas() {
    const [rooms, setRooms] = useState<IRoom[]>([]);

    // Estados para o formulário
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState(1);
    const [features, setFeatures] = useState(''); // String separada por vírgula
    const [editingId, setEditingId] = useState<string | null>(null); // Controla se estamos editando

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // --- 1. BUSCAR as salas (GET /api/rooms) ---
    const fetchRooms = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/rooms'); // API que você já criou
            if (!response.ok) throw new Error('Falha ao buscar salas');

            const data: IRoom[] = await response.json();
            setRooms(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // --- 2. Limpar o formulário ---
    const resetForm = () => {
        setName('');
        setCapacity(1);
        setFeatures('');
        setEditingId(null);
    };

    // --- 3. CRIAR (POST) ou ATUALIZAR (PUT) ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const listaRecursos = features.split(',').map(r => r.trim()).filter(r => r);

        // Nomes do seu model: name, capacity, features
        const roomData = {
            name: name,
            capacity: capacity,
            features: listaRecursos
        };

        // Decide se é POST (criar) ou PUT (editar)
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/rooms/${editingId}` : '/api/rooms';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Falha na operação');
            }

            setSuccess(`Sala ${editingId ? 'atualizada' : 'criada'} com sucesso!`);
            resetForm();
            fetchRooms(); // Atualiza a lista

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        }
    };

    // --- 4. DELETAR (DELETE) ---
    const handleDelete = async (roomId: string) => {
        if (confirm('Tem certeza que deseja deletar esta sala?')) {
            try {
                const response = await fetch(`/api/rooms/${roomId}`, { // API da Etapa 1
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Falha ao deletar sala');
                }

                setSuccess('Sala deletada com sucesso!');
                fetchRooms(); // Atualiza a lista

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message);
            }
        }
    };

    // --- 5. Carregar dados para EDIÇÃO ---
    const handleEdit = (room: IRoom) => {
        setEditingId(String(room._id)); // Converta para string para garantir
        setName(room.nome);       // MUDANÇA: de 'name' para 'nome'
        setCapacity(room.capacidade); // MUDANÇA: de 'capacity' para 'capacidade'
        setFeatures(room.recursos.join(', ')); // MUDANÇA: de 'features' para 'recursos'
    };

    return (
        <section className={styles.card}> {/* Reutilizando o estilo */}
            <h2>Gerenciar Salas</h2>

            <form onSubmit={handleSubmit}>
                <h3>{editingId ? 'Editar Sala' : 'Nova Sala'}</h3>

                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome da Sala:</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="capacity">Capacidade:</label>
                    <input id="capacity" type="number" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} min="1" required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="features">Recursos (separados por vírgula):</label>
                    <input id="features" type="text" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="ex: projetor, quadro-branco" />
                </div>

                <button type="submit" className={styles.button}>
                    {editingId ? 'Atualizar Sala' : 'Criar Sala'}
                </button>
                {editingId && (
                    <button type="button" onClick={resetForm} style={{ marginLeft: '1rem' }}>
                        Cancelar Edição
                    </button>
                )}

                {success && <p className={styles.success}>{success}</p>}
                {error && <p className={styles.error}>{error}</p>}
            </form>

            <hr style={{ margin: '2rem 0' }} />

            <h3>Salas Cadastradas</h3>
            {loading && <p>Carregando salas...</p>}
            <ul>
                {rooms.map((room) => (
                    <li key={String(room._id)} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                        {/* MUDANÇA AQUI 👇 */}
                        <strong>{room.nome}</strong> (Cap: {room.capacidade})

                        {/* MUDANÇA AQUI 👇 */}
                        <p style={{ margin: '0.25rem 0' }}>Recursos: {room.recursos.join(', ') || 'Nenhum'}</p>

                        <div>
                            <button onClick={() => handleEdit(room)} style={{ marginRight: '0.5rem' }}>
                                Editar
                            </button>
                            <button onClick={() => handleDelete(String(room._id))} style={{ backgroundColor: 'darkred', color: 'white', border: 'none' }}>
                                Deletar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}