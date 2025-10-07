let express = require('express');
const multer =require('multer');
// const { whyChooseUsCreate } = require('../../controllers/admin/whyChooseUsController');
const { whyChooseUsCreate ,whyChooseUsView ,whyChooseUsDelete ,whyChooseUsmultyDelete ,statusUpdate ,whyChooseUsEdit ,whyChooseUsUpdate} = require('../../controllers/admin/whyChooseUsController');


let whyChooseUsRoutes = express.Router();

const storage = multer.diskStorage({
destination: function (req, file, cb) {
   cb(null, 'upload/whyChooseUs')
  },
  filename: function (req, file, cb) {
   
    cb(null,Date.now()+ file.originalname)
  }

})

const upload = multer({ storage: storage })


whyChooseUsRoutes.post('/create',upload.single('Image'), whyChooseUsCreate);
whyChooseUsRoutes.get('/view',whyChooseUsView)

whyChooseUsRoutes.delete('/delete/:id', whyChooseUsDelete);
whyChooseUsRoutes.post('/multydelete/', whyChooseUsmultyDelete);
whyChooseUsRoutes.post('/change-status/', statusUpdate);
whyChooseUsRoutes.get('/edit-whyChooseUs/:id', whyChooseUsEdit);
whyChooseUsRoutes.put('/update/:id',whyChooseUsUpdate)
module.exports = whyChooseUsRoutes;
