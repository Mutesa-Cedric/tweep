const multer=require('multer');
const path=require('path');
const {login} = require("../authControllers/Login.controller");
const storage=multer.diskStorage({
    destination:path.join(__dirname,'../../uploads/covers/'),
     filename:(req,file,cb)=>{
         cb(null,req.params.userName+'Cover'+'.png')
     }
})


const upload=multer({
    storage:storage,
    limits:{
        fileSize:8000000
    },
    fileFilter:(req,file,cb)=>{
        let fileTypes=/jpg|jpeg|png|gif/;
        let extName=fileTypes.test(path.extname(file.originalname).toLowerCase());
        let mimeType=fileTypes.test(file.mimetype);
        if(fileTypes && mimeType){
            cb(null,true)
        }else{
            cb('error:images only are allowed')
        }
    }
})

let uploadCover=(req,res,next)=>{
    try {
        upload.single("coverImg")(req,res,(err)=>{
            if(err){
                return res.json({
                    status:500,
                    success:false,
                    message:err
                })
            }else{
                next()
            }
        })
    }catch (e) {
        return console.log(e)
    }

}

module.exports.uploadCover=uploadCover;