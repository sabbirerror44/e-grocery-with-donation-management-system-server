const express = require('express');
const router = express.Router();
const { signup, login, getAllOrg, updateToAccept, getAllPendingOrg, deleteOrg } = require('../Controller/organizationController');
const { addOrgValidators, addOrgValidationHandler } = require('../Middlewares/organization/organizationValidator');

router.post("/", addOrgValidators, addOrgValidationHandler, signup);

router.get("/", getAllOrg);

router.get("/pending", getAllPendingOrg);

router.post("/login", login);

router.put('/:id', updateToAccept);

router.delete('/:id', deleteOrg);

module.exports = router;