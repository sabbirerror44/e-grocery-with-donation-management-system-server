const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const productsRouter = require('./Router/productsRouter');
const adminRouter = require('./Router/adminRouter');
const usersRouter = require('./Router/usersRouter');
const orgRouter = require('./Router/organizationRouter');
const ordersRouter = require('./Router/ordersRouter');
const donationRouter = require('./Router/donationRouter');
const jobsRouter = require('./Router/jobsRouter');
const applyRouter = require("./Router/candidateRouter");
const sslcommerzRouter = require('./Router/sslcommerzRouter');
const productQueryRouter = require('./Router/productQueryRouter');

require('dotenv').config()
app.use(cors());
app.use(bodyParser.urlencoded({ 
    extended: true
}))
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/uploads/`));
app.use(express.json());

// database connection with mongoose
mongoose
  .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use('/product', productsRouter);
app.use('/admin', adminRouter);
app.use('/user', usersRouter);
app.use('/organization', orgRouter);
app.use('/order', ordersRouter);
app.use('/donation', donationRouter);
app.use('/query', productQueryRouter);
app.use('/job', jobsRouter);
app.use('/apply', applyRouter);
app.use('/payment', sslcommerzRouter);
app.get('/', (req, res)=>{
    res.send("This is server side");
})

// default error handler
const errorHandler = (err,req, res, next)=> {
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send('There was an upload error');
        }
        else{
            res.status(500).send(err.message);
        }
    }
    else{
        res.send('Successful');
    }
}

app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`listening to port ${process.env.PORT}`)
})