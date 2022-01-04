const SSLCommerzPayment = require('sslcommerz')
const express = require('express');
router = express.Router();

router.get('/ssl-request/:amount', async (req, res, next) => {
    const data = {
        total_amount: parseFloat(req.params.amount),
        currency: 'BDT',
        tran_id: 'REF123',
        success_url: `${process.env.ROOT1}/ssl-payment-success`,
        fail_url: `${process.env.ROOT1}/ssl-payment-failure`,
        cancel_url: `${process.env.ROOT1}/ssl-payment-cancel`,
        ipn_url: `${process.env.ROOT1}/ssl-payment-ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'cust@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };
    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD , false) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        if(data?.GatewayPageURL){
            return res.status(200).redirect(data?.GatewayPageURL);
        }
        else{
            return res.status(400).json({
                message: 'Ssl session was not successful'
            });
        }
        //process the response that got from sslcommerz 
        //https://developer.sslcommerz.com/doc/v4/#returned-parameters
    });

});


router.post('/ssl-payment-success', async (req, res, next) => {
    res.redirect(
        `http://localhost:3000/payment/${req.body.bank_tran_id}`
      );
    // return res.status(200).json({
    //     data: req.body.bank_tran_id
    // })
})


router.post('/ssl-payment-failure', async(req, res, next) => {
    res.redirect(
        `http://localhost:3000/payment/${'failed'}`
      );
    // return res.status(400).json({
    //     data: req.body
    // })
})

router.post('/ssl-payment-cancel', async(req, res, next) => {
    return res.status(200).json({
        data: req.body
    })
})

router.post('/ssl-payment-ipn', async(req, res, next) => {
    return res.status(200).json({
        data: req.body
    })
})

module.exports = router;