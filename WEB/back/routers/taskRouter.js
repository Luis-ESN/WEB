const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController.js');

// Definindo as rotas para as operações CRUD

router.get('/', taskController.listarTarefas);
router.delete('/:id', taskController.deletarTarefa);
router.get('tarefa/:id', taskController.getTarefa);
router.post('/', taskController.criarTarefa);
router.put('/:id', taskController.atualizarTarefa);  // <- rota para update

module.exports = router;
