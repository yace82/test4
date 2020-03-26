const express = require("express");
const mysql =  require("mysql");
const app = express();
const settings = require("./settings.json");
const sqlConfig = settings.sqlConfig;

app.listen( 3000, () =>
{
    console.log("Serveur stated");
});

app.use(express.static("./public"));
app.use(express.urlencoded({extended:true}));

app.get('/api/user',(req,res)=>{
    const sqlConnection= mysql.createConnection(sqlConfig);
    sqlConnection.query("SELECT id, prenom, nom , email, birthdate FROM node_users WHERE id = 2 LIMIT 1",
     (error,result)=> {
        if(error){
            console.log("ERROR:",error.code);       
        }
        else{
            res.send(result[0]);
        }
        sqlConnection.end();
    });
});

app.route("/api/user/create")
    .get((req, res) => res.status(503).send({ status: "ERROR" }))
    .post((req, res) => {
        console.log(req.body);

        const sqlConnection = mysql.createConnection(sqlConfig);
    
        sqlConnection.query(
            "INSERT INTO node_users VALUES (NULL, ?, ?, ?, ?, ?)",
            [req.body.email, req.body.password, req.body.prenom, req.body.nom, req.body.birthday],
            (error, result) => {
                if (error) {
                    console.log("ERROR :", error.code);
                    res.status(503).send({ status: "ERROR" });
                } else {
                    console.log(result);
                    res.send({ status: "OK" });
                }
                sqlConnection.end();
            }
        );
    });

app.route("/api/user/delete")
    .get((req, res) => res.status (503).send({ status: "ERROR"}))
    .post((req, res) => {
        const sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.query(
            "DELETE FROM node_users WHERE id = ?",
            [ req.body.userId],
            (error, result) => {
                if (error) {
                    console.log("ERROR :", error.code);
                    res.status(503).send({ status: "ERROR"});
                } else {
                    console.log(result);
                    res.send({ status: "OK" });
                }
                sqlConnection.end();
            }
        );
    });