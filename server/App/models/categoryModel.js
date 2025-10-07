let mongoose= require('mongoose')

let categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    minLength:3,
    maxLength:20,
    unique:true
  },
  categoryImage:String,
  
   categoryOrder : {
     type: Number,
     default: 0
   },
   categoryStatus : {
     type: Boolean,
     default: true
   }
})

let categoryModel = mongoose.model('category',categorySchema)

module.exports = categoryModel