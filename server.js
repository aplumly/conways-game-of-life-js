const express = require('express');
var https = require('https');
const bodyParser = require('body-parser');
const fs= require('fs');


let PORT = 80;
let hits = 0;
let app = express();
app.use(bodyParser.json());
app.use("/public", express.static(__dirname+"/public"));
app.get('/',function(req,res){
    //console.log(++hits);
    return res.sendFile(__dirname+"/index.html");
    
})
// app.get('/audio/320',(req,res)=>{
//     res.sendFile(__dirname+"/public/alejo.mp3")
// })

app.listen(PORT,function(){
    console.log("App listening on PORT "+ PORT);
})