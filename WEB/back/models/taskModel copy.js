const db = require('../config/db'); 


const tasks = {
getTasks: (filtros, callback) => { 
  const params = [];
  let query = 'SELECT * FROM tarefas';
  const condicoes = [];

  if (filtros.title && filtros.title!== '') {
    condicoes.push('LOWER(titulo) LIKE ?');
    params.push(filtros.title.toLowerCase() + '%');
  }

  if (filtros.completed !== undefined && filtros.completed !== null && filtros.completed !== '') {
    const feita = filtros.completed === 'true' || filtros.completed === 1 ? 1 : 0;
    condicoes.push('completa = ?');
    params.push(feita);
  }

  if (condicoes.length > 0) {
    query += ' WHERE ' + condicoes.join(' AND ');
  }

  console.log("Query:", query, params);
  db.query(query, params, callback); 
},


create: (data, callback) => { 
const { titulo, completa } = data; 
db.query('INSERT INTO tarefas(titulo, completa) VALUES (?, ?)', [titulo, completa], callback); 
}, 

delete: (id, callback) => { 
db.query('DELETE FROM tarefas where id = ?', [id], callback); 
},

getTask: (id, callback) => { 
db.query('SELECT * FROM tarefas WHERE id = ?', [id], callback);     
},

update: (id, data, callback) => {
  const { titulo, completa } = data;
  const sql = 'UPDATE tarefas SET titulo = ?, completa = ? WHERE id = ?';
  db.query(sql, [titulo, completa, id], callback);
},

}

module.exports = tasks;
