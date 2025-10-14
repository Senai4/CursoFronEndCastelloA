"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import './page.css';

 // página de interação do usuário UI

export default function LoginPage(){
    //variaveis para armazenamento de informações com o UseState
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    //componente para navegação
    const route = useRouter(); //rotas de Navegação em SPA

    //ação para enviar o formulário de login
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault(); //evita o reenvio da página
        setErro(""); //limpa a mensagem de erro

        try {
            const response = await fetch(
                "/api/usuarios/login", //rota da api
                {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({email, senha})
                }
            );
            //análise a resposta obtida
            const data = await response.json();
            if(data.success){
                //armazenamento das informações obtidas no LocalStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("funcao", data.usuario.funcao);//armazeno a função do usuário
                route.push("/dashboard");//navega para o dashboard
            }else{
                const dataErro = data.error();
                setErro(dataErro.message || "Falha de login")
            }
        } catch (error) {
            console.error("Erro de Login: ", error);
            setErro("Erro de Servidor: "+error);
        }
    };
        //REACTDOM
        return (
        <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {erro && <p className="error-message">{erro}</p>}
        
        <input 
            className="input-field email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
        />
        
        <input 
            className="input-field password-input"
            type="password" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Password" 
            required
        />

        <button className="submit-btn" type="submit">Entrar</button>
    </form>
);
}