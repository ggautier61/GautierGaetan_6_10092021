const express = require('express');
const saucesCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

//Configuration des routes sauces
router.get('/', auth, multer, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post('/:id/like', auth, saucesCtrl.addLike); 

module.exports = router;