const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const session = require("express-session");
const migrationHelper = require("./migrationhelper");
require('dotenv').config();


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

app.post("/api/createUser", async (req, res) => {
    const { username, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        password: hashedPassword
    });

    res.status(204).send("");
})

app.post("/api/createMessage", async(req,res) =>{
    const {message, userId} = req.body;

    await Message.create({message,userId});
    res.status(204).send("");
});

app.listen(port, async () =>{
    await migrationHelper.migrate();
    console.log("Listening to port " + port);
});