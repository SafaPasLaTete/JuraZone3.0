var express = require('express');
var router = express.Router();
const Message = require('../models/messages');
const User = require('../models/users');
const Theme = require('../models/themes');
const secretKey = process.env.SECRET_KEY || 'changeme';

//FONCTION AUTHENTIFICATION
function authenticate(req, res, next) {
    // vérif que le header est présent
    const authorization = req.get('Authorization');
    if (!authorization) {
        return res.status(401).send('Authorization header is missing');
    }
    // vérifie qu'il est de la bonne forme
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        return res.status(401).send('Authorization header is not a bearer token');
    }
    // extraire et vérifie le token
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


/**
 * @api {post} /messages Create a new message
 * @apiName CreateMessage
 * @apiGroup Messages
 * @apiDescription function to create a new message
 * @apiVersion 1.0.0
 *
 *
 * @apiUse MessageParams
 *
 * @apiSuccess {Object} Message the message that will be saved
 */

router.post('/', authenticate, function (req, res, next) {



    const temp = req.body



    const message = new Message({
        contenu: temp.contenu,
        posLongitude: temp.longitude,
        posLatitude: temp.latitude,
        author: req.currentUserId,
        theme: temp.thema

    });


    message.save(function (err) {
        if (err) {
            console.error(err)
            res.status(500).send('Erreur lors de la création du nouveau message');
            return;
        }

        res.send(message);
    });
});

/**
 * @api {get} /messages Get all the messages
 * @apiName GetMessages
 * @apiGroup Messages
 * @apiDescription function to get all the messages (independant from theme)
 * @apiVersion 1.0.0
 *
 *
 * @apiUse MessageParams
 *
 * @apiSuccess {Object} Message the message that will be updated
 */

router.get('/', authenticate, function (req, res, next) {
    Message.find().populate("author").sort('id').exec(function (err, messages) {
        if (err) {
            return next(err);
        }
        res.send(messages);
    });
});

/**
 * @api {delete} /messages Delete a new message
 * @apiName DeleteMessage
 * @apiGroup Messages
 * @apiDescription function to delete a new message
 * @apiVersion 1.0.0
 *
 *
 * @apiUse MessageParams
 *
 * @apiSuccess {String} Sucess le message a été supprimé
 */

router.delete('/:id', authenticate, function (req, res, next) {
    Message.findByIdAndRemove(req.params.id).exec(function (err, message) {
        if (err) {
            if (req.currentUserId !== message.user.id.toString()) {
                return res.status(403).send('Please mind your own things. User not autorized.')
            }
            return next(err)
        }
        res.status(200).send({
            message: "le message " + req.params.id + " a été supprimé"
        })
    })
});



/**
 * @apiDefine MessageParams
 *
 * @apiParam (Body response) {Number} id Unique identifier of the message
 * @apiParam (Body request) {String} contenu Content of the message
 * @apiParam (Body request) {Number} posLatitude latitude of where the message was posted
 * @apiParam (Body request) {Number} posLongitude longitude of where the message was posted
 * @apiParam (Body response) {Date} createdAt date of the creation (automatic)
 * @apiParam (Body request) {ObjectId} author author of the message (auto from the auth)
 * @apiParam (Body request) {ObjectId} theme theme of the message
 *
 */



module.exports = router;
