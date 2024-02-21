const { User, Message } = require('../models');

const createMessage = async(req,res) =>{
    const {message, userId} = req.body;

    await Message.create({message,userId});
    res.status(200).send("");
}

module.exports = { createMessage }