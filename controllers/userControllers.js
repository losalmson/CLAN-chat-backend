const bcrypt = require('bcrypt');
const { User, Message } = require('../models');

const createUser = async(req,res) => {
    const { username, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        password: hashedPassword
    });

    res.status(204).send("");
}

module.exports = {createUser}