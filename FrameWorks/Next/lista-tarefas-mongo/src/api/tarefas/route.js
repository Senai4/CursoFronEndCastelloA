// rotas GET e POST 

import Tarefa from "@/models/Tarefa";
import connectMongo from "@/services/mongodb";
import { NextResponse } from "next/server";

//GET 
export async function GET(){
    try{
        await connectMongo(); //conecta com o mongoDB
        const tarefa = await tarefa.find({}); //retorna as tarefas 
        //usando o método NextResponse => fazer as requisições http
        return NextResponse.json(terafas, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao buscar as tarefas"},
            {status: 500}
        );
    }
}

//POST
export async function POST(tarefa) {
    try {
        await connectMongo();
        const data = await tarefa.json(); //transfoma os dados em Json para enviar a requisição http
        const body = await Tarefa.create(data); //criar a tarefa no BD
        return NextResponse.json(body, {status:201});
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao criar as tarefas"},
            { status: 500 }
        );
        
    }
}