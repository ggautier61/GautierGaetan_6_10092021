const Sauce = require('../models/sauce');

//fonction pour récupérer toutes les sauces
exports.getAllSauces = (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json({ sauces }))
    .catch(error => res.status(400).json({ error }));
};

//fonction pour la création d'une nouvelle sauce pour la requète POST
exports.createSauce = (req, res) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    })
    sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créée!'}))
    .catch(error => res.status(400).json({ error }));
};

//fonction pour la modification d'une sauce pour la requete PUT par rapport à son id
exports.modifySauce = (req, res) => {
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
    .then(sauce => res.status(200).json({ message: 'Sauce modifiée!' }))
    .catch(error => res.status(400).json({ error }));
};

//Recherche d'une sauce précise par rapport à son id
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json({ sauce }))
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

