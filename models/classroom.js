const mongoose= require('mongoose');

const classroomSchema =new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'

    // },
    section:{
        type:String
    },
    grade:{
        type:String
    },
    description:{
        type:String
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    students:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
]
},{ timestamps : true
});

const Classroom=mongoose.model('Classroom',classroomSchema);
module.exports = Classroom;