let express =require('express');
const { colorCreate, colorView, colorDelete, colorUpdate ,colormultyDelete , colorEdit ,statusUpdate} = require('../../controllers/admin/colorController');


let colorRoutes =express.Router();



colorRoutes.post('/create',colorCreate)

colorRoutes.get('/view',colorView)

colorRoutes.delete('/delete/:id', colorDelete);
colorRoutes.post('/multydelete/', colormultyDelete);
colorRoutes.post('/change-status/', statusUpdate);
colorRoutes.get('/edit-color/:id', colorEdit);
colorRoutes.put('/update/:id',colorUpdate)


module.exports =colorRoutes;