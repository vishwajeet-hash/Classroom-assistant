// const http=require('http');
// const port =8000;
// const fs=require('fs');

// function requestHandler(req,res){
//     res.writeHead(200,{'content-type': 'text/html'});
//     fs.readFile('index.html',function(err,data){
//         if(err){
//             console.log('error',err);
//             return res.end('error');
//         }
//         return res.end(data);
//     });
// };

// const server=http.createServer(requestHandler);

// server.listen(port,function(err){
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('server is up ',port);
// });

const express=require('express');
const path=require('path');
const cookieParser= require('cookie-parser');


const app=express();
const port=8000;
const db = require("./config/mongoose.js");
const User = require('./models/User.js');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongo');
// const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded({extended: true})); 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name: 'Classroom-assistant',
    // change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:"mongodb://localhost/[yourDbName]",
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());




app.use(cookieParser());
//for accessing static files i.e css js html images fonts etc.
app.use(express.static('assets'));

app.use('/', require('./routes/index'));



app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('running');
})
