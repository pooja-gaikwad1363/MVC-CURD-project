const testimonialModel = require("../../models/testimonialModel");


// let testimonialCreate = async (req, res) => {
// console.log(req.body)

// let Insertobj={...req.body}
// if(req.file){
//   if(req.file.filename){
//     Insertobj['testimonialImage']=req.file.filename
//   }
 
//    try {
//     //insert data in database query type-1*
//     let testimonialcollection = await testimonialModel(Insertobj);
//     let testimonialRes = await testimonialcollection.save();

//     //insert data in database query type-2****
//     // let testimonialcollection =await testimonialModel.insertOne(req.body);

//     let obj = {
//       status: 1,
//       msg: "testimonial created successfully",
//       testimonialRes,
    
//     };
//     res.send(obj);
//   } catch (err) {
//       console.error("Testimonial create error:", err);  // 
//    let obj = {
//       status: 0,
//       err,
//     };
//     res.send(obj);
//   }
// }


// };
let testimonialCreate = async (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);

  try {
    let Insertobj = { ...req.body };

    // if image uploaded by multer
    if (req.file && req.file.filename) {
      Insertobj.testimonialImage = req.file.filename;
    }

    // save to DB
    let testimonialcollection = new testimonialModel(Insertobj);
    let testimonialRes = await testimonialcollection.save();

    res.json({
      status: 1,
      msg: "testimonial created successfully",
      testimonialRes,
    });

  } catch (err) {
    console.error("Testimonial create error:", err);
    res.status(500).json({
      status: 0,
      msg: "Failed to create testimonial",
      error: err.message || err,
    });
  }
};

let testimonialView = async (req, res) => {
  let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }

  let testimonialData = await testimonialModel.find().skip(skip).limit(limit);

  let testimonialDataLength = await testimonialModel.find();

  let obj = {
    status: 1,
    msg: "testimonial view successfully",
    staticPath:process.env.TESTIMONIALIMAGEPATH,
    testimonialData,
    length: testimonialDataLength.length,
    totalPages: Math.ceil(testimonialDataLength.length / limit),
  };
  res.send(obj);
};
let testimonialEdit = async (req, res) => {
  let { id } = req.params;
  let testimonialData = await testimonialModel.findOne({ _id: id });
  let obj = {
    status: 1,
    msg: "testimonial Edit successfully",
    testimonialData,
  };
  res.send(obj);
};

let testimonialDelete = (req, res) => {
  let { id } = req.params;
  let obj;
  testimonialModel
    .deleteOne({ _id: id })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "testimonial deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "testimonial delete failed",
        err,
      };
      res.send(obj);
    });
};

let testimonialmultyDelete = (req, res) => {
  let { ids } = req.body;
  let obj;
  testimonialModel
    .deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "testimonial deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "testimonial delete failed",
        err,
      };
      res.send(obj);
    });
};

let statusUpdate = async (req, res) => {
  let { ids } = req.body;

  let updateRes = await testimonialModel.updateMany({ _id: ids }, [
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

let testimonialUpdate = async (req, res) => {
  let obj;
  let { id } = req.params;

  try {
    let updateRes = await testimonialModel.updateOne({ _id: id }, { $set: req.body });
    obj = {
      status: 1,
      msg: "testimonial updated successfully",
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


module.exports={testimonialCreate ,testimonialView ,testimonialEdit ,testimonialDelete ,testimonialmultyDelete ,statusUpdate ,testimonialUpdate}