let express = require('express');
let mongoose =require('mongoose');
require('dotenv').config();


let App =express();
let cors =require('cors');
const adminRoutes = require('./App/routes/admin/adminRoutes');
App.use(cors());
App.use(express.json());

App.use('/admin',adminRoutes);

App.use('/upload/category',express.static('upload/category'))
App.use('/upload/whyChooseUs',express.static('upload/whyChooseUs'))
App.use('/upload/slider',express.static('upload/slider'))
App.use('/upload/testimonial',express.static('upload/testimonial'))
App.use('/upload/subcategory',express.static('upload/subcategory'))
App.use('/upload/subsubcategory',express.static('upload/subsubcategory'))

mongoose.connect(process.env.DBCONNECTION)
.then((res)=>{
    App.listen (process.env.PORT)
})




// App.listen("5000")

// App.listen(process.env.PORT ?? 8001,()=>{
//     console.log(`server is running at port ${process.env.PORT ?? 8001}`);
// })