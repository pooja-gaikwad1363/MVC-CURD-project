let mongoose= require('mongoose')

let subSubcategorySchema = mongoose.Schema({
  subSubcategoryName: {
    type: String,
    required: true,
    minLength:3,
    maxLength:20,
    unique:true
  },
    parentCategoryId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    
    },
    subCategory:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subCategory'
    
    },
  subSubcategoryImage:String,
  
   subSubcategoryOrder : {
     type: Number,
     default: 0
   },
   subSubcategoryStatus : {
     type: Boolean,
     default: true
   }
})

let subSubcategoryModel = mongoose.model('subSubcategory',subSubcategorySchema)

module.exports = subSubcategoryModel