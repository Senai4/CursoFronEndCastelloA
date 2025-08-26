import { useState } from "react";

//React DOM

const TodoForm = ({addTask}) => {
    //Controle de estado
    const [task, setTask] = useState("");

    //Função para adicionar tarefa
    const handleSubmit = (e) => {
        //Prevenir o comportamento padrão do formulário
        e.preventDefault();
        // verificar se não esta vazio
        if(task.trim() !== ""){
            addTask(task); //adiciona tarefas no vetor
            setTask(""); //limpa o campo
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Digite uma tarefa" value={task}
            onChange={(e) => setTask(e.target.value)} />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default TodoForm;