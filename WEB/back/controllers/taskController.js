const Task = require('../models/taskModel'); 

const listarTarefas = (req, res) => {
   const filtros = req.query;
Task.getTasks(filtros, (err, results) => { 
if (err) return res.status(500).send('Erro ao buscar tarefas'); 
return res.status(200).json(results); 
}); 
}; 

exports.listarTarefas = async (req, res) => { 
try { 
const tarefas = await Task.findAll(); 
res.status(200).json(tarefas); 
} catch (err) { 
res.status(500).send('Erro ao buscar tarefas'); 
} 
};

const criarTarefa = (req, res) => { 
const novaTarefa = req.body; 
Task.create(novaTarefa, (err, result) => { 
if (err) return res.status(500).send('Erro ao criar tarefa'); 
res.send('Tarefa criada com sucesso!'); 
}); 
}; 

const deletarTarefa = (req, res) => { 
const id = req.params.id; 
Task.delete(id, (err, result) => { 
if (err) return res.status(500).send('Erro ao deletar tarefa'); 
return res.status(200).send('Tarefa deletada com sucesso!'); 
}); 
};  

const getTarefa = (req, res) => {
const id = req.params.id; 
Task.getTask(id, (err, results) => { 
if (err) return res.status(500).send('Erro ao buscar tarefa'); 
return res.status(200).json(results); 
}); 
}; 

const atualizarTarefa = (req, res) => {
  const id = req.params.id;
  const dados = req.body;

  Task.update(id, dados, (err, result) => {
    if (err) return res.status(500).send('Erro ao atualizar tarefa');
    res.send('Tarefa atualizada com sucesso!');
  });
};

module.exports = {
   listarTarefas,
   getTarefa,
   criarTarefa,
   deletarTarefa,
   atualizarTarefa
};
 
 
 
 
 /*
 
 const taskModel = require('../models/taskModel');

 // GET /tasks - Listar todas as tarefas
 const getAllTasks = (req, res) => {
    const tasks = taskModel.getTasks();
    res.status(200).json(tasks);
 };


module.exports = {
   getAllTasks ,
};
 */