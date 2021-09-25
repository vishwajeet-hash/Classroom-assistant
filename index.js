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
const port=8000;

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//app.use signifies a middleware
app.use(express.urlencoded());

//for accessing static files i.e css js html images fonts etc.
app.use(express.static('assets'));

app.get('/',function(req,res){
    return res.render('home');
});



app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('running');
})