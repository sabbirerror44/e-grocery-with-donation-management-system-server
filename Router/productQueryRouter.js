const express = require('express');
const { addQuery, getQueryByProductId, getQueryByProductAdmin, updateQueryByQueryId } = require('../Controller/productQueryController')
router = express.Router();

router.post('/', addQuery);
router.get('/:id', getQueryByProductId);
router.get('/', getQueryByProductAdmin);
router.put('/:id', updateQueryByQueryId);


module.exports = router;