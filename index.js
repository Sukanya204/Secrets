//The password is ILoveProgramming
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app=express();
const port=3000;
var userIsAuthorised=false;

const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

app.use(bodyParser.urlencoded({extended: true}));

function isCorrect(req, res, next)
{
    const password= req.body["password"];

    if(password==="ILoveProgramming")
    {
        userIsAuthorised=true;
    }
    next();
}

app.use(isCorrect);

app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/check', (req,res) =>{
    if(userIsAuthorised)
    {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else
    {
        //Alternatively res.redirect("/");
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () =>{
    console.log(`Go to http://localhost:${port}`);
});