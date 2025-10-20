"use client";
import React, { useState, useEffect } from 'react';
import './dashboardGerente.css';

// --- INTERFACES TYPESCRIPT ---
interface Ordem {
    id: number;
    titulo: string;
    descricao: string;
    equipamento: string;
    tecnicoResponsavel: string;
    tipoManutencao: 'Preventiva' | 'Corretiva';
    status: 'Abertas' | 'Andamento' | 'Concluídas';
    dataLimite: string;
}

interface Equipamento {
    id: number;
    nome: string;
    modelo: string;
    numeroSerie: string;
    localizacao: string;
    status: 'Ativo' | 'Inativo' | 'Em Manutenção';
}

// --- DADOS DE EXEMPLO ---
const mockOrdens: Ordem[] = [
    { id: 1, titulo: 'Manutenção Preventiva Motor A', descricao: 'Descrição detalhada aqui', equipamento: 'Motor A-01', tecnicoResponsavel: 'Carlos Silva', tipoManutencao: 'Preventiva', status: 'Abertas', dataLimite: '2025-10-20' },
    { id: 2, titulo: 'Verificar ruído na esteira', descricao: 'Descrição detalhada aqui', equipamento: 'Esteira B-03', tecnicoResponsavel: 'Ana Pereira', tipoManutencao: 'Corretiva', status: 'Andamento', dataLimite: '2025-10-15' },
];

const mockEquipamentos: Equipamento[] = [
    { id: 1, nome: 'Motor A-01', modelo: 'W22', numeroSerie: 'SN-12345', localizacao: 'Setor A', status: 'Ativo' },
    { id: 2, nome: 'Esteira B-03', modelo: 'C-500', numeroSerie: 'SN-67890', localizacao: 'Setor B', status: 'Inativo' },
];

export default function DashboardGerente({ onLogout }: { onLogout: () => void }) {
    const [view, setView] = useState('ordens');

    // Estados para Ordens de Serviço
    const [ordens, setOrdens] = useState<Ordem[]>([]);
    const [filtroOrdens, setFiltroOrdens] = useState<Ordem['status']>('Abertas');
    const [isEditingOrdem, setIsEditingOrdem] = useState(false);
    const [currentOrdem, setCurrentOrdem] = useState<Ordem | null>(null);

    // Estados para Equipamentos
    const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
    const [isEditingEquipamento, setIsEditingEquipamento] = useState(false);
    const [currentEquipamento, setCurrentEquipamento] = useState<Equipamento | null>(null);

    useEffect(() => {
        setOrdens(mockOrdens);
        setEquipamentos(mockEquipamentos);
    }, []);

    // --- LÓGICA PARA ORDENS ---
    const handleAdicionarOrdem = () => { setIsEditingOrdem(true); setCurrentOrdem({ id: Date.now(), titulo: "", descricao: "", equipamento: "", tecnicoResponsavel: "", tipoManutencao: "Preventiva", status: "Abertas", dataLimite: "" }); };
    const handleEditarOrdemClick = (ordem: Ordem) => { setIsEditingOrdem(true); setCurrentOrdem({ ...ordem }); };
    const handleExcluirOrdem = (id: number) => { setOrdens(ordens.filter(o => o.id !== id)); };
    const handleOrdemFormSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!currentOrdem) return; const existe = ordens.find(o => o.id === currentOrdem.id); if (existe) { setOrdens(ordens.map(o => o.id === currentOrdem.id ? currentOrdem : o)); } else { setOrdens([...ordens, currentOrdem]); } setIsEditingOrdem(false); setCurrentOrdem(null); };
    const handleOrdemInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { const { name, value } = e.target; setCurrentOrdem(prev => prev ? { ...prev, [name]: value } : null); };
    const ordensFiltradas = ordens.filter(o => o.status === filtroOrdens);

    // --- LÓGICA PARA EQUIPAMENTOS ---
    const handleAdicionarEquipamento = () => { setIsEditingEquipamento(true); setCurrentEquipamento({ id: Date.now(), nome: "", modelo: "", numeroSerie: "", localizacao: "", status: "Ativo" }); };
    const handleEditarEquipamentoClick = (equipamento: Equipamento) => { setIsEditingEquipamento(true); setCurrentEquipamento({ ...equipamento }); };
    const handleExcluirEquipamento = (id: number) => { setEquipamentos(equipamentos.filter(e => e.id !== id)); };
    const handleEquipamentoFormSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!currentEquipamento) return; const existe = equipamentos.find(eq => eq.id === currentEquipamento.id); if (existe) { setEquipamentos(equipamentos.map(eq => eq.id === currentEquipamento.id ? currentEquipamento : eq)); } else { setEquipamentos([...equipamentos, currentEquipamento]); } setIsEditingEquipamento(false); setCurrentEquipamento(null); };
    const handleEquipamentoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { const { name, value } = e.target; setCurrentEquipamento(prev => prev ? { ...prev, [name]: value } : null); };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo-container"><span className="header-title">Sistema de Gestão de Manutenção</span></div>
                <div className="user-info"><span className="user-role">GERENTE</span><button onClick={onLogout} className="logout-button">Logout</button></div>
            </header>

            <main className="dashboard-main">
                <div className="view-selector">
                    <button onClick={() => setView("ordens")} className={view === "ordens" ? "active" : ""}>Ordens de Serviço</button>
                    <button onClick={() => setView("equipamentos")} className={view === "equipamentos" ? "active" : ""}>Equipamentos</button>
                </div>

                {view === 'ordens' && (
                    isEditingOrdem && currentOrdem ? (
                        // --- INÍCIO DA CORREÇÃO: FORMULÁRIO PREENCHIDO ---
                        <form onSubmit={handleOrdemFormSubmit} className="edit-form">
                            <h2>{ordens.find(o => o.id === currentOrdem.id) ? "Editando Ordem de Serviço" : "Adicionar Nova Ordem"}</h2>
                            <div className="form-group"><label htmlFor="titulo">Título da Ordem</label><input id="titulo" type="text" name="titulo" value={currentOrdem.titulo} onChange={handleOrdemInputChange} required /></div>
                            <div className="form-group"><label htmlFor="descricao">Descrição do Problema</label><textarea id="descricao" name="descricao" value={currentOrdem.descricao} onChange={handleOrdemInputChange} required /></div>
                            <div className="form-row">
                                <div className="form-group"><label htmlFor="equipamento">Equipamento Associado</label><input id="equipamento" type="text" name="equipamento" value={currentOrdem.equipamento} onChange={handleOrdemInputChange} required /></div>
                                <div className="form-group"><label htmlFor="tecnicoResponsavel">Técnico Responsável</label><input id="tecnicoResponsavel" type="text" name="tecnicoResponsavel" value={currentOrdem.tecnicoResponsavel} onChange={handleOrdemInputChange} required /></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group"><label htmlFor="dataLimite">Data Limite</label><input id="dataLimite" type="date" name="dataLimite" value={currentOrdem.dataLimite} onChange={handleOrdemInputChange} required /></div>
                                <div className="form-group"><label htmlFor="tipoManutencao">Tipo de Manutenção</label><select id="tipoManutencao" name="tipoManutencao" value={currentOrdem.tipoManutencao} onChange={handleOrdemInputChange}><option value="Preventiva">Preventiva</option><option value="Corretiva">Corretiva</option></select></div>
                                <div className="form-group"><label htmlFor="status">Status</label><select id="status" name="status" value={currentOrdem.status} onChange={handleOrdemInputChange}><option value="Abertas">Aberta</option><option value="Andamento">Em Andamento</option><option value="Concluídas">Concluída</option></select></div>
                            </div>
                            <div className="form-buttons">
                                <button type="submit">💾 Salvar</button>
                                <button type="button" onClick={() => { setIsEditingOrdem(false); setCurrentOrdem(null); }}>Cancelar</button>
                            </div>
                        </form>
                        // --- FIM DA CORREÇÃO ---
                    ) : (
                        <>
                            <div className="toolbar">
                                <div className="status-filters">
                                    <button onClick={() => setFiltroOrdens("Abertas")} className={`filter-button ${filtroOrdens === "Abertas" ? "active" : ""}`}>Abertas</button>
                                    <button onClick={() => setFiltroOrdens("Andamento")} className={`filter-button ${filtroOrdens === "Andamento" ? "active" : ""}`}>Andamento</button>
                                    <button onClick={() => setFiltroOrdens("Concluídas")} className={`filter-button ${filtroOrdens === "Concluídas" ? "active" : ""}`}>Concluídas</button>
                                </div>
                                <button onClick={handleAdicionarOrdem} className="add-button">➕ Adicionar Ordem</button>
                            </div>
                            <div className="ordens-lista">
                                <div className="ordem-cabecalho"><span>Título</span><span>Equipamento</span><span>Técnico</span><span>Status</span><span>Data Limite</span><span>Ações</span></div>
                                {ordensFiltradas.map((ordem) => (
                                    <div key={ordem.id} className="ordem-item">
                                        <span>{ordem.titulo}</span><span>{ordem.equipamento}</span><span>{ordem.tecnicoResponsavel}</span><span>{ordem.status}</span><span>{new Date(ordem.dataLimite).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                                        <span className="acoes-buttons">
                                            <button onClick={() => handleEditarOrdemClick(ordem)} className="acaoBtn editBtn">✏️</button>
                                            <button onClick={() => handleExcluirOrdem(ordem.id)} className="acaoBtn deleteBtn">🗑️</button>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                )}

                {view === 'equipamentos' && (
                    isEditingEquipamento && currentEquipamento ? (
                        <form onSubmit={handleEquipamentoFormSubmit} className="edit-form">
                            <h2>{equipamentos.find(eq => eq.id === currentEquipamento.id) ? "Editando Equipamento" : "Adicionar Novo Equipamento"}</h2>
                            <div className="form-row">
                                <div className="form-group"><label htmlFor="nome">Nome do Equipamento</label><input id="nome" type="text" name="nome" value={currentEquipamento.nome} onChange={handleEquipamentoInputChange} required /></div>
                                <div className="form-group"><label htmlFor="modelo">Modelo</label><input id="modelo" type="text" name="modelo" value={currentEquipamento.modelo} onChange={handleEquipamentoInputChange} /></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group"><label htmlFor="numeroSerie">Número de Série</label><input id="numeroSerie" type="text" name="numeroSerie" value={currentEquipamento.numeroSerie} onChange={handleEquipamentoInputChange} /></div>
                                <div className="form-group"><label htmlFor="localizacao">Localização</label><input id="localizacao" type="text" name="localizacao" value={currentEquipamento.localizacao} onChange={handleEquipamentoInputChange} /></div>
                                <div className="form-group"><label htmlFor="status">Status</label><select id="status" name="status" value={currentEquipamento.status} onChange={handleEquipamentoInputChange}><option value="Ativo">Ativo</option><option value="Inativo">Inativo</option><option value="Em Manutenção">Em Manutenção</option></select></div>
                            </div>
                            <div className="form-buttons"><button type="submit">💾 Salvar</button><button type="button" onClick={() => { setIsEditingEquipamento(false); setCurrentEquipamento(null); }}>Cancelar</button></div>
                        </form>
                    ) : (
                        <>
                            <div className="toolbar">
                                <h3>Lista de Equipamentos</h3>
                                <button onClick={handleAdicionarEquipamento} className="add-button">➕ Adicionar Equipamento</button>
                            </div>
                            <div className="equipamentos-lista">
                                <div className="equipamento-cabecalho"><span>Nome</span><span>Modelo</span><span>Nº de Série</span><span>Localização</span><span>Status</span><span>Ações</span></div>
                                {equipamentos.map(equip => (
                                    <div key={equip.id} className="equipamento-item">
                                        <span>{equip.nome}</span><span>{equip.modelo}</span><span>{equip.numeroSerie}</span><span>{equip.localizacao}</span><span>{equip.status}</span>
                                        <span className="acoes-buttons">
                                            <button onClick={() => handleEditarEquipamentoClick(equip)} className="acaoBtn editBtn">✏️</button>
                                            <button onClick={() => handleExcluirEquipamento(equip.id)} className="acaoBtn deleteBtn">🗑️</button>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                )}
            </main>
        </div>
    );
}