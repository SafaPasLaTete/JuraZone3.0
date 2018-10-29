var express = require('express');
var router = express.Router();
const User = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().sort('id').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});

router.post('/', function(req, res, next) {
    
    /* Accéder aux paramêtres dans le corps de la requète*/
    
    const temp = req.body  
    
    /* Gestion des erreurs */
    
    if(temp.pseudo == '' || !temp.password || temp.password.length < 4 ) {
        return res.status(422).send('Veuillez saisir toutes les données.');
    }
    
    /* Création d'un documents utilisateur */
    
    const user = new User({
        pseudo:temp.pseudo,
        password:temp.password,
        photo:'',
        createdAt:new Date(),
    });
    
    /* Enregistrement du documents utilisateurs dans la base de données. */
    
    user.save(function(err) {
        if(err) {
            console.error(err)
            res.status(500).send('Erreur lors de la création du nouvel utilisateur');
        }
        res.send(user);
    });
});

router.patch('/:id', function(req, res, next) {
    
    console.log(req.params.id);
    
    User.find({_id: req.params.id}).exec(function(err, user) {
        if(err) {
            return console.error('Cet utilisateur n\'existe pas');
            res.status(422).send('ID incorrect');
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
    
    /*
    // Accéder aux paramêtres dans le corps de la requète
    
    const temp = req.body  
    
    // Gestion des erreurs
    
    if(temp.pseudo == '' || !temp.password || temp.password.length < 4 ) {
        return res.status(422).send('Veuillez saisir toutes les données.');
    }
    
    // Création d'un documents utilisateur
    
    const user = new User({
        pseudo:temp.pseudo,
        password:temp.password,
        photo:'',
        createdAt:new Date(),
    });
    
    // Enregistrement du documents utilisateurs dans la base de données.
    
    user.save(function(err) {
        if(err) {
            console.error(err)
            res.status(500).send('Erreur lors de la création du nouvel utilisateur');
        }
        res.send(user);
    });*/
});

module.exports = router;

