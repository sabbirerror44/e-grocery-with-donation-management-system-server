const express = require('express');
const { addDonation, getPendingDonations, getAllDonations, getDeliveredDonations, updateDonationStatus, DeleteDonation, getDonationsByMobile, getDeliveredDonationsOfSpecificfOrg, updateDeliverdToReceived } = require('../Controller/donationController');
router = express.Router();

router.get('/all', getAllDonations);

router.get('/pending', getPendingDonations);

router.get('/delivered', getDeliveredDonations);

router.delete('/:id', DeleteDonation);

router.put('/pending/:id', updateDonationStatus);

router.post('/', addDonation);

router.get('/:mobile', getDonationsByMobile);

router.get('/delivered/:name', getDeliveredDonationsOfSpecificfOrg);

router.put('/delivered/:id', updateDeliverdToReceived);

module.exports = router;