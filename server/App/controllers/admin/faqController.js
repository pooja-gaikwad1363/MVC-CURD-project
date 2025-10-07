const faqModel = require("../../models/faqModel");


let faqCreate = async (req, res) => {
  let obj;

  try {
    //insert data in database query type-1*
    let faqcollection = await faqModel(req.body);
    let faqRes = await faqcollection.save();

    //insert data in database query type-2****
    // let faqcollection =await faqModel.insertOne(req.body);

    obj = {
      status: 1,
      msg: "faq created successfully",
      faqRes,
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
let faqView = async (req, res) => {

   let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }

  let faqData = await faqModel.find().skip(skip).limit(limit);
   
   let faqDataLength = await faqModel.find();
  let obj = {
    status: 1,
    msg: "faq view successfully",
    faqData,
       length: faqDataLength.length,
    totalPages: Math.ceil(faqDataLength.length / limit),
  };
  res.send(obj);
};

let statusUpdate = async(req ,res)=>{
  let {ids}=req.body

  let updateRes = await faqModel.updateMany({_id:ids},
    [
      {
        $set:{
            faqStatus:{
              $not: "$faqStatus"
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

let faqEdit = async (req, res) => {
  let {id}=req.params;
  let faqData = await faqModel.findOne({_id:id});
  let obj = {
    status: 1,
    msg: "faq Edit successfully",
    faqData,
  };
  res.send(obj);
};

let faqDelete = (req, res) => {
  let { id } = req.params;
let obj;
  faqModel.deleteOne({ _id: id })
    .then((delRes) => {

      obj = {
        status: 1,
        msg: "faq deleted successfully",
        delRes
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "faq delete failed",
        err
      };
      res.send(obj);
  });

  
  
};

let multyDeltete =(req, res) => {
  let {ids}=req.body
  let obj;
 faqModel.deleteMany({ _id: ids })
    .then((delRes) => {

      obj = {
        status: 1,
        msg: "faq deleted successfully",
        delRes
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "faq delete failed",
        err
      };
      res.send(obj);
  });
}
  
let faqUpdate =async (req, res) => {

  let obj;
  let {id}=req.params;

  try{
    let updateRes =await faqModel.updateOne({_id:id},{$set:req.body});
    obj = {
      status: 1,
      msg: "faq updated successfully",
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

module.exports = {
  faqCreate,
  faqView,
  faqDelete,
  faqUpdate,
  multyDeltete,
  faqEdit,
  statusUpdate
};
