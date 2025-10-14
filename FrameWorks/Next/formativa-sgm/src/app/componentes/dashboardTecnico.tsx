// Em app/components/dashboardGerente.tsx

"use client";
import React, { useState, useEffect } from 'react';
import './dashboardGerente.css';

interface Ordem {
  id: number;
  titulo: string;
  equipamento: string;
  status: 'Abertas' | 'Andamento' | 'Concluídas';
  dataLimite: string;
}

const mockData: Ordem[] = [
    { id: 1, titulo: 'Manutenção Preventiva Motor A', equipamento: 'Motor A-01', status: 'Abertas', dataLimite: '20/10/2025' },
    { id: 2, titulo: 'Verificar ruído na esteira', equipamento: 'Esteira B-03', status: 'Andamento', dataLimite: '15/10/2025' },
];

export default function DashboardGerente() {
    const [ordens, setOrdens] = useState<Ordem[]>([]);
    const [filtro, setFiltro] = useState<Ordem['status']>('Abertas');

    useEffect(() => {
        setOrdens(mockData);
    }, []);

    const ordensFiltradas = ordens.filter(ordem => ordem.status === filtro);

    // FUNÇÕES DE AÇÃO PARA O TÉCNICO
    const handleEditar = (idDaOrdem: number) => {
        const novoTitulo = window.prompt("Adicionar nota ou atualizar título:", ordens.find(o => o.id === idDaOrdem)?.titulo);
        if (novoTitulo) {
            const listaAtualizada = ordens.map(ordem => 
                ordem.id === idDaOrdem ? { ...ordem, titulo: novoTitulo } : ordem
            );
            setOrdens(listaAtualizada);
        }
    };
    
    return (
        <div className="dashboardContainer">
            <header className="dashboardHeader">
                <div className="logoContainer">
                    <img src="/logo-sgm.png" alt="Logo" className="logoImg" />
                </div>
                <div className="userRole">
                    Gerente
                </div>
            </header>

            <main className="dashboardMain">
                <div className="statusFilters">
                    {/* Para classes dinâmicas, a lógica muda um pouco */}
                    <button onClick={() => setFiltro('Abertas')} className={`filterButton ${filtro === 'Abertas' ? 'active' : ''}`}>Abertas</button>
                    <button onClick={() => setFiltro('Andamento')} className={`filterButton ${filtro === 'Andamento' ? 'active' : ''}`}>Andamento</button>
                    <button onClick={() => setFiltro('Concluídas')} className={`filterButton ${filtro === 'Concluídas' ? 'active' : ''}`}>Concluídas</button>
                </div>

                <div className="ordensLista">
                    <div className="ordemCabecalho">
                        <span>Id</span>
                        <span>Título</span>
                        <span>Equipamento</span>
                        <span>Status</span>
                        <span>Data Limite</span>
                        <span>Ações</span>
                    </div>
                    
                    {ordensFiltradas.map((ordem) => (
                        <div key={ordem.id} className="ordemItem">
                            <span>{ordem.id}</span>
                            <span>{ordem.titulo}</span>
                            <span>{ordem.equipamento}</span>
                            <span>{ordem.status}</span>
                            <span>{ordem.dataLimite}</span>
                            <span className="acoesButtons">
                                <button className="acaoBtn deleteBtn">🗑️</button>
                                <button className="acaoBtn createBtn">➕</button>
                            </span>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="dashboardFooter"></footer>
        </div>
    );
}