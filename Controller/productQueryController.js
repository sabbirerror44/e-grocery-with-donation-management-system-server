const Query = require('../Models/Query');

const addQuery = async(req, res)=>{
    try {
        const newQuery = new Query(req.body);
        await newQuery.save();
        res.status(200).json({
          message: "Query was successfully posted!",
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
}

const getQueryByProductId = async (req, res)=>{
    try {
        const query = await Query.find({ productId: req.params.id});
        res.status(200).json(query);
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
}

const getQueryByProductAdmin = async (req, res)=>{
  try {
      const query = await Query.find({ answer: null});
      res.status(200).json(query);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
}

const updateQueryByQueryId = async (req, res)=>{
    try {
        const query = await Query.findByIdAndUpdate(
          {_id: req.params.id},
          {
            $set: {
              answer: req.body.answer
            }
          },
          {
            useFindAndModify: false,
          }
        );
    
        res.status(200).json({
          message: "Query answered successfully!",
        });
      } catch (err) {
        res.status(500).json({
            message: "Could not answered the specified query!",  
        });
      }
}

module.exports = {
    addQuery,
    getQueryByProductId,
    updateQueryByQueryId,
    getQueryByProductAdmin
}