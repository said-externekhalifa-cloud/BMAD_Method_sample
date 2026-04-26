const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronise le modèle avec la base de données.
// Ceci créera la table 'Products' si elle n'existe pas.
// sequelize.sync() est déjà appelé dans index.js, donc ce n'est pas strictement nécessaire ici,
// mais utile pour la modularité si ce fichier devait être exécuté seul.
// Toutefois, pour éviter des appels multiples et potentiellement des conflits,
// on peut laisser la synchronisation globale dans index.js.
// Pour les besoins de l'exercice, je l'ajoute ici mais avec une note.

// Product.sync({ alter: true }) // Utiliser { alter: true } pour mettre à jour la table sans la supprimer
//   .then(() => {
//     console.log('Modèle Product synchronisé avec la base de données.');
//   })
//   .catch(err => {
//     console.error('Erreur lors de la synchronisation du modèle Product:', err);
//   });

module.exports = Product;
