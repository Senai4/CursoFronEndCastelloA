"use client";
import React, { useState, useEffect } from "react";
import "./DashboardAdmin.css";

const mockData = [
  {
    id: 1,
    titulo: "Manutenção Preventiva Motor A",
    descricao: "Realizar a lubrificação e verificação de ruídos conforme o manual.",
    equipamento: "Motor A-01",
    tecnicoResponsavel: "Carlos Silva",
    tipoManutencao: "Preventiva",
    status: "Abertas",
    dataLimite: "2025-10-20",
  },
  {
    id: 2,
    titulo: "Verificar ruído na esteira",
    descricao: "Esteira B-03 está com ruído agudo na correia principal.",
    equipamento: "Esteira B-03",
    tecnicoResponsavel: "Ana Pereira",
    tipoManutencao: "Corretiva",
    status: "Andamento",
    dataLimite: "2025-10-15",
  },
];

export default function DashboardAdmin({ onLogout }) {
  const [ordens, setOrdens] = useState([]);
  const [filtro, setFiltro] = useState("Abertas");
  const [isEditing, setIsEditing] = useState(false);
  const [currentOrdem, setCurrentOrdem] = useState(null);

  useEffect(() => {
    setOrdens(mockData);
  }, []);

  const handleExcluir = (id) => {
    setOrdens(ordens.filter((ordem) => ordem.id !== id));
  };

  const handleAdicionar = () => {
    setIsEditing(true);
    setCurrentOrdem({
      id: Date.now(),
      titulo: "",
      descricao: "",
      equipamento: "",
      tecnicoResponsavel: "",
      tipoManutencao: "Preventiva",
      status: "Abertas",
      dataLimite: "",
    });
  };

  const handleEditarClick = (ordem) => {
    setIsEditing(true);
    setCurrentOrdem({ ...ordem });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrdem({ ...currentOrdem, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const ordemExistente = ordens.find(ordem => ordem.id === currentOrdem.id);

    if (ordemExistente) {
      setOrdens(
        ordens.map((ordem) =>
          ordem.id === currentOrdem.id ? currentOrdem : ordem
        )
      );
    } else {
      setOrdens([...ordens, currentOrdem]);
    }
    
    setIsEditing(false);
    setCurrentOrdem(null);
  };

  const ordensFiltradas = ordens.filter((ordem) => ordem.status === filtro);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo-container">
          <span className="header-title">Sistema de Gestão de Manutenção</span>
        </div>
        <div className="user-info">
          <span className="user-role">ADM</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {isEditing ? (
          <form onSubmit={handleFormSubmit} className="edit-form">
            <h2>{ordens.find(o => o.id === currentOrdem.id) ? "Editando Ordem de Serviço" : "Adicionar Nova Ordem"}</h2>

            <div className="form-group">
              <label htmlFor="titulo">Título da Ordem</label>
              <input id="titulo" type="text" name="titulo" value={currentOrdem.titulo} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição do Problema</label>
              <textarea id="descricao" name="descricao" value={currentOrdem.descricao} onChange={handleInputChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="equipamento">Equipamento Associado</label>
                <input id="equipamento" type="text" name="equipamento" value={currentOrdem.equipamento} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="tecnicoResponsavel">Técnico Responsável</label>
                <input id="tecnicoResponsavel" type="text" name="tecnicoResponsavel" value={currentOrdem.tecnicoResponsavel} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dataLimite">Data Limite</label>
                <input id="dataLimite" type="date" name="dataLimite" value={currentOrdem.dataLimite} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="tipoManutencao">Tipo de Manutenção</label>
                <select id="tipoManutencao" name="tipoManutencao" value={currentOrdem.tipoManutencao} onChange={handleInputChange}>
                  <option value="Preventiva">Preventiva</option>
                  <option value="Corretiva">Corretiva</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={currentOrdem.status} onChange={handleInputChange}>
                  <option value="Abertas">Aberta</option>
                  <option value="Andamento">Em Andamento</option>
                  <option value="Concluídas">Concluída</option>
                </select>
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit">💾 Salvar</button>
              <button type="button" onClick={() => { setIsEditing(false); setCurrentOrdem(null); }}>Cancelar</button>
            </div>
          </form>
        ) : (
          <>
            <div className="toolbar">
              <div className="status-filters">
                <button onClick={() => setFiltro("Abertas")} className={`filter-button ${filtro === "Abertas" ? "active" : ""}`}>Abertas</button>
                <button onClick={() => setFiltro("Andamento")} className={`filter-button ${filtro === "Andamento" ? "active" : ""}`}>Andamento</button>
                <button onClick={() => setFiltro("Concluídas")} className={`filter-button ${filtro === "Concluídas" ? "active" : ""}`}>Concluídas</button>
              </div>
              <button onClick={handleAdicionar} className="add-button">
                ➕ Adicionar Ordem
              </button>
            </div>

            <div className="ordens-lista">
              <div className="ordem-cabecalho">
                  <span>Título</span>
                  <span>Equipamento</span>
                  <span>Técnico</span>
                  <span>Status</span>
                  <span>Data Limite</span>
                  <span>Ações</span>
              </div>
              {ordensFiltradas.map((ordem) => (
                <div key={ordem.id} className="ordem-item">
                  <span data-label="Título:">{ordem.titulo}</span>
                  <span data-label="Equipamento:">{ordem.equipamento}</span>
                  <span data-label="Técnico:">{ordem.tecnicoResponsavel}</span>
                  <span data-label="Status:">{ordem.status}</span>
                  <span data-label="Data Limite:">{new Date(ordem.dataLimite).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span>
                  <span className="acoes-buttons">
                    <button onClick={() => handleEditarClick(ordem)} className="acaoBtn editBtn">✏️</button>
                    <button onClick={() => handleExcluir(ordem.id)} className="acaoBtn deleteBtn">🗑️</button>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}