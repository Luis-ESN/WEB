 const express = require('express');
 const cors = require('cors');

 const app = express();
 
 //const methodOverride = require('method-override');
 //app.use(methodOverride('_method'))
 
 //const path = require('path');
 //app.use(express.static(path.join(__dirname, 'view')));
 
 // Configurando middlewares
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 const taskRoutes = require('./routers/taskRouter');
 app.use('/tasks', taskRoutes);

 const PORT = process.env.PORT || 8080;
 
 app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
 });