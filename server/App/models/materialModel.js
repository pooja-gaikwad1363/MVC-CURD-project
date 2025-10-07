let mongoose= require('mongoose');


let materialSchema = mongoose.Schema({
  categoryName: {
    type: String,
  },
  materialOrder:Number,
   materialStatus : {
     type: Boolean,
     default: true
   }
});

let materialModel = mongoose.model('Material', materialSchema);
module.exports = materialModel;
