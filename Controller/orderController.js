const Order = require('../Models/Order');
const { stockChange } = require('../Controller/productController');

const addOrder = async(req, res)=>{
    try {
        const newOrder = new Order(req.body);
        newOrder.products.map(product=> {
          stockChange(product._id, product.quantity + product.donation)();
        });
        await newOrder.save();
        res.status(200).json({
          message: "Order was successfully completed!",
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
}

//get all Orders
async function getAllOrders(req, res, next) {
  try {

    let pastFivedDateTime = new Date();
    let todayDateTime = new Date();
    pastFivedDateTime.setDate(pastFivedDateTime.getDate() - 5);

    const result = await Order.find(
      {
        createdAt: {
            $gte: pastFivedDateTime,
            $lt: todayDateTime
        }
      }
    );

    if(result){
      res.status(200).json(result);
    }
    else{
      throw Error("Order does not exist");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function takeAllOrders(req, res, next) {
  try {

    const result = await Order.find({});

    if(result){
      res.status(200).json(result);
    }
    else{
      throw Error("Order does not exist");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

//get all Processing Orders
async function getPendingOrders(req, res, next) {
  try {
    const result = await Order.find({status: 'processing'});
    if(result){
      res.status(200).json({result});
    }
    else{
      throw Error("Order does not exist");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

//get all Processing Orders for specific user
async function getPendingOrdersHistory(req, res, next) {
  try {
    const orders = await Order.find({status: 'processing'});
    const results = orders.filter(order=> order.userInfo.mobileNo === req.params.mobile);
    if(results){
      res.status(200).json(results);
    }
    else{
      throw Error("Order does not exist");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}


//get all Delivered Orders
async function getDeliveredOrders(req, res, next) {
  try {
    const result = await Order.find({status: 'delivered'});
    res.status(200).json({result});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

//get all Processing Orders for specific user
async function getDeliveredOrdersHistory(req, res, next) {
  try {
    const orders = await Order.find({status: 'delivered'});
    const results = orders.filter(order=> order.userInfo.mobileNo === req.params.mobile);
    if(results){
      res.status(200).json(results);
    }
    else{
      throw Error("Order does not exist");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}


//Update Order Status

async function updateStatus(req, res) {
  try {
    const result = await Order.findByIdAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          status: "delivered"
        }
      },
      {
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      message: "Order delivered successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not deliver the Order!",
        },
      },
    });
  }

}

//Delete Order
async function DeleteOrder(req, res, next) {
  try {
    const order = await Order.findByIdAndDelete({
      _id: req.params.id,
    });

    res.status(200).json({
      message: "Order deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the Order!",
        },
      },
    });
  }
}




module.exports = {
    addOrder,
    getAllOrders,
    takeAllOrders,
    getPendingOrders,
    getPendingOrdersHistory,
    getDeliveredOrders,
    getDeliveredOrdersHistory,
    updateStatus,
    DeleteOrder,
}