const bcrypt = require('bcrypt');
const { User, Message } = require('../models');

const createUser = async(req,res) => {
    const { username, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        password: hashedPassword
    });

    res.status(201).send("");
}

const createMessage = async(req,res) =>{
    const {message, userId} = req.body;

    await Message.create({message,userId});
    res.status(200).send("");
}

const loginUserAccount = async (req,res) => {

    const {username,password} = req.body;

    const user = await User.findOne({
        where: {username}
    });
    if (!user) {
        return res.status(401).json('Could not login');
    };

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json('Could not login');
    };
    req.session.userId = user.id;
    res.json({status:"Successful login"});
}

module.exports = {createUser, createMessage, loginUserAccount}