const categoryModel = require("../../models/categoryModel");
const subCategoryModel = require("../../models/subCategoryModel");
const subSubcategoryModel = require("../../models/subSubcategoryModel");


let subSubcategoryCreate = async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);
    console.log("📷 File Data:", req.file);

    let Insertobj = { ...req.body };

    // if image is uploaded
    if (req.file && req.file.filename) {
      Insertobj["subSubcategoryImage"] = req.file.filename;
    }
console.log(Insertobj)
    // Save to DB
    let subSubcategoryDoc = new subSubcategoryModel(Insertobj);
    let subSubcategoryRes = await subSubcategoryDoc.save();

    res.status(200).send({
      status: 1,
      msg: "Sub-subcategory created successfully",
      subSubcategoryRes,
    });
  } catch (err) {
    console.error("❌ Error creating sub-subcategory:", err);
    res.status(500).send({
      status: 0,
      msg: "Server error creating sub-subcategory",
      error: err.message,
    });
  }
};

let subSubcategoryView = async (req, res) => {
  let skip = 0;
  let limit = 5;

  if (req.query.limit) {
    limit = req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }

  let subSubcategoryData = await subSubcategoryModel
    .find()
    .populate("parentCategoryId", "categoryName ")
      .populate("subCategory", "subCategoryName" )
    .skip(skip)
    .limit(limit);

  let subSubcategoryDataLength = await subSubcategoryModel.find();

  let obj = {
    status: 1,
    msg: "subSubcategory view successfully",
    staticPath: process.env.SUBSUBCATEGORYIMAGEPATH,
    subSubcategoryData,
    length: subSubcategoryDataLength.length,
    totalPages: Math.ceil(subSubcategoryDataLength.length / limit),
  };
  res.send(obj);
};
let subSubcategoryEdit = async (req, res) => {
  let { id } = req.params;
  let subSubcategoryData = await subSubcategoryModel.findOne({ _id: id });
  let obj = {
    status: 1,
    msg: "subSubcategory Edit successfully",
    subSubcategoryData,
  };
  res.send(obj);
};

let subSubcategoryDelete = (req, res) => {
  let { id } = req.params;
  let obj;
  subSubcategoryModel
    .deleteOne({ _id: id })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "subSubcategory deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "subSubcategory delete failed",
        err,
      };
      res.send(obj);
    });
};

let subSubcategorymultyDelete = (req, res) => {
  let { ids } = req.body;
  let obj;
  subSubcategoryModel
    .deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "subSubcategory deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "subSubcategory delete failed",
        err,
      };
      res.send(obj);
    });
};

let statusUpdate = async (req, res) => {
  let { ids } = req.body;

  let updateRes = await subSubcategoryModel.updateMany({ _id: ids }, [
    {
      $set: {
        subSubcategoryStatus: {
          $not: "$subSubcategoryStatus",
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

let subSubcategoryUpdate = async (req, res) => {
  let obj;
  let { id } = req.params;

  try {
    let updateRes = await subSubcategoryModel.updateOne(
      { _id: id },
      { $set: req.body }
    );
    obj = {
      status: 1,
      msg: "subSubcategory updated successfully",
      updateRes,
    };
    res.send(obj);
  } catch (err) {
    obj = {
      status: 0,
      err,
    };
    res.send(obj);
  }
};
let parentCategory = async (req, res) => {
  let categoryData = await categoryModel
    .find({ categoryStatus: true })
    .select("categoryName");

  let obj = {
    status: 1,
    msg: "parentCategory fetched successfully",
    categoryData,
  };
  res.send(obj);
};



let subCategory= async (req,res)=>{
  let {parentId}= req.params;
  console.log(parentId);
  let subCategoryData =await subCategoryModel.find({subCategoryStatus:true,parentCategoryId:parentId}).select('subCategoryName');
  let obj={
    status:1,
    msg:"subCategory fetched successfully",
    subCategoryData
  };
  res.send(obj);
}

module.exports = {
  subSubcategoryCreate,
  subSubcategoryView,
  subSubcategoryEdit,
  subSubcategoryDelete,
  subSubcategorymultyDelete,
  statusUpdate,
  subSubcategoryUpdate,
  parentCategory,
  subCategory
};
