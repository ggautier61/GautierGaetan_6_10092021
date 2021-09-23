const express = require('express');
const bobyParser = require('body-parser');
//Importation du plugin mongoose pour mongoDb
const mongoose = require('mongoose');
//importation des routes de l'app
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
//Importation de path pour sauvegarder les images et
const path = require('path');
//importation de Helmet pour sécuriser l'app Express
const helmet = require('helmet');

//Création de l'application
const app = express();
//Importation de dotnet pour gerer les fichiers système
require('dotenv').config();

app.use(helmet()); // Utilisation de Helmet pour sécuriser l'app Express

//connexion à la base de données MongoDB en utilisant mongoose.
//Utilisation d'un fichier de configuration pour stocker login et mot de passe
mongoose.connect('mongodb+srv://' + process.env.LOGIN_DB + ':' + process.env.PWD_DB + '@cluster0.2x8kv.mongodb.net/Hot_takes?retryWrites=true&w=majorityprocess.env.URL_DB',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//paramétrage des headers pour CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utilisation de bodyParser
app.use(bobyParser.json());

//Détermination d'un chemin statique pour accéder au dossier local "images"
app.use('/images', express.static(path.join(__dirname, 'images')));

//configuration des routes de bases
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;