const User = require('../models/User.js');
const Classroom = require('../models/classroom');

module.exports.checkAuth = function(req,res){
    
    //Todo later
}

module.exports.signIn = function(req,res){
    
    //To do later
}

module.exports.signUp = function(req, res){

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/home');
            })
        }
        else {
            console.log("Cannot sign in: user already present");
            res.redirect('back');
        }

    });
}
module.exports.usersHome = function(req,res){
    Classroom.find({}).populate('teacher').exec(function(err,classrooms){
        if (err){
            console.log("err");
            return;
        }
        if(classrooms){
            return res.render('profile',{
                classrooms:classrooms
            });
            }
    });
}

module.exports.createSession = function(req,res){
   return res.redirect('/users/home');
}

module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/home');
}