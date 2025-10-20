import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function TaskForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(0);
  const [id, setId] = useState();
  const [message, setMessage] = useState("");

  const location = useLocation();

  
  /*
  useEffect(() => {
    // Se vier tarefa no state, é edição
    if (location.state?.task) {
      
      const task = location.state.task;
      setId(task.id);
      setTitle(task.title);
      setCompleted(task.completed);
    }else {
    // Resetar campos para criação
    setId(undefined);
    setTitle("");
    setCompleted(0);
  }
  }, [location.state]);
*/

useEffect(() => {
  const task = location.state?.task;
  console.log("Task from location state:", task);
  if (task) {
    setId(task.id ?? undefined);
    setTitle(task.titulo ?? "");
    setCompleted(task.completa ?? 0);
  }

  console.log("Location state:", location.state);
  console.log("Location state:", id, title, completed);
}, [location]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id){
      console.log('Editando')
      try{
        const response = await axios.put('http://localhost:8080/tasks/' + id, {
          titulo: title,
          completa: completed
        });
        console.log(response.data);
        navigate('/taskslist')
      }catch (error) {
        console.error("Erro ao editar tarefa:", error);
      }
    
    }
    else{
      console.log('criando')
      try {
        const response = await axios.post("http://localhost:8080/tasks/",
          { titulo: title,
            completa: completed 
          });
        console.log(response.data);
        navigate('/taskslist')
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
      }
      /*
      try {
      await createTask({ title, completed });
    } catch (err) {
      setMessage("Erro: Erro ao salvar tarefa");
    }
    */
    }
  }

  return (
    <div>
      <h2>Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Status: </label>          
          <select
            value={completed===1?"true":'false'}
            onChange={(e) => setCompleted(e.target.value === "true"?1:0)}
          >
            <option value="false">A fazer</option>
            <option value="true">Feita</option>
          </select>
        </div>

         <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default TaskForm;
