"use client";
import React, { useState, useEffect } from 'react';
// Usando o MESMO arquivo CSS compartilhado
import styles from './Dashboard.module.css';

// Definindo o tipo para uma Ordem de Serviço
interface Ordem {
  id: number;
  titulo: string;
  equipamento: string;
  status: 'Abertas' | 'Andamento' | 'Concluídas';
  dataLimite: string;
}

// Dados de exemplo (substitua pela sua chamada de API)
const mockData: Ordem[] = [
    { id: 2, titulo: 'Verificar ruído na esteira', equipamento: 'Esteira B-03', status: 'Andamento', dataLimite: '15/10/2025' },
    { id: 4, titulo: 'Calibração de sensor', equipamento: 'Sensor D-07', status: 'Abertas', dataLimite: '25/10/2025' },
];

export default function DashboardTecnico() {
    const [ordens, setOrdens] = useState<Ordem[]>([]);
    const [filtro, setFiltro] = useState<Ordem['status']>('Abertas');

    useEffect(() => {
        setOrdens(mockData);
    }, []);

    const ordensFiltradas = ordens.filter(ordem => ordem.status === filtro);

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.dashboardHeader}>
                <div className={styles.logoContainer}>
                    <img src="/logo-sgm.png" alt="Logo SGM" className={styles.logoImg} />
                    <span>SGM</span>
                </div>
                {/* >>>>>>>>> MUDANÇA AQUI <<<<<<<<< */}
                <div className={styles.userRole}>
                    Técnico
                </div>
            </header>

            <main className={styles.dashboardMain}>
                <div className={styles.statusFilters}>
                    {/* Botões de filtro (idênticos) */}
                    <button onClick={() => setFiltro('Abertas')} className={`${styles.filterButton} ${filtro === 'Abertas' ? styles.active : ''}`}>Abertas</button>
                    <button onClick={() => setFiltro('Andamento')} className={`${styles.filterButton} ${filtro === 'Andamento' ? styles.active : ''}`}>Andamento</button>
                    <button onClick={() => setFiltro('Concluídas')} className={`${styles.filterButton} ${filtro === 'Concluídas' ? styles.active : ''}`}>Concluídas</button>
                </div>

                <div className={styles.ordensLista}>
                    <div className={styles.ordemCabecalho}>
                        <span>Id</span>
                        <span>Título</span>
                        <span>Equipamento</span>
                        <span>Status</span>
                        <span>Data Limite</span>
                        <span>Ações</span>
                    </div>
                    
                    {ordensFiltradas.length > 0 ? (
                        ordensFiltradas.map((ordem) => (
                            <div key={ordem.id} className={styles.ordemItem}>
                                <span>{ordem.id}</span>
                                <span>{ordem.titulo}</span>
                                <span>{ordem.equipamento}</span>
                                <span>{ordem.status}</span>
                                <span>{ordem.dataLimite}</span>
                                {/* >>>>>>>>> MUDANÇA AQUI (BOTÕES) <<<<<<<<< */}
                                <span className={styles.acoesButtons}>
                                    <button className={`${styles.acaoBtn} ${styles.deleteBtn}`}>🗑️</button>
                                    <button className={`${styles.acaoBtn} ${styles.editBtn}`}>✏️</button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className={styles.semOrdens}><p>Nenhuma ordem de serviço encontrada.</p></div>
                    )}
                </div>
            </main>
            <footer className={styles.dashboardFooter}><span>Dashboard do Técnico</span></footer>
        </div>
    );
}