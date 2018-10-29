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
        createdAt:new Date(),
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

router.delete('/:id', function (req, res, next) {


        Theme.findByIdAndRemove(req.params.id).exec(function (err, theme) {
            if (err) {
                return next(err)
            }
            res.status(200).send({message: "le theme " + req.params.id + req.params.name + " a été supprimer"})
        })
    });

module.exports = router;

