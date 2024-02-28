const {check, validationResult} = require("express-validator");

const validateMessage = [
  check("message")
    .trim()
    .escape()
    .isLength({min: 1, max: 1000})
    .withMessage("Message too smol or large!")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No message ;_;"),
  check("userId")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("You gotta be somebody!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({errors: errors.array()});
    }
    next();
  },
];

module.exports = {validateMessage}