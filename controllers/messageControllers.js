const { User, Message } = require('../models');

const createMessage = async(req,res) =>{
    const {message, userId} = req.body;

    await Message.create({message,userId});
    res.status(200).send("");
}

const getMessages = async(req,res) =>{
    
    const messages = await Message.findAll()

    res.status(200).json(messages);
}

module.exports = { createMessage, getMessages }