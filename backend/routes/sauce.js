const express = require('express');
const saucesCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

//Configuration des routes sauces avec vérification de l'authentification

//Route pour la création d'une nouvelle sauce, vérification de l'authentification du user,
//et utilisation de multer pour récupérer l'image
router.post('/', auth, multer, saucesCtrl.createSauce);

//Route pour la modfication de la sauce et récupération de l'image modifiée
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

//Route pour la suppression de la sauce sélectionnée
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);

//Route pour récupérer toutes les sauces de la bases de données
router.get('/', auth, saucesCtrl.getAllSauces);

//Route pour récupérer une seule sauce en fonction de son id
router.get('/:id', auth, saucesCtrl.getOneSauce);

//Route pour poster un like ou un dislike
//(like prend 3 valeurs. 1: like, -1: dislike et 0: suppression du like ou dislike)
router.post('/:id/like', auth, saucesCtrl.LikeDislike); 

module.exports = router;