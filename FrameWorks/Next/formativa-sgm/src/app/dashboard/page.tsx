"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardAdmin from "../componentes/dashboardAdmin";
import DashboardGerente from "../componentes/dashboardGerente";
import DashboardTecnico from "../componentes/dashboardTecnico";

 //UI

export default function DashboardPage(){
    const route = useRouter();
    //variavel
    const [funcao, setFuncao] = useState<string | null> (null);

    //UseEffect => função que será executa no começo da aplicação
    useEffect(()=>{
        //pegar a função do usuário
        const funcao = localStorage.getItem("funcao");
        //verificar se a função não esta vazia
        if(!funcao){
            // se função for vazia => retorna para a tela de login
            route.push("/login");
        }else{
            //set da função do usuário
            setFuncao(funcao);
        }
    });

    //handle para logout
    const handleLogout = async()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("funcao");

        route.push("/login");
    }

    //montagem da tela de acordo com o usuário logado
    const renderDashboard = () =>{
        if(funcao?.toLowerCase() === "admin"){
            return <DashboardAdmin/>;
        } else if(funcao === "gerente"){
            return <DashboardGerente/>;
        } else if(funcao === "tecnico") {
            return <DashboardTecnico/>;
        }
    }

    //reactDom
    return(
        <div>
            <header>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main>
                {renderDashboard()}
            </main>
        </div>
    )
}