let express =require('express');
const { faqCreate ,faqView ,faqDelete,multyDeltete ,faqUpdate ,faqEdit,statusUpdate} = require('../../controllers/admin/faqController');



let faqRoutes =express.Router();



faqRoutes.post('/create',faqCreate)

faqRoutes.get('/view',faqView)

faqRoutes.delete('/delete/:id', faqDelete);
faqRoutes.post('/multydelete/', multyDeltete);
faqRoutes.post('/change-status/', statusUpdate);
faqRoutes.get('/edit-faq/:id', faqEdit);
faqRoutes.put('/update/:id',faqUpdate)


module.exports =faqRoutes;