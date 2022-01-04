const Product = require('../Models/Product');
const fs = require('fs');

const addProduct = (req, res) => {
    req.body.image = req.file.filename;
    const addProduct = new Product(req.body);
    addProduct.save((err) => {
        if (err) {
          const path = __dirname + `/../uploads/${req.file.filename}`;
          fs.unlink(path, (err) => {
          if (err) {
          console.error(err)
          }
         })
          res.status(500).json({
            error: "There was a server side error!"
          });
        } else {
          res.status(200).json({
            message: "Product was inserted successfully!",
          });
        }
      });
}

const UpdateProduct = async (req, res, next) => {

  try {
    const product = await Product.findByIdAndUpdate(
      {_id: req.params.id},
      {
        $set: req.body
      },
      {
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      message: "Product updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
        message: "Could not update the specific product!",  
    });
  }

}



const categoryProduct = async (req, res) => {
    try {
      if (req.params.category == "undefined") {
          const products = await Product.find();
          if(products){
            res.status(200).json(products);
          }
          else{
            throw Error("No products exist");
          }
      }
      else{
        const products = await Product.find({category: req.params.category});
        if(products){
          res.status(200).json(products);
        }
        else{
          throw Error("No products exist");
        }
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

const singleProduct = async(req, res)=>{
    try{
      const product = await Product.find({_id: req.params.id})
      if(product){
        res.status(200).json(product);
      }
      else{
        throw Error("No products exist");
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
const stockChange = (id, quantity) => {
  return async function(req, res) {
    try{
      const product = await Product.find({_id: id});
      const newQuantity = product[0].stock - quantity;
      await Product.findByIdAndUpdate(
        {
          _id: id
        },
        { 
          $set: 
          { stock: newQuantity }
        },
        {
          useFindAndModify: false
        }
        );
    }
    catch(e){
      res.status(400).json({ error: e.message });
    }
  }
  }

  const deleteProduct = async (req, res) => {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: "Product was successfully deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  const searchProduct = async(req, res, next)=> {
    const product = req.body.productName;
  
    const title_search_regex = new RegExp(escape(product), "i");
  
    try {
      if ( title_search_regex !== "") {
        const resutls = await Product.find(
          {
                title: title_search_regex
            
          }
        );
  
        res.json(resutls);
      } 
      else {
        throw createError("You must provide some text to search!");
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
  

  module.exports = {
      addProduct,
      categoryProduct,
      singleProduct,
      stockChange,
      UpdateProduct,
      deleteProduct,
      searchProduct
  }