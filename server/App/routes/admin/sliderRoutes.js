let express = require('express');
const multer =require('multer');
const { sliderCreate ,sliderView ,sliderDelete ,slidermultyDelete ,statusUpdate ,sliderEdit ,sliderUpdate} = require('../../controllers/admin/sliderController');


let sliderRoutes = express.Router();

const storage = multer.diskStorage({
destination: function (req, file, cb) {
   cb(null, 'upload/slider')
  },
  filename: function (req, file, cb) {
   
    cb(null,Date.now()+ file.originalname)
  }

})

const upload = multer({ storage: storage })


sliderRoutes.post('/create',upload.single('sliderImage'), sliderCreate);
sliderRoutes.get('/view',sliderView)

sliderRoutes.delete('/delete/:id', sliderDelete);
sliderRoutes.post('/multydelete/', slidermultyDelete);
sliderRoutes.post('/change-status/', statusUpdate);
sliderRoutes.get('/edit-slider/:id', sliderEdit);
sliderRoutes.put('/update/:id',sliderUpdate)
module.exports = sliderRoutes;
