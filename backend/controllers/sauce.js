const Sauce = require('../models/sauce');
const fs = require('fs');

//fonction pour récupérer toutes les sauces
exports.getAllSauces = (req, res) => {
    Sauce.find()
    .then(sauces => {
        res.status(200).json(sauces);
    })
    .catch(error => res.status(400).json({ error }));
};

//fonction pour la création d'une nouvelle sauce pour la requète POST
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [''],
        usersDisliked: [''],
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créée!'}))
    .catch(error => res.status(400).json({ error }));
};

//fonction pour la modification d'une sauce pour la requete PUT par rapport à son id
exports.modifySauce = (req, res, next) => {
    let sauceObject = {};

    req.file ? (
    //Si nouvelle image sélectionnée, récupération de la sauce à partir de la base de données
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        // On supprime l'ancienne image du serveur
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlinkSync(`images/${filename}`);
    }),
    sauceObject = {
        // On modifie les données et on ajoute la nouvelle image
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }) : (
      // Si la modification ne contient pas de nouvelle image
      sauceObject = {
        ...req.body
      }
    )

    Sauce.updateOne(
        // Mise à jour des données de la sauce avec ses paramètres
        {
          _id: req.params.id
        }, {
          ...sauceObject,
          _id: req.params.id
        }
      )
      .then(() => res.status(200).json({
        message: 'Sauce modifiée !'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  }

//Recherche d'une sauce précise par rapport son id
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        res.status(200).json( sauce );
    })
    .catch(error => res.status(400).json({ error }));
};

//fonction pour supprimer une sauce en fonction de son id pour la requete DELETE
exports.deleteOneSauce = (req, res) => {

    //TODO : supprimer image du serveur
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée!'}))
    .catch(error => res.status(400).json({ error }));
};

exports.LikeDislike = (req, res) => {

    //récupération de la valeur de like de la requête
    const like = req.body.like;
    //Récupération du userId
    const userId = req.body.userId;
    //récupération de l'id de la sauce
    const id = req.params.id;

    //l'utisateur aime la sauce
    if(like === 1) {
        //utilisation fonction MongoDB pour mettre à jour avec des opérateurs de mise à jour
        Sauce.updateOne({ _id: id }, {      
            $inc: { likes: +1 }, // Incrémentation du compteur de like      
            $push: { usersLiked: userId }, // Ajout du l'userId au tableau des likes 
          })
          .then(() => res.status(200).json({ message: 'like ajouté !' }))
          .catch((error) => res.status(400).json({ error }))
    }

    //l'utilisateur n'aime pas la sauce
    if(like === -1) {
        //utilisation fonction MongoDB pour mettre à jour avec des opérateurs de mise à jour
        Sauce.updateOne({ _id: id }, {      
            $inc: { dislikes: +1 }, // Incrémentation du compteur des dislike      
            $push: { usersDisliked: userId }, // Ajout du l'userId au tableau des likes 
          })
          .then(() => res.status(200).json({ message: 'dislike ajouté !' }))
          .catch((error) => res.status(400).json({ error }))
    }

    //L'utisateur supprime son like ou son dislike
    if(like === 0) {

        //Recherche de la sauce par rapport à l'id
        Sauce.findOne({ _id: id })
        .then(sauce => {
            
            //Recherche si l'utilisateur est présent dans le tableau des likes
            if(sauce.usersLiked.includes(userId)) {
                //utilisation fonction MongoDB pour mettre à jour avec des opérateurs de mise à jour
                Sauce.updateOne({ _id: id }, {
                    $inc: { likes: -1 }, //Décrémente le compteur likes
                    $pull: { usersLiked: userId }, //supprime le userId du tableau des likes
                })
                .then(() => res.status(200).json({ message: 'like supprimé!' }))
                .catch((error) => res.status(400).json({ error }))
            }

            //Recherche si l'utilisateur est présent dans le tableau des dislikes
            if(sauce.usersDisliked.includes(userId)) {
                //utilisation fonction MongoDB pour mettre à jour avec des opérateurs de mise à jour
                Sauce.updateOne({ _id: id }, {
                    $inc: { dislikes: -1 }, //Décrémente le compteur dislikes
                    $pull: { usersDisliked: userId }, //supprime le userId du tableau des dislikes
                })
                .then(() => res.status(200).json({ message: 'dislike supprimé!' }))
                .catch((error) => res.status(400).json({ error }))
            }
            
        })
        .catch((error) => res.status(400).json({ error }))

    }
    
}

