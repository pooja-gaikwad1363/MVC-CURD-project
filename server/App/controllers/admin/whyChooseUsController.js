const whyChooseUsModel = require("../../models/whyChooseUsModel");

// let whyChooseUsCreate = async (req, res) => {
// console.log(req.body)

// let Insertobj={...req.body}
// if(req.file){
//   if(req.file.filename){
//     Insertobj['Image']=req.file.filename
//   }
 
//    try {
//     //insert data in database query type-1*
//     let whyChooseUscollection = await whyChooseUsModel(Insertobj);
//     let whyChooseUsRes = await whyChooseUscollection.save();

//     //insert data in database query type-2****
//     // let whyChooseUscollection =await whyChooseUsModel.insertOne(req.body);

//     let obj = {
//       status: 1,
//       msg: "whyChooseUs created successfully",
//       whyChooseUsRes,
    
//     };
//     res.send(obj);
//   } catch (err) {
//    let obj = {
//       status: 0,
//       err,
//     };
//     res.send(obj);
//   }
// }


// };
let whyChooseUsCreate = async (req, res) => {
  try {
    let Insertobj = { ...req.body };
    if (req.file?.filename) {
      Insertobj.Image = req.file.filename;
    }

    let whyChooseUscollection = new whyChooseUsModel(Insertobj);
    let whyChooseUsRes = await whyChooseUscollection.save();

    res.status(201).send({
      status: 1,
      msg: "whyChooseUs created successfully",
      data: whyChooseUsRes,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      msg: "Error creating whyChooseUs",
      error: err.message,
    });
  }
};

let whyChooseUsView = async (req, res) => {
  let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }

  let whyChooseUsData = await whyChooseUsModel.find().skip(skip).limit(limit);

  let whyChooseUsDataLength = await whyChooseUsModel.find();

  let obj = {
    status: 1,
    msg: "whyChooseUs view successfully",
    staticPath:process.env.WHYCHOOSEUSIMAGEPATH,
    whyChooseUsData,
    length: whyChooseUsDataLength.length,
    totalPages: Math.ceil(whyChooseUsDataLength.length / limit),
  };
  res.send(obj);
};
let whyChooseUsEdit = async (req, res) => {
  let { id } = req.params;
  let whyChooseUsData = await whyChooseUsModel.findOne({ _id:id });
  let obj = {
    status: 1,
    msg: "whyChooseUs Edit successfully",
    whyChooseUsData,
  };
  res.send(obj);
};

let whyChooseUsDelete = (req, res) => {
  let { id } = req.params;
  let obj;
  whyChooseUsModel
    .deleteOne({ _id: id })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "whyChooseUs deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "whyChooseUs delete failed",
        err,
      };
      res.send(obj);
    });
};

let whyChooseUsmultyDelete = (req, res) => {
  let { ids } = req.body;
  let obj;
  whyChooseUsModel
    .deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "whyChooseUs deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "whyChooseUs delete failed",
        err,
      };
      res.send(obj);
    });
};

let statusUpdate = async (req, res) => {
  let { ids } = req.body;

  let updateRes = await whyChooseUsModel.updateMany({ _id: ids }, [
    {
      $set: {
        Status: {
          $not: "$Status",
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

let whyChooseUsUpdate = async (req, res) => {
  let obj;
  let { id } = req.params;

  try {
    let updateRes = await whyChooseUsModel.updateOne({ _id: id }, { $set: req.body });
    obj = {
      status: 1,
      msg: "whyChooseUs updated successfully",
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


module.exports={whyChooseUsCreate ,whyChooseUsView ,whyChooseUsEdit ,whyChooseUsDelete ,whyChooseUsmultyDelete ,statusUpdate ,whyChooseUsUpdate}