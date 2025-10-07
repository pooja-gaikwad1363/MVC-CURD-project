let mongoose=require('mongoose');

let testimonialSchema =mongoose.Schema({

  name:{
    type:String,
    required: true,
    minLength:3,
    maxLength:20,
    unique:true
  
},
testimonialImage:String,
designation:String,
rating:Number,
 Order : {
     type: Number,
     default: 0
   },
  Status : {
     type: Boolean,
     default: true
   },
message:String

})

let testimonialModel = mongoose.model("testimonial" ,testimonialSchema)
module.exports=testimonialModel