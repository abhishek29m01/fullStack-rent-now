const epxress=require('express');
const PgCollection=require('../models/PgCollections');
const upload=require("../config/uploadImage");

const router=epxress.Router();

//Route to upload PG data with images
router.post("/addpg",upload.array("images",5),async(req,res)=>{
  try{
     const imagePaths=req.files.map(file=>file.path);
     const pgData=new PgCollection({...req.body,
        images:imagePaths,
     });

     const savedPgs=await pgData.save();
     res.status(201).json(savedPgs);

  }catch(error){

  }
})



module.exports=router;