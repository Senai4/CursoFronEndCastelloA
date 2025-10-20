"use client";
import React, { useState, useEffect } from "react";
import "./dashboardAdmin.css";

// Interface para definir a estrutura de uma ordem de serviço
interface OrdemServico {
    id: number;
    titulo: string;
    equipamento: string;
    status: string;
    dataLimite: string;
}

// Props interface
interface DashboardTecnicoProps {
    onLogout: () => void;
}

const mockData: OrdemServico[] = [
    { id: 1, titulo: "Manutenção Preventiva Motor A", equipamento: "Motor A-01", status: "Abertas", dataLimite: "2025-10-20" },
    { id: 2, titulo: "Verificar ruído na esteira", equipamento: "Esteira B-03", status: "Andamento", dataLimite: "2025-10-15" },
    { id: 5, titulo: "Trocar filtro de ar", equipamento: "Compressor C-04", status: "Abertas", dataLimite: "2025-10-22" },
];

export default function DashboardTecnico({ onLogout }: DashboardTecnicoProps) {
    const [ordens, setOrdens] = useState<OrdemServico[]>([]);
    const [filtro, setFiltro] = useState("Abertas");

    useEffect(() => {
        setOrdens(mockData);
    }, []);

    const handleStatusChange = (idDaOrdem: number, novoStatus: string) => {
        setOrdens(
            ordens.map((ordem) =>
                ordem.id === idDaOrdem ? { ...ordem, status: novoStatus } : ordem
            )
        );
    };

    const ordensFiltradas = ordens.filter((ordem) => ordem.status === filtro);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo-container">
                    <span className="header-title">Sistema de Gestão de Manutenção</span>
                </div>
                <div className="user-info">
                    <span className="user-role">TÉCNICO</span>
                    <button onClick={onLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="toolbar">
                    <div className="status-filters">
                        <button onClick={() => setFiltro("Abertas")} className={`filter-button ${filtro === "Abertas" ? "active" : ""}`}>Abertas</button>
                        <button onClick={() => setFiltro("Andamento")} className={`filter-button ${filtro === "Andamento" ? "active" : ""}`}>Andamento</button>
                        <button onClick={() => setFiltro("Concluídas")} className={`filter-button ${filtro === "Concluídas" ? "active" : ""}`}>Concluídas</button>
                    </div>
                </div>

                <div className="ordens-lista">
                    <div className="ordem-cabecalho">
                        <span>Título</span>
                        <span>Equipamento</span>
                        <span>Data Limite</span>
                        <span>Status</span>
                    </div>

                    {ordensFiltradas.length > 0 ? (
                        ordensFiltradas.map((ordem) => (
                            <div key={ordem.id} className="ordem-item tecnico-item">
                                <span data-label="Título:">{ordem.titulo}</span>
                                <span data-label="Equipamento:">{ordem.equipamento}</span>
                                <span data-label="Data Limite:">{new Date(ordem.dataLimite).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                                <span data-label="Status:">
                                    <select
                                        className="status-select"
                                        value={ordem.status}
                                        onChange={(e) => handleStatusChange(ordem.id, e.target.value)}
                                        aria-label="Alterar status da ordem de serviço"
                                        title="Status da ordem de serviço">
                                        <option value="Abertas">Aberta</option>
                                        <option value="Andamento">Em Andamento</option>
                                        <option value="Concluídas">Concluída</option>
                                    </select>
                                </span>

                            </div>
                        ))
                    ) : (
                        <div className="sem-ordens">
                            <p>Nenhuma ordem de serviço encontrada para este status.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}