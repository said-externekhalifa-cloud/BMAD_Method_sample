const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Le fichier de base de données sera stocké à la racine du projet
  logging: false, // Désactiver les logs SQL pour plus de clarté
});

module.exports = sequelize;
