"use client";
import React, { useState, useEffect } from 'react';
// Usando CSS Modules para estilização
import styles from './DashboardAdmin.module.css'; 

// 1. Definindo o tipo para uma Ordem de Serviço
interface Ordem {
  id: number;
  titulo: string;
  equipamento: string;
  // Usamos tipos literais para garantir que o status seja sempre um desses três valores
  status: 'Abertas' | 'Andamento' | 'Concluídas';
  dataLimite: string;
}

// 2. Dados de exemplo com o tipo que acabamos de criar
const mockData: Ordem[] = [
    { id: 1, titulo: 'Manutenção Preventiva Motor A', equipamento: 'Motor A-01', status: 'Abertas', dataLimite: '20/10/2025' },
    { id: 2, titulo: 'Verificar ruído na esteira', equipamento: 'Esteira B-03', status: 'Andamento', dataLimite: '15/10/2025' },
    { id: 3, titulo: 'Troca de óleo compressor', equipamento: 'Compressor C-02', status: 'Concluídas', dataLimite: '01/10/2025' },
    { id: 4, titulo: 'Calibração de sensor', equipamento: 'Sensor D-07', status: 'Abertas', dataLimite: '25/10/2025' },
];

export default function DashboardAdmin() {
    // 3. Adicionando tipos aos nossos estados (useState)
    const [ordens, setOrdens] = useState<Ordem[]>([]);
    const [filtro, setFiltro] = useState<Ordem['status']>('Abertas');

    // Simula a busca de dados
    useEffect(() => {
        // No futuro, substitua 'mockData' pela sua chamada de API
        setOrdens(mockData);
    }, []);

    // O filtro funciona da mesma forma, mas agora com tipagem segura
    const ordensFiltradas = ordens.filter(ordem => ordem.status === filtro);

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.dashboardHeader}>
                <div className={styles.logoContainer}>
                    <img src="/logo-sgm.png" alt="Logo SGM" className={styles.logoImg} />
                    <span>SGM</span>
                </div>
                <div className={styles.userRole}>
                    ADM
                </div>
            </header>

            <main className={styles.dashboardMain}>
                <div className={styles.statusFilters}>
                    <button 
                        onClick={() => setFiltro('Abertas')}
                        className={`${styles.filterButton} ${filtro === 'Abertas' ? styles.active : ''}`}
                    >
                        Abertas
                    </button>
                    <button 
                        onClick={() => setFiltro('Andamento')}
                        className={`${styles.filterButton} ${filtro === 'Andamento' ? styles.active : ''}`}
                    >
                        Andamento
                    </button>
                    <button 
                        onClick={() => setFiltro('Concluídas')}
                        className={`${styles.filterButton} ${filtro === 'Concluídas' ? styles.active : ''}`}
                    >
                        Concluídas
                    </button>
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
                                <span className={styles.acoesButtons}>
                                    <button className={`${styles.acaoBtn} ${styles.editBtn}`}>✏️</button>
                                    <button className={`${styles.acaoBtn} ${styles.createBtn}`}>➕</button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className={styles.semOrdens}>
                            <p>Nenhuma ordem de serviço encontrada.</p>
                        </div>
                    )}
                </div>
            </main>
            <footer className={styles.dashboardFooter}>
                <span>Deshbord-Gerente</span>
            </footer>
        </div>
    );
}