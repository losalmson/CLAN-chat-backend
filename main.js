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
app.get("/api/messages", (req, res) => {
    res.send(messages);
});

app.listen(port, () =>{
    console.log("Listening to port " + port);
});
