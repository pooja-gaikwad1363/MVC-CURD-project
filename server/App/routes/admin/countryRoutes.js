let express =require('express');

const { countryCreate, countryView,countryDelete ,multyDeltete ,countryUpdate ,countryEdit,statusUpdate} = require('../../controllers/admin/countryController');


let countryRoutes =express.Router();



countryRoutes.post('/create',countryCreate)

countryRoutes.get('/view',countryView)

countryRoutes.delete('/delete/:id', countryDelete);
countryRoutes.post('/multydelete/', multyDeltete);
countryRoutes.post('/change-status/', statusUpdate);
countryRoutes.get('/edit-country/:id', countryEdit);
countryRoutes.put('/update/:id',countryUpdate)


module.exports =countryRoutes;