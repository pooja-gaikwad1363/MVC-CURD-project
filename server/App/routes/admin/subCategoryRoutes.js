let express = require('express');
const multer =require('multer');
const { subCategoryCreate ,subCategoryView ,subCategoryDelete ,subCategorymultyDelete ,statusUpdate ,subCategoryEdit ,subCategoryUpdate,parentCategory} = require('../../controllers/admin/subCategoryController');


let subCategoryRoutes = express.Router();

const storage = multer.diskStorage({
destination: function (req, file, cb) {
   cb(null, 'upload/subCategory')
  },
  filename: function (req, file, cb) {
   
    cb(null,Date.now()+ file.originalname)
  }

})

const upload = multer({ storage: storage })


subCategoryRoutes.post('/create',upload.single('subCategoryImage'), subCategoryCreate);
subCategoryRoutes.get('/view',subCategoryView)

subCategoryRoutes.delete('/delete/:id', subCategoryDelete);
subCategoryRoutes.post('/multydelete/', subCategorymultyDelete);
subCategoryRoutes.post('/change-status/', statusUpdate);
subCategoryRoutes.get('/edit-subCategory/:id', subCategoryEdit);
subCategoryRoutes.put('/update/:id',upload.single('subCategoryImage'),subCategoryUpdate)
subCategoryRoutes.get('/parent-category',parentCategory)
module.exports = subCategoryRoutes;
