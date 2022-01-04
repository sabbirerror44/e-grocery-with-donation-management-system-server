const multer  = require('multer');
const path = require('path');

const multerHandler = {};

const storage = multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null,'uploads/');
    },
    filename: (req, file, cb)=>{
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").toLocaleLowerCase().split(' ').join('-')+'-'+ Date.now();
        cb(null, fileName + fileExt);
    }
})
multerHandler.upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10000000,
    }
    // },
    // fileFilter (req, file, cb) {
    //     if(file.mimetype === 'image/jpeg'||file.mimetype === 'image/jpg'){
    //         cb(null,true)
    //     }
    //     else{
    //         cb(new Error('Please select jpg or jpeg format'))
    //     }
    // }
})

module.exports = multerHandler;