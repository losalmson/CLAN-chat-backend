const {check, validationResult} = require("express-validator");
const {User} = require("../models");

const validateCreateUser = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username should contain an a you sir name!")
    .bail()
    .isLength({min: 3, max: 25})
    .withMessage("Username should be between 3 and 25 characters!")
    .bail()
    .isAlphanumeric()
    .withMessage("Username should contain only letters and numbers!")
    .bail(),
  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail()
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 0,
      minLowercase: 0,
    })
    .withMessage(
      "Minimum 8 characters required! One number and one symbol required!"
    ),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    const usernameInUse = await User.findOne({
      where: {username: req.body.username},
    });
    if (usernameInUse) {
      return res.status(409).json({message: "Username already in use!"});
    }
    next();
  },
];

const validateLoginUserAccount = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username should contain an a you sir name!"),
  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({errors: errors.array()});
    }
    next();
  },
];

module.exports = {
  validateCreateUser,
  validateLoginUserAccount,
};
