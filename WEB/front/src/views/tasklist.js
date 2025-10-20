// src/TaskList.js
import { useState, useEffect, useCallback  } from "react";
import { useNavigate } from 'react-router-dom';
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaRegHourglassHalf } from "react-icons/fa6";
import axios from "axios";

import Select from 'react-select'

function TaskList() {
  const navigate = useNavigate();
  const options = [
  { value: '', label: 'Todas' },
  { value: 'true', label: 'Completas' },
  { value: 'false', label: 'Incompletas' }
]
  const [option, setOption] = useState({value: '', label: 'Todas'})

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(""); // "", "true", "false"
  const [tasks, setTasks] = useState([]);

  const getTarefas = useCallback(async () => {
    var url = "http://localhost:8080/tasks/";
    if (title && completed) {
      url += "?title=" + title + "&completed=" + completed;
    } else if (title) {
      url += "?title=" + title;
    } else if (completed) {
      url += "?completed=" + completed;
    }
    console.log("URL:", url);
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }, [title, completed]);

    useEffect(() => {
      getTarefas();
    }, [getTarefas]);

    const handleDelete = async (id) => {
      try {
      const response = await axios.delete("http://localhost:8080/tasks/" + id);
      console.log(response.data);
      getTarefas();
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
    //task.deleteTask(id);
    //setTasks(task.getTasks());
    //navigate('/taskslist');
  };
  
  
  const handleOption = (op) => {
    // Navega para a página de criar/editar tarefa passando os dados da tarefa
    //navigate('/task-form', { state: { task } });
    setOption(op);
    setCompleted(op.value)
  };

  const handleEdit = (task) => {
    // Navega para a página de criar/editar tarefa passando os dados da tarefa
    //navigate('/task-form', { state: { task } });
    navigate('/taskform', { state: { task } });
    //navigate('/taskform/' +task.id);
    //navigate(`/taskform/${task.id}`);
  };



  return (
    <div>
      <h2>Lista de Tarefas</h2>

      <form style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div>
          <label>Busca</label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label>Título: </label>
          <input
            type="text"
            placeholder="Digite parte do título"
            value={title}
            onChange={(e) => setTitle(e.target.value.trimStart())}
          />
        </div>
        

        <div  style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div>
          <label>STATUS</label>
          </div>
          <div style={{width: '150px'}}>
          <Select options={options} value={option} onChange={(e) => handleOption(e)}/>
            </div>
        </div>
      </form>

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{task.titulo}</span>- 
              {task.completa ? <div><MdOutlineDoneOutline color="green"/> <span>Completa</span></div> : <div> <FaRegHourglassHalf/> <span>Incompleta</span></div>} -
              <button style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleEdit(task)} >Editar</button> - 
              <button style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleDelete(task.id)} >Deletar</button>
              </div>
            </li>
          ))
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default TaskList;
