let mongoose= require('mongoose')

let countrySchema = mongoose.Schema({
  countryName: {
    type: String,
    required: true,
    minLength:3,
    maxLength:20,
    unique:true
  },

  countryOrder : {
     type: Number,
     default: 0
   },
   countryStatus : {
     type: Boolean,
     default: true
   },
   countryCode: {
    type: String,
    unique: true,  // only if you want each code to be unique
    sparse: true   // allows multiple null values, avoids duplicate null error
  }
})

let countryModel = mongoose.model('country',countrySchema)

module.exports = countryModel