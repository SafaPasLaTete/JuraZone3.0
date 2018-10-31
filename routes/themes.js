var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Theme = require('../models/themes');
const Message = require('../models/messages');
const secretKey = process.env.SECRET_KEY || 'changeme';
/* GET messages listing. */
router.get('/', function(req, res, next) {
    Theme.find().sort('id').exec(function(err, themes) {
        if (err) {
            return next(err);
        }
        res.send(themes);
    });

    
});


router.get('/:name',authenticate, function (req, res, next) {
    Theme.find({ name: req.params.name }).sort('name').exec(function (err, theme) {
        if (err) {
            res.status(400).send('Erreur erreur');
            return next(err)
        }
        res.send(theme)
    })
})




router.get('/:id/messages', function (req, res, next) {

    /*   Theme.findOne({ _id: req.params.id }).exec(function (err, theme) {
        if (err) {
            res.status(400).send('Erreur erreur');
            return next(err)
        }

        Message.aggregate([
            {
                $match: {
                    "theme" : theme._id
                }
            }
        ], function (err, results) {
            if (err) {
                res.status(400).send('Erreur erreur');
                return next(err)
            }
            res.send(results)
        });


    })*/
    console.log(req.params.id);

    Message.find({ theme: req.params.id }).exec(function (err, message) {
        if (err) {
            res.status(400).send('Erreur erreur');
            return next(err)
        }
        res.send(message)

    })
})





router.post('/',authenticate, function(req, res, next) {

    /* Accéder aux paramêtres dans le corps de la requète*/

    const temp = req.body


    /* Création d'un documents theme */

    const theme = new Theme({
        name:temp.name,
        photo:temp.photo,
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

router.delete('/:id',authenticate, function (req, res, next) {


        Theme.findByIdAndRemove(req.params.id).exec(function (err, theme) {
            if (err) {
                return next(err)
            }
            res.status(200).send({message: "le theme " + req.params.id + req.params.name + " a été supprimé"})
        })
    });


router.get('/:id/nbrmessages', function (req, res, next) {

    Theme.findOne({_id:req.params.id},(err,theme) => {
        Message.aggregate([
        {
            $match: {
                "theme": theme._id
            }
        },
        {
            $group: {
                _id: '$theme',
                messagesCount: {
                    $sum: 1
                }
            }
        }
    ], function (err, results) {
        if (err) {
            return next(err);
        }
        res.send(results)
    })
})


})

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
    jwt.verify(token, secretKey, function(err, payload) {
        if (err) {
            return res.status(401).send('Your token is invalid or has expired');
        } else {
            req.currentUserId = payload.sub;
            next(); // Pass the ID of the authenticated user to the next middleware.
        }
    });
}




module.exports = router;

