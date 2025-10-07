let express = require('express');
const multer =require('multer');
const { subSubcategoryCreate ,subSubcategoryView ,subSubcategoryDelete ,subSubcategorymultyDelete ,statusUpdate ,subSubcategoryEdit ,subSubcategoryUpdate,parentCategory, subCategory} = require('../../controllers/admin/subSubcategoryController');



let subSubcategoryRoutes = express.Router();

const storage = multer.diskStorage({
destination: function (req, file, cb) {
   cb(null, 'upload/subSubcategory')
  },
  filename: function (req, file, cb) {
   
    cb(null,Date.now()+ file.originalname)
  }

})

const upload = multer({ storage: storage })


subSubcategoryRoutes.post('/create',upload.single('subSubcategoryImage'), subSubcategoryCreate);
subSubcategoryRoutes.get('/view',subSubcategoryView)

subSubcategoryRoutes.delete('/delete/:id', subSubcategoryDelete);
subSubcategoryRoutes.post('/multydelete/', subSubcategorymultyDelete);
subSubcategoryRoutes.post('/change-status/', statusUpdate);
subSubcategoryRoutes.get('/edit-subSubcategory/:id', subSubcategoryEdit);
subSubcategoryRoutes.put('/update/:id',subSubcategoryUpdate)
subSubcategoryRoutes.get('/parent-category',parentCategory)
subSubcategoryRoutes.get('/sub-category/:parentId',subCategory)
module.exports = subSubcategoryRoutes;
