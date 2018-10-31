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

router.get('/', authenticate, function(req, res, next) {
  User.find().sort('id').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});

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
    /*Login*/

router.post('/login', function(req, res, next) {
  // Find the user by name.
  User.findOne({ pseudo: req.body.pseudo }).exec(function(err, user) {
    if (err) { return next(err); }
    else if (!user) { return res.sendStatus(401); }
    // Validate the password.
    bcrypt.compare(req.body.password, user.password, function(err, valid) {
      if (err) { return next(err); }
      else if (!valid) { return res.sendStatus(401); }
      // Generate a valid JWT which expires in 7 days.
      const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
      const claims = { sub: user._id.toString(), exp: exp };
      jwt.sign(claims, secretKey, function(err, token) {
        if (err) { return next(err); }
        res.send({ token: token }); // Send the token to the client.
      });
    });
  })
});

/*Fonction authentique */

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



    /* Supprimer un utilisateur */

router.delete('/:id', findUserMiddleware, function (req, res, next) {

        User.findByIdAndRemove(req.user.id).exec(function (err, user) {
            if (err) {
                return next(err)
            }
            res.status(200).send({message: "L'utilisateur avec" + req.params.id + " à été supprimer avec succès"})
        })
    });


module.exports = router;

