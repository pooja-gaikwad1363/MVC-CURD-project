let mongoose= require('mongoose')

let sliderSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength:3,
    maxLength:20,
    unique:true
  },
  sliderImage:String,
 
  order : {
     type: Number,
     default: 0
   },
  Status : {
     type: Boolean,
     default: true
   }
})

let sliderModel = mongoose.model('slider',sliderSchema)

module.exports = sliderModel