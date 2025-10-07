let mongoose= require('mongoose')

let faqSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    minLength:3,
    maxLength:20,
  
  },
   Answer: {
    type: String,
    required: true,
    minLength:3,
    maxLength:50,
  
  },

  faqOrder : {
     type: Number,
     default: 0
   },
 faqStatus : {
     type: Boolean,
     default: true
   },
 
})

let faqModel = mongoose.model('faq', faqSchema)

module.exports = faqModel