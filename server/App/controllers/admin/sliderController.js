const sliderModel = require("../../models/sliderModel");

let sliderCreate = async (req, res) => {
console.log(req.body)

let Insertobj={...req.body}
if(req.file){
  if(req.file.filename){
    Insertobj['sliderImage']=req.file.filename
  }
 
   try {
    //insert data in database query type-1*
    let slidercollection = await sliderModel(Insertobj);
    let sliderRes = await slidercollection.save();

    //insert data in database query type-2****
    // let slidercollection =await sliderModel.insertOne(req.body);

    let obj = {
      status: 1,
      msg: "slider created successfully",
      sliderRes,
    
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

let sliderView = async (req, res) => {
  let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }

  let sliderData = await sliderModel.find().skip(skip).limit(limit);

  let sliderDataLength = await sliderModel.find();

  let obj = {
    status: 1,
    msg: "slider view successfully",
    staticPath:process.env.SLIDERIMAGEPATH,
    sliderData,
    length: sliderDataLength.length,
    totalPages: Math.ceil(sliderDataLength.length / limit),
  };
  res.send(obj);
};
let sliderEdit = async (req, res) => {
  let { id } = req.params;
  let sliderData = await sliderModel.findOne({ _id: id });
  let obj = {
    status: 1,
    msg: "slider Edit successfully",
    sliderData,
  };
  res.send(obj);
};

let sliderDelete = (req, res) => {
  let { id } = req.params;
  let obj;
  sliderModel
    .deleteOne({ _id: id })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "slider deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "slider delete failed",
        err,
      };
      res.send(obj);
    });
};

let slidermultyDelete = (req, res) => {
  let { ids } = req.body;
  let obj;
  sliderModel
    .deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "slider deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "slider delete failed",
        err,
      };
      res.send(obj);
    });
};

let statusUpdate = async (req, res) => {
  let { ids } = req.body;

  let updateRes = await sliderModel.updateMany({ _id: ids }, [
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

let sliderUpdate = async (req, res) => {
  let obj;
  let { id } = req.params;

  try {
    let updateRes = await sliderModel.updateOne({ _id: id }, { $set: req.body });
    obj = {
      status: 1,
      msg: "slider updated successfully",
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


module.exports={sliderCreate ,sliderView ,sliderEdit ,sliderDelete ,slidermultyDelete ,statusUpdate ,sliderUpdate}