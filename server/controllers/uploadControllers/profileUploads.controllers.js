const multer=require('multer');
const path=require('path'); 
const storage=multer.diskStorage({
    destination:path.join(__dirname,'../../uploads/profiles/'),
     filename:(req,file,cb)=>{
         cb(null,req.params.userName+'Profile'+'.png')
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

let uploadProfile=(req,res,next)=>{
    upload.single("profileImg")(req,res,(err)=>{
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
}

module.exports.uploadProfile=uploadProfile;