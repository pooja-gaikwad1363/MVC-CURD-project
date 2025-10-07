const mongoose = require("mongoose");
const categoryModel = require("../../models/categoryModel");
const subCategoryModel = require("../../models/subCategoryModel");

let subCategoryCreate = async (req, res) => {
console.log(req.body)

let Insertobj={...req.body}
if(req.file){
  if(req.file.filename){
    Insertobj['subCategoryImage']=req.file.filename
  }
 
   try {
    //insert data in database query type-1*
    let subCategorycollection = await subCategoryModel(Insertobj);
    let subCategoryRes = await subCategorycollection.save();

    //insert data in database query type-2****
    // let subCategorycollection =await subCategoryModel.insertOne(req.body);

    let obj = {
      status: 1,
      msg: "subCategory created successfully",
      subCategoryRes,
    
    };
    res.send(obj);
  } catch (err) {
   let obj = {
      status: 0,
      err,
    };
    res.send(obj);
  }
}


};

let subCategoryView = async (req, res) => {
  let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }

  let subCategoryData = await subCategoryModel.find().populate('parentCategoryId','categoryName ').skip(skip).limit(limit);

  let subCategoryDataLength = await subCategoryModel.find();

  let obj = {
    status: 1,
    msg: "subCategory view successfully",
    staticPath:process.env.SUBCATEGORYIMAGEPATH,
    subCategoryData,
    length: subCategoryDataLength.length,
    totalPages: Math.ceil(subCategoryDataLength.length / limit),
  };
  res.send(obj);
};


let subCategoryEdit = async (req, res) => {
  let { id } = req.params;
  
  let subCategoryData = await subCategoryModel.findOne({ _id: id });
  let obj = {
    status: 1,
    msg: "subCategory Edit successfully",
    subCategoryData,
    staticPath:process.env.SUBCATEGORYIMAGEPATH,
  };
  res.send(obj);
};

let subCategoryDelete = (req, res) => {
  let { id } = req.params;
  let obj;
  subCategoryModel
    .deleteOne({ _id: id })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "subCategory deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "subCategory delete failed",
        err,
      };
      res.send(obj);
    });
};

let subCategorymultyDelete = (req, res) => {
  let { ids } = req.body;
  let obj;
  subCategoryModel
    .deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "subCategory deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "subCategory delete failed",
        err,
      };
      res.send(obj);
    });
};

let statusUpdate = async (req, res) => {
  let { ids } = req.body;

  let updateRes = await subCategoryModel.updateMany({ _id: ids }, [
    {
      $set: {
        subCategoryStatus: {
          $not: "$subCategoryStatus",
        },
      
      },
    },
  ]);
  let obj = {
    status: 1,
    msg: "status Updated",
    updateRes,
  };
  res.send(obj);
};
let subCategoryUpdate = async (req, res) => {
  let { id } = req.params;
  let updateobj = { ...req.body };

  console.log("=== UPDATE DEBUG LOGS ===");
  console.log("ID:", id);
  console.log("Valid ID?", mongoose.Types.ObjectId.isValid(id));
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  if (req.file?.filename) {
    updateobj["subCategoryImage"] = req.file.filename;
  }

  try {
    let updateRes = await subCategoryModel.updateOne({ _id: id }, { $set: updateobj });
    console.log("Update Result:", updateRes);

    res.send({
      status: 1,
      msg: "subCategory updated successfully",
      updateRes,
    });
  } catch (err) {
    console.error("ERROR in update:", err);
    res.status(500).send({
      status: 0,
      msg: "Error updating subCategory",
      err: err.message,
    });
  }
};


// let subCategoryUpdate = async (req, res) => {
//     console.log("Updating ID:", id, "isValid?", mongoose.Types.ObjectId.isValid(id));

//   let { id } = req.params;
// let updateobj={...req.body}
// if(req.file){
//   if(req.file.filename){
//     updateobj['subCategoryImage']=req.file.filename
//   }
// }
// let obj;
//   try {
//     let updateRes = await subCategoryModel.updateOne({ _id: id }, { $set:updateobj});
//     obj = {
//       status: 1,
//       msg: "subCategory updated successfully",
//       updateRes,
//     };
//     res.send(obj);
//   } catch (err) {
//     obj = {
//       status: 0,
//       err,
//     };
//     res.send(obj);
//   }
// };
let parentCategory= async(req,res)=>{
  let categoryData= await categoryModel.find({categoryStatus:true}).select('categoryName');
  
  let obj={
    status: 1,
    msg: "parentCategory fetched successfully",
    categoryData
  };
  res.send(obj);
};

module.exports={subCategoryCreate ,subCategoryView ,subCategoryEdit ,subCategoryDelete ,subCategorymultyDelete ,statusUpdate ,subCategoryUpdate,parentCategory}