const express = require('express');
const { addJob, getAllJob, getSingleJob, deleteJob } = require('../Controller/jobController');
const router = express.Router();


router.post('/add', addJob)

router.get('/', getAllJob)

router.get('/:id', getSingleJob)

router.delete("/delete/:id", deleteJob);

module.exports = router;