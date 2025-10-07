let mongoose= require('mongoose')

let colorSchema = mongoose.Schema({
  colorName: {
    type: String,
    required: true,
    minLength:3,
    maxLength:20,
    unique:true
  },
   colorCode: {
     type: String,
     required: true,
     unique: true
   },
   colorOrder : {
     type: Number,
     default: 0
   },
   colorStatus : {
     type: Boolean,
     default: true
   }
})

let colorModel = mongoose.model('Color',colorSchema)

module.exports = colorModel