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
],
    announcements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'announcement'
        }
    ]

},{ timestamps : true
});

const Classroom=mongoose.model('Classroom',classroomSchema);
module.exports = Classroom;