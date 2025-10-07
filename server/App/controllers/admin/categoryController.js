const categoryModel = require("../../models/categoryModel");

let categoryCreate = async (req, res) => {
console.log(req.body)

let Insertobj={...req.body}
if(req.file){
  if(req.file.filename){
    Insertobj['categoryImage']=req.file.filename
  }
 
   try {
    //insert data in database query type-1*
    let categorycollection = await categoryModel(Insertobj);
    let categoryRes = await categorycollection.save();

    //insert data in database query type-2****
    // let categorycollection =await categoryModel.insertOne(req.body);

    let obj = {
      status: 1,
      msg: "category created successfully",
      categoryRes,
    
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

let categoryView = async (req, res) => {
  let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }

  let categoryData = await categoryModel.find().skip(skip).limit(limit);

  let categoryDataLength = await categoryModel.find();

  let obj = {
    status: 1,
    msg: "category view successfully",
    staticPath:process.env.CATEGORYIMAGEPATH,
    categoryData,
    length: categoryDataLength.length,
    totalPages: Math.ceil(categoryDataLength.length / limit),
  };
  res.send(obj);
};
let categoryEdit = async (req, res) => {
  let { id } = req.params;
  let categoryData = await categoryModel.findOne({ _id: id });
  let obj = {
    status: 1,
    msg: "category Edit successfully",
    categoryData,
  };
  res.send(obj);
};

let categoryDelete = (req, res) => {
  let { id } = req.params;
  let obj;
  categoryModel
    .deleteOne({ _id: id })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "category deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "category delete failed",
        err,
      };
      res.send(obj);
    });
};

let categorymultyDelete = (req, res) => {
  let { ids } = req.body;
  let obj;
  categoryModel
    .deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "category deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "category delete failed",
        err,
      };
      res.send(obj);
    });
};

let statusUpdate = async (req, res) => {
  let { ids } = req.body;

  let updateRes = await categoryModel.updateMany({ _id: ids }, [
    {
      $set: {
        categoryStatus: {
          $not: "$categoryStatus",
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

let categoryUpdate = async (req, res) => {
  let obj;
  let { id } = req.params;

  try {
    let updateRes = await categoryModel.updateOne({ _id: id }, { $set: req.body });
    obj = {
      status: 1,
      msg: "category updated successfully",
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


module.exports={categoryCreate ,categoryView ,categoryEdit ,categoryDelete ,categorymultyDelete ,statusUpdate ,categoryUpdate}