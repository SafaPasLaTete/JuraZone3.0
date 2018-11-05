var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Theme = require('../models/themes');
const Message = require('../models/messages');
const secretKey = process.env.SECRET_KEY || 'changeme';




/**
 * @api {get} /themes Get all the themes per pages
 * @apiName GetThemes
 * @apiGroup Theme
 *
 * @apiParam {String} name name of the Theme
 * @apiParam {String} image image of the Theme
 * @apiParam {createdAt} createdAt creation of the theme
 *
 * @apiSuccess {Object[]} themes
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *{
    "page": 1,
    "pageSize": 100,
    "total": 3,
    "data": [
        {
            "createdAt": "2018-11-05T15:43:35.563Z",
            "_id": "5bd6c3106d8f4938ee495579",
            "name": "cinema",
            "__v": 0
        },
        {
            "_id": "5bd6d2d29f82be3a40b1feec",
            "name": "sfgds",
            "createdAt": "2018-10-29T09:28:50.447Z",
            "__v": 0
        },
        {
            "_id": "5bd71d35bfa4413f1bf573de",
            "name": "series",
            "createdAt": "2018-10-29T14:46:13.206Z",
            "__v": 0
        }
    ]
}
 */




router.get('/',authenticate, function(req, res, next) {

    Theme.find().count(function(err, total) {
        if (err) { return next(err); };
        let query = Theme.find();

        let page = parseInt(req.query.page, 10);
        if (isNaN(page) || page < 1) {
            page = 1;
        }

        let pageSize = parseInt(req.query.pageSize, 10);
        if (isNaN(pageSize) || pageSize < 0 || pageSize > 100) {
            pageSize = 100;
        }

        query = query.skip((page - 1) * pageSize).limit(pageSize);

        query.exec(function(err, themes) {
            if (err) { return next(err); }

            res.send({
                page: page,
                pageSize: pageSize,
                total: total,
                data: themes
            });
        });
    });

    
});


/**
 * @api {get} /:name Get a specific theme
 * @apiName GetThemes
 * @apiGroup Theme
 *
 * @apiParam {String} name name of a theme
 *
 * @apiSuccess {Object} theme a specific theme in API
 * @apiSuccessExample {json} Success-Response:
 *
 * [
 {
     "createdAt": "2018-11-05T15:56:23.272Z",
     "_id": "5bd6c3106d8f4938ee495579",
     "name": "cinema",
     "__v": 0
 }
 ]
 */



router.get('/:name',authenticate, function (req, res, next) {
    Theme.find({ name: req.params.name }).sort('name').exec(function (err, theme) {
        if (err) {
            res.status(400).send('Erreur erreur');
            return next(err)
        }
        res.send(theme)
    })
})




/**
 * @api {get} /theme/:id/messages Get all the messages of the theme
 * @apiName GetMessagesofthetheme
 * @apiGroup Theme
 *
 * @apiSuccess {Object[]} get all the messages of the theme
 * @apiSuccessExample {json} Success-Response:
 *
 *
 * [
 {
     "posLatitude": 0,
     "posLongitude": 0,
     "author": "5bd6ff7017f0773164f5b247",
     "theme": "5bd71d35bfa4413f1bf573de",
     "contenu": "Julien me fait peur!!!",
     "position": "coucou",
     "createdAt": "2018-10-29T15:19:44.304Z",
     "id": "5bd725103ec2d43fda32a93f"
 }
 ]
 */




router.get('/:id/messages',authenticate, function (req, res, next) {

    console.log(req.params.id);

    Message.find({ theme: req.params.id }).exec(function (err, message) {
        if (err) {
            res.status(400).send('Erreur erreur');
            return next(err)
        }
        res.send(message)

    })
})


/**
 * @api {post} /themes Create a new theme
 * @apiName PostTheme
 * @apiGroup Theme
 * @apiParam (Request body) {String} name name of the new theme
 * @apiParam (Request body) {String} photo photo of the new theme
 * @apiParam {createdAt} createdAt creation of the theme
 *
 * @apiSuccess {Object} theme a new theme
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "_id": "5be070626c0eba32542f6698",
    "name": "sport",
    "createdAt": "2018-11-05T16:31:30.701Z",
    "__v": 0
}
 */


router.post('/',authenticate, function(req, res, next) {


    const temp = req.body



    const theme = new Theme({
        name:temp.name,
        photo:temp.photo,
        createdAt:new Date(),
    });


    theme.save(function(err) {
        if(err) {
            console.error(err)
            res.status(500).send('Erreur lors de la création du nouveau theme');
            return
        }
        res.send(theme);
    });
});



/**
 * @api {delete} /themes/:id Delete a theme
 * @apiName DeleteTheme
 * @apiGroup Theme
 *
 * @apiParam {Number} id id of the theme
 * @apiSuccess {String} Success
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "message": "le theme 5bd71d35bfa4413f1bf573deundefined a été supprimé"
    }
 */



router.delete('/:id',authenticate, function (req, res, next) {


        Theme.findByIdAndRemove(req.params.id).exec(function (err, theme) {
            if (err) {
                return next(err)
            }
            res.status(200).send({message: "le theme " + req.params.id + req.params.name + " a été supprimé"})
        })
    });




/**
 * @api {get} /theme/:id/nbrmessages Get all the messages of the theme
 * @apiName GetAllMessageOfTheTheme
 * @apiGroup Theme
 *
 * @apiSuccess {Object[]} get all the messages of the theme
 * @apiSuccessExample {json} Success-Response:
 *
 *
 * [
 {
     "_id": "5bd71d35bfa4413f1bf573de",
     "messagesCount": 1
 }
 ]
 */




router.get('/:id/nbrmessages',authenticate, function (req, res, next) {

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

