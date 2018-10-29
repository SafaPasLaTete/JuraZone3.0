var express = require('express');
var router = express.Router();
const Theme = require('../models/themes');
/* GET messages listing. */
router.get('/', function(req, res, next) {
    Theme.find().sort('id').exec(function(err, themes) {
        if (err) {
            return next(err);
        }
        res.send(themes);
    });
});

router.post('/', function(req, res, next) {

    /* Accéder aux paramêtres dans le corps de la requète*/

    const temp = req.body


    /* Création d'un documents theme */

    const theme = new Theme({
        name:temp.name,
        photo:'',
    });

    /* Enregistrement du documents utilisateurs dans la base de données. */

    theme.save(function(err) {
        if(err) {
            console.error(err)
            res.status(500).send('Erreur lors de la création du nouveau theme');
            return
        }
        res.send(theme);
    });
});




module.exports = router;

