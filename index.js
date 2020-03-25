const express = require("express");
const app = express();
const app.listen(3000, ()=>
{
    console.log("Serveur stated");
});
app.get('/',(req,res)=>{
    res.send({
        id:1,
        email:"yacineabd@outlook.fr",
        prenom:"yacine",
        nom:"abd",
        birthdate: new Date(1995,9,22)
    });
});