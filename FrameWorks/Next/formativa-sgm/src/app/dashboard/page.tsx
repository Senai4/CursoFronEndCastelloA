"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardAdmin from "../componentes/dashboardAdmin";
import DashboardGerente from "../componentes/dashboardGerente";
import DashboardTecnico from "../componentes/dashboardTecnico";

export default function DashboardPage() {
    const route = useRouter();
    const [funcao, setFuncao] = useState<string | null>(null);

    useEffect(() => {
        const funcaoStorage = localStorage.getItem("funcao");
        if (!funcaoStorage) {
            route.push("/login");
        } else {
            setFuncao(funcaoStorage);
        }
    }, []);

    // A lógica de Logout permanece centralizada aqui
    const handleLogout = async () => {
        localStorage.removeItem("authToken"); 
        localStorage.removeItem("funcao");
        route.push("/login");
    }

    // A montagem agora PASSA a função de logout para o componente filho
    const renderDashboard = () => {
        if (funcao?.toLowerCase() === "admin") {
            return <DashboardAdmin onLogout={handleLogout} />; 
        } else if (funcao === "gerente") {
            return <DashboardGerente onLogout={handleLogout} />;
        } else if (funcao === "tecnico") {
            return <DashboardTecnico onLogout={handleLogout} />; 
        }
        return <div>Carregando...</div>;
    }

    return (
        <>
            {renderDashboard()}
        </>
    )
}