const express = require('express');
const saucesCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

const router = express.Router();

//Configuration des routes sauces
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, saucesCtrl.createSauce);
router.put('/:id', auth, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post('/:id/like', auth, saucesCtrl.addLike); 

module.exports = router;