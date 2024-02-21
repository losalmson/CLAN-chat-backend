const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const session = require("express-session");
const migrationHelper = require("./migrationhelper");
const userControllers = require("./controllers/userControllers.js");
const messageControllers = require("./controllers/messageControllers.js");


app.use(express.json());
app.use(cors({
    origin:"http://localhost:5500",
    credentials:true
}));

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

app.post("/api/createUser", userControllers.createUser);

app.post("/api/createMessage", messageControllers.createMessage);
app.post("/api/login", userControllers.loginUserAccount);   

app.listen(port, async () =>{
    await migrationHelper.migrate();
    console.log("Listening to port " + port);
});