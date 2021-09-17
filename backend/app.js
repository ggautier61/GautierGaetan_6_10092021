const express = require('express');
const bobyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');


//Création de l'application
const app = express();

//connexion à la base de données MongoDB en utilisant mongoose
mongoose.connect('mongodb+srv://gaetan:gaetanpassword@cluster0.2x8kv.mongodb.net/Hot_takes?retryWrites=true&w=majority',
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

app.use('/images', express.static(path.join(__dirname, 'images')));

//configuration des routes de bases
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;