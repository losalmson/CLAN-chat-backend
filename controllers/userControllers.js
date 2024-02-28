const bcrypt = require("bcrypt");
const {User, Message} = require("../models");

const createUser = async (req, res) => {
  const {username, password} = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword,
  });

  res.status(201).send("");
};

const loginUserAccount = async (req, res) => {
  const {username, password} = req.body;

  const user = await User.findOne({
    where: {username},
  });
  if (!user) {
    return res.status(401).json("Could not login");
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json("Could not login");
  }
  req.session.userId = user.id;
  res.json({status: "Successful login"});
};

const requireAuth = (req, res, next) => {
  console.log("inne i requireAuth");
    if (req.session.userId) {
      console.log("finns");
        next();
    } else {
      console.log("finns inte");
        res.status(401).send('login');
    }
}

const clanUser = async (req, res) => {  
  console.log("Inne i clanUser");
  const user = await User.findOne({
    where: {id: req.session.userId},
  });
  res.json(user)
  }

module.exports = {createUser, loginUserAccount, requireAuth, clanUser};
