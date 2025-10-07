const colorModel = require("../../models/colorModel");

let colorCreate = async (req, res) => {
  let obj;

  try {
    //insert data in database query type-1*
    let colorcollection = await colorModel(req.body);
    let colorRes = await colorcollection.save();

    //insert data in database query type-2****
    // let colorcollection =await colorModel.insertOne(req.body);

    obj = {
      status: 1,
      msg: "color created successfully",
      colorRes,
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
let colorView = async (req, res) => {
  let skip = 0;
  let limit = 5;

  if (req.query.limit) {
limit= req.query.limit;
  }

  if (req.query.page) {
    skip = (req.query.page - 1) * limit;
  }

  let colorData = await colorModel.find().skip(skip).limit(limit);

  let colorDataLength = await colorModel.find();

  let obj = {
    status: 1,
    msg: "color view successfully",
    colorData,
    length: colorDataLength.length,
    totalPages: Math.ceil(colorDataLength.length / limit),
  };
  res.send(obj);
};

let colorEdit = async (req, res) => {
  let { id } = req.params;
  let colorData = await colorModel.findOne({ _id: id });
  let obj = {
    status: 1,
    msg: "color Edit successfully",
    colorData,
  };
  res.send(obj);
};

let colorDelete = (req, res) => {
  let { id } = req.params;
  let obj;
  colorModel
    .deleteOne({ _id: id })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "Color deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "Color delete failed",
        err,
      };
      res.send(obj);
    });
};

let colormultyDelete = (req, res) => {
  let { ids } = req.body;
  let obj;
  colorModel
    .deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "Color deleted successfully",
        delRes,
      };
      res.send(obj);
    })
    .catch((err) => {
      obj = {
        status: 0,
        msg: "Color delete failed",
        err,
      };
      res.send(obj);
    });
};

let statusUpdate = async (req, res) => {
  let { ids } = req.body;

  let updateRes = await colorModel.updateMany({ _id: ids }, [
    {
      $set: {
        colorStatus: {
          $not: "$colorStatus",
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

let colorUpdate = async (req, res) => {
  let obj;
  let { id } = req.params;

  try {
    let updateRes = await colorModel.updateOne({ _id: id }, { $set: req.body });
    obj = {
      status: 1,
      msg: "color updated successfully",
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

module.exports = {
  colorCreate,
  colorView,
  colorDelete,
  colorUpdate,
  colormultyDelete,
  colorEdit,
  statusUpdate,
};
