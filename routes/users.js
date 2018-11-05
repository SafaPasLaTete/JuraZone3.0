var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'changeme';

/* GET users listing. */

function findUserMiddleware(req, res, next) {
    User.findOne({_id: req.params.id}).exec(function (err, user) {
        if (err) {

            return next(err)
        }
        if (user === null) {
            const err = new Error()
            err.status = 404
            err.message = 'User Not Found'
            return next(err)
        }

        req.user = user;
        next()
    })
}
/**
 * @api {get} /users List users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a list of users sorted by userid.
 *
 * @apiUse UserBodyResp
 *
 * @apiExample Example
 *     GET /users HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *     Location: https://comem-webserv-2018-2019-c.herokuapp.com/
 *
 *     [
 *       {
 *         "_id": "5bd72278b3357a0990ec5599",
 *         "pseudo": "Test3",
 *         "password": "$2b$10$nndUQLvYOC2qXzohIP3foO80uyzSGqUKRvc2CmPeuTsDvgeNKhzZG",
 *         "creationAt": "2018-10-29 15:08:40.659",
 *         "modificationAt": "2018-10-29 15:08:40.664"
 *       },
 *       {
 *         "_id": "5bd9d5104036f23c64408196",
 *         "pseudo": "Test4",
 *         "password": "$2b$10$5z03Ps7wwSI7Eoq.Xd6Xku5g.9cPd0DFmfWCr0NfG2gfTBiyKPxmG",
 *         "creationAt": "2018-10-31 16:15:12.417",
 *         "modificationAt": "2018-10-31 16:15:12.421"
 *       }
 *     ]
 */

router.get('/', authenticate, function(req, res, next) {
  User.find().sort('id').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});

/**
 * @api {post} /users/signup Create a user
 * @apiName CreateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Registers a new user.
 *
 * @apiUse UserBodyReq
 * @apiUse UserBodyResp
 * @apiUse UserErrorVal
 *
 * @apiExample Example
 *     POST /users/signup HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "pseudo": "Test4",
 *       "password": "motdepasse"
 *     }
 *
 * @apiSuccessExample 201 Created
 *     HTTP/1.1 201 Created
 *     Content-Type: application/json
 *     Location: https://comem-webserv-2018-2019-c.herokuapp.com/
 *
 *     {
 *       "_id": "5bd9d5104036f23c64408196",
 *       "pseudo": "Test4",
 *       "password": "$2b$10$5z03Ps7wwSI7Eoq.Xd6Xku5g.9cPd0DFmfWCr0NfG2gfTBiyKPxmG",
 *       "creationAt": "2018-10-31 16:15:12.417"
 *       "modificationAt": "2018-10-31 16:15:12.421"
 *     }
 */

router.post('/', function(req, res, next) {
    
    /* Accéder aux paramètres dans le corps de la requète*/
    
    const temp = req.body  
    
    /* Gestion des erreurs */
    
    if(temp.pseudo == '' || !temp.password || temp.password.length < 4 ) {
        return res.status(422).send('Veuillez saisir toutes les données et correctement.');
    }
    
    
    /* Création d'un documents utilisateur */
    
    bcrypt.hash(temp.password, saltRounds, function (err, hash) {
    

        const user = new User({
            pseudo:temp.pseudo,
            photo:temp.photo,
            createdAt:new Date(),
            password:hash

        });

        /* Enregistrement du document utilisateurs dans la base de données. */


        user.save(function(err) {
            if(err) {
                console.error(err)
                res.status(500).send('Erreur lors de la création du nouvel utilisateur');
            }
            res.send(user);
        });
    });
});

/**
 * @api {patch} /users/_id Update a user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Updates user's data 
 *
 * @apiUse UserIdUrlPath
 * @apiUse UserBodyReq
 * @apiUse UserBodyResp
 * @apiUse UserErrorNotFound
 * @apiUse UserErrorVal
 *
 * @apiExample Example
 *     PATCH /users/1 HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "pseudo": "Test4"
 *     }
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     {
 *       "_id": "5bd9d5104036f23c64408196",
 *       "pseudo": "Test4",
 *       "password": "$2b$10$5z03Ps7wwSI7Eoq.Xd6Xku5g.9cPd0DFmfWCr0NfG2gfTBiyKPxmG",
 *       "creationAt": "2018-10-31 16:15:12.417"
 *       "modificationAt": "2018-10-31 16:15:12.421"
 *     }
 */

/* Mettre à jour l'utilisateur */

router.patch('/:id', authenticate, function(req, res, next) {
    
    console.log(req.params.id);
    
    User.find({_id: req.params.id}).exec(function(err, user) {
        if(err) {
            return console.error('Cet utilisateur n\'existe pas');
            res.status(422).send('ID incorrect');
        }
        
        if (req.currentUserId !== thing.user.toString()) {
            return res.status(403).send('Ce n\' est pas votre profil')
        }
        
        if(!req.body) {
            return res.status(422).send('Veuillez saisir les infos a modifier');
        } 
        
        user.modificationAt = new Date();
        
        // user.pseudo = req.body.pseudo ? req.body.pseudo : user.pseudo;
        
        if(req.body.pseudo) {
            user.pseudo = req.body.pseudo;
        }
        
        if(req.body.password) {
            user.password = req.body.password;
        }
        
        if(req.body.photo) {
            user.photo = req.photo;
        }
        
        
        console.log(user);
        
        updatedUser = new User(user);
        
        updatedUser.save(function(err, updatedUser) {
            if(err) {
                return console.error('Erreur lors de la mise a jour.')
            }
            
            res.send(updatedUser);
        })
    })
});

/**
 * @api {post} /users/signup Login a user
 * @apiName LoginUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Login a user.
 *
 * @apiUse UserBodyReq
 * @apiUse UserBodyResp
 * @apiUse UserErrorVal
 * @apiUse UserErrorLogin
 *
 * @apiExample Example
 *     POST /users/signup HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "pseudo": "Test4",
 *       "password": "motdepasse"
 *     }
 *
 * @apiSuccessExample 202 Accepted
 *     HTTP/1.1 202 Accepted
 *     Content-Type: application/json
 *     Location: https://comem-webserv-2018-2019-c.herokuapp.com/
 *
 *     {
 *       "_id": "5bd9d5104036f23c64408196",
 *       "pseudo": "Test4",
 *       "password": "$2b$10$5z03Ps7wwSI7Eoq.Xd6Xku5g.9cPd0DFmfWCr0NfG2gfTBiyKPxmG",
 *       "creationAt": "2018-10-31 16:15:12.417"
 *       "modificationAt": "2018-10-31 16:15:12.421"
 *     }
 */

    /*Login*/

router.post('/login', function(req, res, next) {
  
  User.findOne({ pseudo: req.body.pseudo }).exec(function(err, user) {
    if (err) { return next(err); }
    else if (!user) { return res.sendStatus(401); }
 
    bcrypt.compare(req.body.password, user.password, function(err, valid) {
      if (err) { return next(err); }
      else if (!valid) { return res.sendStatus(401); }
      
      const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
      const claims = { sub: user._id.toString(), exp: exp };
      jwt.sign(claims, secretKey, function(err, token) {
        if (err) { return next(err); }
        res.send({ token: token });
      });
    });
  })
});


/*Fonction authentique */

function authenticate(req, res, next) {
  
  const authorization = req.get('Authorization');
  if (!authorization) {
    return res.status(401).send('Authorization header is missing');
  }
  
  const match = authorization.match(/^Bearer (.+)$/);
  if (!match) {
    return res.status(401).send('Authorization header is not a bearer token');
  }
  
  const token = match[1];
  jwt.verify(token, secretKey, function(err, payload) {
    if (err) {
      return res.status(401).send('Your token is invalid or has expired');
    } else {
      req.currentUserId = payload.sub;
      next(); 
    }
  });
}

/**
 * @api {delete} /users/:_id Delete a user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Delete a user.
 *
 * @apiUse UserIdUrlPath
 * @apiUse UserErrorNotFound
 *
 * @apiExample Example
 *     DELETE /users/1 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 */

    /* Supprimer un utilisateur */

router.delete('/:id', findUserMiddleware, function (req, res, next) {

        User.findByIdAndRemove(req.user.id).exec(function (err, user) {
            if (err) {
                return next(err)
            }
            res.status(200).send({message: "L'utilisateur avec" + req.params.id + " à été supprimer avec succès"})
        })
    });

/**
 * @apiDefine UserIdUrlPath
 * @apiParam (URL path parameters) {Number} userid The unique identifier of the user
 */

/**
 * @apiDefine UserBodyReq
 * @apiParam (Body request) {String{/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}} pseudo The pseudo of the user 
 * @apiParam (Body request) {String} password The password of the user
 */

/**
 * @apiDefine UserBodyResp
 * @apiSuccess (Body response) {String} _id A unique identifier
 * @apiSuccess (Body response) {String} pseudo The pseudo of the user
 * @apiSuccess (Body response) {String} password The password of the user
 * @apiSuccess (Body response) {Date} createdAt The date at which the user was registered with default value Date.now
 * @apiSuccess (Body response) {Date} modificationAt The date at which the user was modified 
 */

/**
 * @apiDefine UserErrorNotFound
 *
 * @apiError {Object} 422/Unprocessable entity Datas are not correct
 * @apiError {Object} 403/Forbidden Datas are not find
 * @apiErrorExample {json} 422 Unprocessable entity
 *     HTTP/1.1 422 Unprocessable entity
 *     Content-Type: text/plain
 *
 * @apiErrorExample {json} 403 Forbidden Datas
 *     HTTP/1.1 403 Unprocessable entity
 *     Content-Type: text/plain
 */

/**
 * @apiDefine UserErrorVal
 *
 * @apiError (Error 4xx) {Object} 422/Unprocessable entity Datas are not correct
 * 
 *
 * @apiErrorExample {json} 422 Unprocessable entity
 *     HTTP/1.1 422 Unprocessable entity
 *     Content-Type: application/json
 *
 *     {
 *       "message": "Datas not correct"
 *     }
 *
 * 
 */

/**
 * @apiDefine UserErrorLogin
 *
 * @apiError {Object} 401/Unauthorized Pseudo or password is missing 
 *
 * @apiErrorExample {json} 401 Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     Content-Type: application/json
 *
 *     {
 *       "message": "Auth failed"
 *     }
 */


module.exports = router;

