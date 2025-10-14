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
    { id: 1, titulo: 'Manutenção Preventiva Motor A', equipamento: 'Motor A-01', status: 'Abertas', dataLimite: '20/10/2025' },
    { id: 2, titulo: 'Verificar ruído na esteira', equipamento: 'Esteira B-03', status: 'Andamento', dataLimite: '15/10/2025' },
    { id: 3, titulo: 'Troca de óleo compressor', equipamento: 'Compressor C-02', status: 'Concluídas', dataLimite: '01/10/2025' },
];

export default function DashboardGerente() {
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
                    Gerente
                </div>
            </header>

            <main className={styles.dashboardMain}>
                <div className={styles.statusFilters}>
                    {/* Botões de filtro (idênticos ao Admin) */}
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
                                {/* Ações do Gerente (idênticas às do Admin) */}
                                <span className={styles.acoesButtons}>
                                    <button className={`${styles.acaoBtn} ${styles.editBtn}`}>✏️</button>
                                    <button className={`${styles.acaoBtn} ${styles.createBtn}`}>➕</button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className={styles.semOrdens}><p>Nenhuma ordem de serviço encontrada.</p></div>
                    )}
                </div>
            </main>
            <footer className={styles.dashboardFooter}><span>Dashboard do Gerente</span></footer>
        </div>
    );
}