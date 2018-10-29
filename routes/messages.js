var express = require('express');
var router = express.Router();
const Message = require('../models/messages');
const User = require('../models/users');
const Theme = require('../models/themes');

router.post('/', function (req, res, next) {

    /* Accéder aux paramêtres dans le corps de la requète*/

    const temp = req.body


    /* Création d'un documents utilisateur */

    const message = new Message({
        contenu: temp.contenu, 
        position: "coucou",
        author: temp.auteur,
        theme: temp.themes

    }); 

    /* Enregistrement du documents utilisateurs dans la base de données. */

    message.save(function (err) {
        if (err) {
            console.error(err)
            res.status(500).send('Erreur lors de la création du nouveau message');
            return;
        } 
        
        res.send(message);
    });
});

/* GET messages listing. */
router.get('/', function (req, res, next) {
    Message.find().populate("author").sort('id').exec(function (err, messages) {
        if (err) {
            return next(err);
        }
        res.send(messages);
    });
});
router.get('/:name', function (req, res, next) {
   
    Message.find({theme: req.params.name}).populate("author").sort('id').exec(function (err, messages) {
        if (err) {
            return next(err);
        }
        res.send(messages);
    })
});

router.delete('/:id', function (req, res, next) {
        Message.findByIdAndRemove(req.params.id).exec(function (err, message) {
            if (err) {
                return next(err)
            }
            res.status(200).send({message: "le message " + req.params.id + " a été supprimé"})
        })
    });

module.exports = router;
