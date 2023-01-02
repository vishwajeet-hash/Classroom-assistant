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
    User.findById(req.user._id,function(err,user){
        if(user){
    Classroom.create({
        name: req.body.name,
        section:req.body.section,
        teacher: req.user._id,
        grade:req.body.grade,
        description:req.body.description  
    },function(err, classroom){
        if(err){
            console.log('error in creating a post'); return;
        }
        console.log(req.body);
        user.classrooms.push(classroom);
        user.save();
        return res.redirect('/users/home');
    });
}
    })
}

module.exports.joinClassroom = function(req,res){
    Classroom.findById(req.body.classroom_id, function(err,classroom){
        if(err){console.log("Error in finding classroom from the form");}
        if(classroom){  
            classroom.students.push(req.user._id);
            User.findById(req.user._id,function(err,user){
                if(err){ console.log("Error in finding user while joining classroom");}
                if(user){
                    user.classrooms.push(req.body.classroom_id);
                    user.save();
                }
            });
            classroom.save();
            res.redirect('/users/home');
        }
    });
}