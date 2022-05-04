const multer=require('multer');
const path=require('path');

 // let time=new Date().getTime();
 // console.log(time)
 //multer storage for media
 let storage=multer.diskStorage({
     destination:path.join(__dirname,'../../uploads/posts/'),
     filename:(req,file,cb)=>{
         cb(null,`${req.body.postedBy}${req.body.postedAt}.png`)
     }
 })
 
 //configuring uploads
 let upload=multer({
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
 });
 //exporting multer function
let uploadMedia=(req,res,next) => {
    upload.single('media')(req,res,(err)=>{
        console.log(req.file)
        // req.time=time;
        if(err){
            console.log(err)
            return res.json({
                status:500,
                success:false,
                message:err
            })
        }else{
            next();
        }
    })
}

module.exports.uploadMedia = uploadMedia

