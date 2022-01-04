const Organization = require('../Models/Organization');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signup = async(req, res)=> {
    let newOrganization;
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    newOrganization = new Organization({
        ...req.body,
        password: hashedPassword,
    });

    try {
        await newOrganization.save();
        res.status(200).json({
            message: "Thanks for Signing up. After checking authenticity we will send you a confirmation message into your mobile No",
          });
        } catch (err) {
          res.status(500).json({
            errors: {
              common: {
                msg: "Unknown error occurred ! ",
              },
            },
          });
        }
        
    }

const login =  async (req, res) => {
  try {
    const org = await Organization.find({ $and: [
      { mobile: req.body.mobile }, { account: 'accept' }
    ]
  });
    if (org.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        org[0].password
      );
    
      if (isValidPassword) {

        const orgObject = {
          name: org[0].name,
        };
        // generate token
        const token = jwt.sign(
          {
            email: org[0].email,
            name: org[0].name,
            mobile: org[0].mobile,
            userId: org[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2 days",
          }
        );
        res.status(200).json({
          access_token: token,
          user: orgObject,
          message: "Login successful",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed!. Please try again",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed!. Please try again",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Authentication failed!. Please try again",
    });
  }
}

//get all active organizations
const getAllOrg =  async (req, res) => {
  try {
    const org = await Organization.find({ account: 'accept' });
        res.status(200).json({
          org
        });
  } catch (err) {
    res.status(401).json({
      error: "Something went wrong!. Please try again",
    });
  }
}

//get all pending organizations
const getAllPendingOrg =  async (req, res) => {
  try {
    const org = await Organization.find({ account: 'pending' });
        res.status(200).json({
          org
        });
  } catch (err) {
    res.status(401).json({
      error: "Something went wrong!. Please try again",
    });
  }
}


async function updateToAccept(req, res) {
  try {
    const result = await Organization.findByIdAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          account: "accept"
        }
      },
      {
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      message: "Status updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Error!",
        },
      },
    });
  }

}

// reject specific organization
  async function deleteOrg(req, res, next) {
    try {
      const order = await Organization.findByIdAndDelete({
        _id: req.params.id,
      });
  
      res.status(200).json({
        message: "Organization rejected successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Could not reject!",
          },
        },
      });
    }
  }

module.exports = {
    signup,
    login,
    getAllOrg,
    updateToAccept,
    getAllPendingOrg,
    deleteOrg
}