# HOT TAKES #

Projet 6 - Construisez une API sécurisée pour une application d'avis gastronomiques - de la formation Développeur Web d'Openclassroom. Il fallait développer la partie backend de l'application Hot Takes, site de sauces piquantes. L'utilisateur peut ajouter des sauces et peut liker ou disliker la sauce et celles d'un autre utilisateur.

Voir ci-dessous comment installer et démarrer le backend de l'application.

## Backend Installation ##

Go to the `backend` folder and run the commande `npm install`.

## Fichier de configuration ##

Create a `.env` file in the `backend` folder. In this file, create 3 variables and add the value corresponding :

LOGIN_DB = (your login of your MongoDb Altas Database)
PWD_DB = (your MongoDb password)
URL_DB = (the end of the url after `@` symbol)

Save the file.

## Run Backend ##

From the folder `backend`, run the command `nodemon server`.

The server will start en `localhost` and use port `3000`.

If everything is ok, the message `Connexion à MongoDB réussie !` should appear in the console.

The server should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the local server.