const Job = require('../Models/Job');

const addJob = async(req, res)=>{
    try {
        const newPost = new Job(req.body);
        await newPost.save();
        res.status(200).json({
          message: "Job post was successfully posted!",
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
}

const getAllJob = async(req, res)=>{
    try {
        const post = await Job.find({});
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
}

const getSingleJob = async (req, res)=>{
    try {
        const post = await Job.find({_id: req.params.id});
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
}

const deleteJob = async (req, res) => {
  try {
    await Job.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Job post was successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports ={
    addJob,
    getAllJob,
    getSingleJob,
    deleteJob
}