import { useState } from "react"
import TodoForm from "./componentes/TodoForms";
import TodoList from "./componentes/TodoList";

//Declaração do Componente
const App = () =>{
  //Controle de Estado
  const [tasks,setTasks] = useState([]);
  // Função para adicionar Tarefa
  const addTask = (task) => {
    setTasks([...tasks, task]);
  }
  //Função para remover Tarefa
  const removeTask = (index) =>{
    // buscar a tarefa pelo índice e remove
    setTasks(tasks.filter((_,i)=> i !==index));
  };

  return(
    <div>
      <h1>Lista de Tarefas</h1>
      <TodoForm addTask = {addTask}/>
      <TodoList tasks = {tasks} removeTask = {removeTask}/>
    </div>
  )
};

export default App;