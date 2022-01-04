const Donation = require("../Models/Donation");

const addDonation = async (req, res) => {
    try {
        const newDonation = new Donation(req.body);
        await newDonation.save();
        res.status(200).json({
            message: "Donation was successfully recieved!",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}


//get all Pending Donations
async function getPendingDonations(req, res, next) {
    try {
      const result = await Donation.find({status: 'pending'});
      res.status(200).json({result});
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

//get all Delivered Donations
async function getDeliveredDonations(req, res, next) {
    try {
      const result = await Donation.find({status: 'delivered'});
      res.status(200).json({result});
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  //Update donation Status 

async function updateDonationStatus(req, res) {
    try {
      const result = await Donation.findByIdAndUpdate(
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
        message: "Donations delivered successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Could not deliver the Donation!",
          },
        },
      });
    }
  
  }

  //get all Orders
async function getAllDonations(req, res, next) {
  try {
    const result = await Donation.find({});

    if(result){
      res.status(200).json(result);
    }
    else{
      throw Error("Donation does not exist");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

  //Delete Order
async function DeleteDonation(req, res, next) {
  try {
    const order = await Donation.findByIdAndDelete({
      _id: req.params.id,
    });

    res.status(200).json({
      message: "Donation deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the Donation!",
        },
      },
    });
  }
}

//get all Donations of specific user MobileNo
async function getDonationsByMobile(req, res, next) {
  try {
    const result = await Donation.find({ 'donerInfo.mobileNo': req.params.mobile});
    res.status(200).json({result});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

//get all Delivered Donations for specific organization
async function getDeliveredDonationsOfSpecificfOrg(req, res, next) {
  try {
    const result = await Donation.find(
      { $and: [
        { organizationName: req.params.name }, { status: 'delivered' }
      ]
      }
     )
    res.status(200).json({result});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

//update donation status delivered to received
    async function updateDeliverdToReceived(req, res) {
      try {
        const result = await Donation.findByIdAndUpdate(
          {_id: req.params.id},
          {
            $set: {
              status: "received"
            }
          },
          {
            useFindAndModify: false,
          }
        );
    
        res.status(200).json({
          message: "Donations received successfully!",
        });
      } catch (err) {
        res.status(500).json({
          errors: {
            common: {
              msg: "Could not receive the Donation!",
            },
          },
        });
      }    
    }

module.exports = {
    addDonation,
    getAllDonations,
    getPendingDonations,
    getDeliveredDonations,
    updateDonationStatus,
    DeleteDonation,
    getDonationsByMobile,
    getDeliveredDonationsOfSpecificfOrg,
    updateDeliverdToReceived
}