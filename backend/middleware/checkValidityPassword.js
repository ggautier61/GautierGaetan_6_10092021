//importation du model
const passwordModel = require('../models/password');


module.exports = (req, res, next) => {
    if(!passwordModel.validate(req.body.password)) {
        
        res.status(401).json({ message: 'Le mot de passe doit contenir au moins ' + 
        '1 lettre, 1 chiffres, 1 majuscule, 1 minuscule, 1 symbole et sans espace' })
    } else {
        next();
    }


}