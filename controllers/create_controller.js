const Classroom = require('../models/classroom');
const User = require('../models/User');
const { post } = require('../routes');
// const { rawListeners } = require('../models/User')
module.exports.newclassroom = function(req, res){

    // if (req.isAuthenticated()){
    //     return res.redirect('/classrooms/new');
    // }
    // Classroom.find({},function(err,classrooms){
    //     if (req.isAuthenticated()){
    //         return res.render('create',{
    //             classrooms:classrooms
    //         });
    //         }
    //         else{
    //             return res.redirect('/home');
    //         }

    // })
    if (req.isAuthenticated()){
    return res.render('create');
    }
    else{
        return res.redirect('/home');
    }

    //populate the creator of each classroom
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

module.exports.create = function(req, res){
    Classroom.create({
        name: req.body.name,
        section:req.body.section,
        teacher: req.user._id,
        grade:req.body.grade,
        about:req.body.about,
        subject:req.body.about  
    },function(err, post){
        if(err){
            console.log('error in creating a post'); return;
        }
        console.log(req.body);
        return res.redirect('/users/home');
    });
}