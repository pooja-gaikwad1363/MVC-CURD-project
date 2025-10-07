let express =require('express');
const { materialCreate, materialView, materialDelete, materialUpdate,materialmultyDelete, materialEdit ,statusUpdate} = require('../../controllers/admin/materialController');

let materialRoutes  =express.Router();


materialRoutes.post('/create' ,materialCreate)
materialRoutes.get('/view' ,materialView)

materialRoutes.delete('/delete/:id' ,materialDelete)

materialRoutes.post('/multydelete' ,materialmultyDelete)
materialRoutes.put('/update/:id' ,materialUpdate)
materialRoutes.post('/change-status/', statusUpdate);
materialRoutes.get('/edit-material/:id', materialEdit);

module.exports = materialRoutes;