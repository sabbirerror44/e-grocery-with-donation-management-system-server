//external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

//internal imports
const Organization = require("../../Models/Organization");

//add user validator
const addOrgValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),

  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number. Please use +88 !")
    .custom(async (value) => {
      try {
        const user = await Organization.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addOrgValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
   
   // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
    addOrgValidators,
    addOrgValidationHandler,
};