const {User, Message} = require("../models");

const createMessage = async (req, res) => {
  const {message, userId} = req.body;

  await Message.create({message, userId});
  res.status(200).send("");
};

const getMessages = async (req, res) => {
  let messages = await Message.findAll();

  for (const message of messages) {
    const user = await User.findOne({
      where: {id: message.userId},
    });
    message.dataValues.username = user.dataValues.username;
  }

  const messagesOutput = messages.map((message) => ({
    id: message.dataValues.id,
    message: message.dataValues.message,
    username: message.dataValues.username,
    createdAt: message.dataValues.createdAt,
    updatedAt: message.dataValues.updatedAt,
  }));

  console.log(messagesOutput);
  res.status(200).json(messagesOutput);
};

module.exports = {createMessage, getMessages};
