
//importation de Mongoose
const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');


const sauceModel = mongoose.Schema({

    //Id user mongoDB qui à créer la sauce
    userId: { type: String, required: true },

    //Nom de la sauce
    name: { type: String, required: true },
    
    //Fabriquant de la sauce
    manufacturer: { type: String, required: true },
    
    //Description de la sauce
    description: { type: String, required: true },

    //Le principal ingrédient épicé de la sauce
    mainPepper: { type: String, required: true },

    //l'URL de l'image de la sauce téléchargée par l'utilisateur
    imageUrl: { type: String, required: true },

    //nombre entre 1 et 10 décrivant la sauce
    heat: { type: Number, required: true },

    //nombre d'utilisateurs qui aiment (= likent) la sauce
    likes: { type: Number, required: true },

    //nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce
    dislikes: { type: Number, required: true },

    //tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce
    usersLiked: { type: [String]},

    //tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce
    usersDisliked: { type: [String]}

});


// Plugin Mongoose pour nettoyer les données avant injection dans la base MongoDB
sauceModel.plugin(sanitizerPlugin);

//exportation du model sauce pour être utilisable dans l'application
module.exports = mongoose.model('Sauce', sauceModel);