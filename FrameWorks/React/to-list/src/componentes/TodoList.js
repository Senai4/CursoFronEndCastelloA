const TodoList = ({tasks, removeTask}) =>{
    return(
        <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                    {task} <button onClick={() => removeTask(index)}>
                        Excluir
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;