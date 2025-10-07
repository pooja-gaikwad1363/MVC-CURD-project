let express = require('express');
const multer =require('multer');
const { testimonialCreate ,testimonialView ,testimonialDelete ,testimonialmultyDelete ,statusUpdate ,testimonialEdit ,testimonialUpdate} = require('../../controllers/admin/testimonialController');


let testimonialRoutes = express.Router();

const storage = multer.diskStorage({
destination: function (req, file, cb) {
   cb(null, 'upload/testimonial')
  },
  filename: function (req, file, cb) {
   
    cb(null,Date.now()+ file.originalname)
  }

})

const upload = multer({ storage: storage })


testimonialRoutes.post('/create',upload.single('testimonialImage'), testimonialCreate);
testimonialRoutes.get('/view',testimonialView)

testimonialRoutes.delete('/delete/:id', testimonialDelete);
testimonialRoutes.post('/multydelete/', testimonialmultyDelete);
testimonialRoutes.post('/change-status/', statusUpdate);
testimonialRoutes.get('/edit-testimonial/:id', testimonialEdit);
testimonialRoutes.put('/update/:id',testimonialUpdate)

module.exports = testimonialRoutes;
