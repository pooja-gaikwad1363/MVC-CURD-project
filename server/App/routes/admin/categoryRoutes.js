let express = require('express');
const multer =require('multer');
const { categoryCreate ,categoryView ,categoryDelete ,categorymultyDelete ,statusUpdate ,categoryEdit ,categoryUpdate} = require('../../controllers/admin/categoryController');


let categoryRoutes = express.Router();

const storage = multer.diskStorage({
destination: function (req, file, cb) {
   cb(null, 'upload/category')
  },
  filename: function (req, file, cb) {
   
    cb(null,Date.now()+ file.originalname)
  }

})

const upload = multer({ storage: storage })


categoryRoutes.post('/create',upload.single('categoryImage'), categoryCreate);
categoryRoutes.get('/view',categoryView)

categoryRoutes.delete('/delete/:id', categoryDelete);
categoryRoutes.post('/multydelete/', categorymultyDelete);
categoryRoutes.post('/change-status/', statusUpdate);
categoryRoutes.get('/edit-category/:id', categoryEdit);
categoryRoutes.put('/update/:id',categoryUpdate)
module.exports = categoryRoutes;
