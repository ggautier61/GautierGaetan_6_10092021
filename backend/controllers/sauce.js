const Sauce = require('../models/sauce');
const fs = require('fs');

//fonction pour récupérer toutes les sauces
exports.getAllSauces = (req, res) => {
    Sauce.find()
    .then(sauces => {
        // console.log(sauces);
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
// exports.modifySauce2 = (req, res) => {

//     let sauceObject = {};

//     if(req.file) {
//     //Si nouvelle image sélectionnée, récupération de la sauce à partir de la base de données
        
//         Sauce.findOne({ _id: req.params.id })
//         .then(sauce => {
//             //suppression de l'ancienne image du serveur
//             const filename = sauce.imageUrl.split('/images/')[1];
//             fs.unlink(`/images/${ filename }`);
            
//             //si modification de l'image (req.file existe), l'objet sauce prendra la modification du 
//             //chemin de l'image.
//             sauceObject =  
//             {   ...req.body,
//                 imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//             }
//             console.log(sauceObject);

//         })
//         .catch(error => res.status(400).json({ error }));

//     } else {
//     //Si pas d'image sélectionnée
//     console.log('pas de fichier');
//         sauceObject = {
//             ...req.body
//           }
//     }   
    
//     console.log(sauceObject);
        
//     //Mise à jour des informations de la sauce
//     Sauce.updateOne({ _id: req.params.id}, { ...sauceObject , _id: req.params.id })
//     .then(() => {
//         res.status(200).json({ message:  'Sauce modifiée!' });
//     })
//     .catch(error => res.status(400).json({ error }));
    
// };

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
        // console.log('sauce', sauce);
        res.status(200).json( sauce );
    })
    .catch(error => res.status(400).json({ error }));
};

//fonction pour supprimer une sauce en fonction de son id pour la requete DELETE
exports.deleteOneSauce = (req, res) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée!'}))
    .catch(error => res.status(400).json({ error }));
};

exports.addLike = (req, res) => {
    this.getOneSauce(req)
    .then(sauce => {
        if(req.boby.like == 1) {
            
        }
    })
    .catch(error => res.status(400).json({ error }));

    
}

