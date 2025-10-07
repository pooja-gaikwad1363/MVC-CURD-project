const materialModel = require("../../models/materialModel");



let materialCreate = async(req,res)=>{

   let obj;

  try {
  

    //insert data in database query type-2****
    let materialcollection =await materialModel.insertOne(req.body);

    obj = {
      status: 1,
      msg: "material created successfully",
      materialcollection,
    };
    res.send(obj);
  } catch (err) {
    obj = {
      status: 0,
      err,
    };
    res.send(obj);
  }
}


let statusUpdate = async(req ,res)=>{
  let {ids}=req.body

  let updateRes = await materialModel.updateMany({_id:ids},
    [
      {
        $set:{
            materialStatus:{
              $not: "$materialStatus"
            }
        }
      }
    ]
)
  let obj = {
        status: 1,
        msg: "status Updated",
       updateRes
      };
      res.send (obj);
}
let materialView =async(req,res)=>{

 let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }
  let materialData = await materialModel.find().skip(skip).limit(limit);
   let materialDataLength = await materialModel.find();
  let obj={
    status:1,
    msg:'material view successfully',
    materialData,
    length: materialDataLength.length,
    totalPages: Math.ceil(materialDataLength.length / limit),
  }
  res.send(obj);
}
let materialEdit = async (req, res) => {

  let {id}= req.params;
  let materialData = await materialModel.findOne({_id:id});
  let obj = {
    status: 1,
    msg: "material Edit successfully",
    materialData,
  };
  res.send(obj);
};

let materialDelete =async(req,res)=>{

  let {id}=req.params;
let obj;
  materialModel.deleteOne({ _id: id })
    .then((delRes) => {

      obj = {
        status: 1,
        msg: "Material deleted successfully",
        delRes
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "Material delete failed",
        err
      };
      res.send(obj);
  });
 
 
}
let materialmultyDelete =(req,res)=>{
  let {ids}=req.body
  let obj;
 materialModel.deleteMany({ _id: ids })
    .then((delRes) => {

      obj = {
        status: 1,
        msg: "Material deleted successfully",
        delRes
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "Material delete failed",
        err
      };
      res.send(obj);
  });
}

let materialUpdate = async(req,res)=>{
  let obj;
  let {id}=req.params;

  try{
    let updateRes =await materialModel.updateOne({_id:id},{$set:req.body});
    obj = {
      status: 1,
      msg: "Material updated successfully",
      updateRes
    };
    res.send(obj);
  } catch (err) {
    obj = {
      status: 0,
      err,
    };
    res.send(obj);
  }
}

module.exports = {
  materialCreate,
  materialView,
  materialDelete,
  materialUpdate,
  materialmultyDelete,
  materialEdit,
  statusUpdate
}

