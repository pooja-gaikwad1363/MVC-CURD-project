let mongoose= require('mongoose')

let subCategorySchema = mongoose.Schema({
  subCategoryName: {
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
  subCategoryImage:String,
  
   subCategoryOrder : {
     type: Number,
     default: 0
   },
   subCategoryStatus : {
     type: Boolean,
     default: true
   }
})

let subCategoryModel = mongoose.model('subCategory',subCategorySchema)

module.exports = subCategoryModel