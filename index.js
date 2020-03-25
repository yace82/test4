const express = require("express");
const mysql =  require("mysql");
const app = express();
const settings = require("./settings.json");
const sqlConfig = settings.sqlConfig;

app.listen( 3000, () =>
{
    console.log("Serveur stated");
});
app.get('/',(req,res)=>{
    const sqlConnection= mysql.createConnection(sqlConfig);
    sqlConnection.query("SELECT id, prenom, nom , email, birthdate FROM node_users", (error,result)=> {
        if(error){
            console.log("ERROR:",error.code);       
        }
        else{
            console.log(" RESULT:",result);
        }sqlConnection.end();
    });

    res.send({
        id:1,
        email:"yacineabd@outlook.fr",
        prenom:"yacine",
        nom:"abd",
        birthdate: new Date(1995,7,22)
    });
});
