let mongoose= require('mongoose')

let whyChooseUsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength:3,
    maxLength:20,
    unique:true
  },
  Image:String,
  Description:String,
  Order : {
     type: Number,
     default: 0
   },
  Status : {
     type: Boolean,
     default: true
   }
})

let whyChooseUsModel = mongoose.model('whyChooseUs',whyChooseUsSchema)

module.exports = whyChooseUsModel