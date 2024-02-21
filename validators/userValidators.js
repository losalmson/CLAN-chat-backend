const {check, validationResult} = require("express-validator");

const validateCreateUser = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username should contain an username!")
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

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

module.exports = {
  validateCreateUser,
};
