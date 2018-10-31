var express = require('express');
var router = express.Router();
const Message = require('../models/messages');
const User = require('../models/users');
const Theme = require('../models/themes');
const secretKey = process.env.SECRET_KEY || 'changeme';

//FONCTION AUTHENTIFICATION
function authenticate(req, res, next) {
    // Ensure the header is present.
    const authorization = req.get('Authorization');
    if (!authorization) {
        return res.status(401).send('Authorization header is missing');
    }
    // Check that the header has the correct format.
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        return res.status(401).send('Authorization header is not a bearer token');
    }
    // Extract and verify the JWT.
    const token = match[1];
    jwt.verify(token, secretKey, function (err, payload) {
        if (err) {
            return res.status(401).send('Your token is invalid or has expired');
        } else {
            req.currentUserId = payload.sub;
            next(); // Pass the ID of the authenticated user to the next middleware.
        }
    });
}

router.post('/', authenticate, function (req, res, next) {

    /* Accéder aux paramêtres dans le corps de la requète*/

    const temp = req.body


    /* Création d'un documents utilisateur */

    const message = new Message({
        contenu: temp.contenu,
        posLongitude: temp.longitude,
        posLatitude: temp.latitude,
        author: temp.auteur,
        theme: temp.thema

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
router.get('/', authenticate, function (req, res, next) {
    Message.find().populate("author").sort('id').exec(function (err, messages) {
        if (err) {
            return next(err);
        }
        res.send(messages);
    });
});


router.delete('/:id', authenticate, function (req, res, next) {
    Message.findByIdAndRemove(req.params.id).exec(function (err, message) {
        if (err) {
            if (req.currentUserId !== message.user.id.toString()) {
                return res.status(403).send('Please mind your own things.')
            }
            return next(err)
        }
        res.status(200).send({
            message: "le message " + req.params.id + " a été supprimé"
        })
    })
});

module.exports = router;
