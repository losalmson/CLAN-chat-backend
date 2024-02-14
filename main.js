const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const messages = [
    {
        user: "Nalle Puh",
        message: "Ge mig honung bitch",
        messageId: 1
    },
    {
        user: "Tiger",
        message: "Känner mig fett studsig idag",
        messageId: 2
    },
    {
        user: "Ior",
        message: "Jag hatar mitt liv",
        messageId: 3
    },
    {
        user: "Batman",
        message: "I'm batman",
        messageId: 4
    },
    {
        user: "Nasse",
        message: "Hej hej",
        messageId: 5
    },
    {
        user: "Christoffer Robin",
        message: "Har någon sett min ballong?",
        messageId: 6
    },
];

app.get("/api/messages/:id", (req, res) => {
    let msgID = messages.find(messageId => messageId.messageId == req.params.id);

    if(msgID === undefined){
        res.status(404).send("Error: 404 not found.");
    }
    res.json(msgID);
});



function getNextId() {
    let m = Math.max(...messages.map(message => message.messageId));
    return m + 1;
  };
  
app.post('/api/messages',(req,res)=>{
    const msg = {
        user: req.body.user,
        message: req.body.message,
        messageId:getNextId()
    }
    messages.push(msg);
    res.status(201).send('Created');
});

app.delete('/api/messages/:id', (req, res) => {
    let msgID = messages.find(messageId => messageId.messageId == req.params.id);
    if(msgID == undefined){
        res.status(404).send('HA HA Finns inte');
    }
    messages.splice(messages.indexOf(msgID),1);
    res.status(204).send('Removed message');   
}); 

app.get("/api/messages", (req, res) => {
    res.send(messages);
});

app.listen(port, () =>{
    console.log("Listening to port " + port);
});
