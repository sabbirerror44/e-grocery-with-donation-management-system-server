const express = require('express');
const { addProduct, categoryProduct, singleProduct, UpdateProduct, deleteProduct, searchProduct } = require('../Controller/productController');
const multerHandler = require('../Middlewares/multerHandler');
const router = express.Router();


// post a product
router.post('/', multerHandler.upload.single('avatar'), addProduct);
// get all products 
// router.get('/products', getAllProducts);
router.post('/search', searchProduct);
//get category wise products
router.get('/:category', categoryProduct);

// get single product by id
router.get('/single/:id', singleProduct);
router.put('/update/:id', UpdateProduct);

router.delete('/delete/:id', deleteProduct);

module.exports = router;