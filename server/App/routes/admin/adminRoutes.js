let express =require('express');
const colorRoutes = require('./colorRoutes');
const materialRoutes = require('./materialRoutes');
const countryRoutes = require('./countryRoutes');
const faqRoutes = require('./faqRoutes');
const categoryRoutes = require('./categoryRoutes');
const whyChooseUsRoutes = require('./whyChooseUsRoutes');
const sliderRoutes = require('./sliderRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const subCategoryRoutes = require('./subCategoryRoutes');
const subSubcategoryRoutes = require('./subSubcategoryRoutes');



let adminRoutes =express.Router();

adminRoutes.use('/color',colorRoutes);
adminRoutes.use('/category',categoryRoutes);
adminRoutes.use('/whyChooseUS',whyChooseUsRoutes);
adminRoutes.use('/slider',sliderRoutes);
adminRoutes.use ('/material',materialRoutes);
adminRoutes.use ('/testimonial',testimonialRoutes);
adminRoutes.use('/country',countryRoutes)
adminRoutes.use('/faq' ,faqRoutes);
adminRoutes.use('/subCategory' ,subCategoryRoutes);
adminRoutes.use('/subSubcategory' ,subSubcategoryRoutes);


module.exports =adminRoutes;