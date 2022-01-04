const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controller/userController');
const { addUserValidators, addUserValidationHandler } = require('../Middlewares/user/userValidator');

router.post("/", addUserValidators, addUserValidationHandler, signup);

router.post("/login", login);

module.exports = router;