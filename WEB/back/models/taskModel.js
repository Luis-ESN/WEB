const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/db'); 

const Task= sequelize.define('Task', { 
titulo: { 
type: DataTypes.STRING, 
allowNull: false 
}, 
completa: { 
type: DataTypes.INTEGER, 
allowNull: false 
} 
}, { 
tableName: 'tarefas', 
timestamps: false 
}); 
module.exports = Task;