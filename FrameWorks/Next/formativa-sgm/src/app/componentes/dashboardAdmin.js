"use client";
import React, { useState, useEffect } from "react";
import "./DashboardAdmin.css"; // Importando nosso CSS

// Dados de exemplo (substitua pela sua chamada de API)
const mockData = [
  {
    id: 1,
    titulo: "Manutenção Preventiva Motor A",
    equipamento: "Motor A-01",
    status: "Abertas",
    dataLimite: "20/10/2025",
  },
  {
    id: 2,
    titulo: "Verificar ruído na esteira",
    equipamento: "Esteira B-03",
    status: "Andamento",
    dataLimite: "15/10/2025",
  },
  {
    id: 3,
    titulo: "Troca de óleo compressor",
    equipamento: "Compressor C-02",
    status: "Concluídas",
    dataLimite: "01/10/2025",
  },
  {
    id: 4,
    titulo: "Calibração de sensor",
    equipamento: "Sensor D-07",
    status: "Abertas",
    dataLimite: "25/10/2025",
  },
];

export default function DashboardAdmin() {
  const [ordens, setOrdens] = useState([]);
  const [filtro, setFiltro] = useState("Abertas"); // Filtro inicial

  // Simula a busca de dados quando o componente é montado
  useEffect(() => {
    // No futuro, aqui você fará a chamada para sua API
    setOrdens(mockData);
  }, []);

  // Filtra as ordens com base no status selecionado
  const ordensFiltradas = ordens.filter((ordem) => ordem.status === filtro);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo-container">
          {/* Adicione sua logo aqui */}
          <img src="/logo-sgm.png" alt="Logo SGM" className="logo-img" />
          <span>SGM</span>
        </div>
        <div className="user-role">ADM</div>
      </header>

      <main className="dashboard-main">
        <div className="status-filters">
          <button
            onClick={() => setFiltro("Abertas")}
            className={`filter-button ${filtro === "Abertas" ? "active" : ""}`}
          >
            Abertas
          </button>
          <button
            onClick={() => setFiltro("Andamento")}
            className={`filter-button ${
              filtro === "Andamento" ? "active" : ""
            }`}
          >
            Andamento
          </button>
          <button
            onClick={() => setFiltro("Concluídas")}
            className={`filter-button ${
              filtro === "Concluídas" ? "active" : ""
            }`}
          >
            Concluídas
          </button>
        </div>

        <div className="ordens-lista">
          <div className="ordem-cabecalho">
            <span>Id</span>
            <span>Título</span>
            <span>Equipamento</span>
            <span>Status</span>
            <span>Data Limite</span>
            <span>Ações</span>
          </div>

          {ordensFiltradas.length > 0 ? (
            ordensFiltradas.map((ordem) => (
              <div key={ordem.id} className="ordem-item">
                <span>{ordem.id}</span>
                <span>{ordem.titulo}</span>
                <span>{ordem.equipamento}</span>
                <span>{ordem.status}</span>
                <span>{ordem.dataLimite}</span>
                <span className="acoes-buttons">
                  {/* Adicione as funções de editar e criar nos botões */}
                  <button className="acao-btn edit-btn">✏️</button>
                  <button className="acao-btn create-btn">➕</button>
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
      <footer className="dashboard-footer"></footer>
    </div>
  );
}
