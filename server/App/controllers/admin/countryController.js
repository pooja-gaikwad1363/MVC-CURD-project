
const countryModel = require("../../models/countryModel");


let countryCreate = async (req, res) => {
  let obj;

  try {
    //insert data in database query type-1*
    let countrycollection = await countryModel(req.body);
    let countryRes = await countrycollection.save();

    //insert data in database query type-2****
    // let colorcollection =await colorModel.insertOne(req.body);

    obj = {
      status: 1,
      msg: "country created successfully",
      countryRes,
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
let countryView = async (req, res) => {
   let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }
  let countryData = await countryModel.find().skip(skip).limit(limit);
   let countryDataLength = await countryModel.find();
  
  let obj = {
    status: 1,
    msg: "country view successfully",
    countryData,
     length: countryDataLength.length,
    totalPages: Math.ceil(countryDataLength.length / limit),
  };
  res.send(obj);
};

let countryEdit = async (req, res) => {
  let {id} =req.params;
  let countryData = await countryModel.findOne({_id:id});
  let obj = {
    status: 1,
    msg: "country Edit successfully",
    countryData,
  };
  res.send(obj);
};

let countryDelete = (req, res) => {
  let { id } = req.params;
let obj;
  countryModel.deleteOne({ _id: id })
    .then((delRes) => {

      obj = {
        status: 1,
        msg: "Country deleted successfully",
        delRes
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "Country delete failed",
        err
      };
      res.send(obj);
  });


  
};

let multyDeltete =(req, res) => {
  let {ids}=req.body
  let obj;
 countryModel.deleteMany({ _id: ids })
    .then((delRes) => {

      obj = {
        status: 1,
        msg: "Country deleted successfully",
        delRes
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "Country delete failed",
        err
      };
      res.send(obj);
  });
}
  
let countryUpdate =async (req, res) => {

  let obj;
  let {id}=req.params;

  try{
    let updateRes =await countryModel.updateOne({_id:id},{$set:req.body});
    obj = {
      status: 1,
      msg: "Country updated successfully",
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
};

  let statusUpdate = async (req ,res)=>{
  let {ids}=req.body

  let updateRes = await countryModel.updateMany({_id:ids},
    [
      {
        $set:{
            countryStatus:{
              $not: "$countryStatus"
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



module.exports = {
  countryCreate,
  countryView,
  countryDelete,
countryUpdate,
  multyDeltete,
  countryEdit,
  statusUpdate
};
