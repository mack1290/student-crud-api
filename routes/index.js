const express = require('express');
const studentController = require('../controllers/student');
const router = express.Router();
const Joi = require('joi');
const expressJoi = require('express-joi-validator');

const studentSchema = {
    body: {
        studentId: Joi.string().optional().trim().regex(/^[0-9a-fA-F]{24}$/), 
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        address: Joi.string()
    }
};


router.post('/student', expressJoi(studentSchema), studentController.createStudent);
router.get('/student', studentController.getAllStudent);
router.get('/student/:studentId', expressJoi({params:{
    studentId: Joi.string().optional().trim().regex(/^[0-9a-fA-F]{24}$/)
}}), studentController.getSingleStudent);
router.put('/student', expressJoi(studentSchema), studentController.updateStudent);
router.delete('/student/:studentId', expressJoi({ params: {
    studentId: Joi.string().optional().trim().regex(/^[0-9a-fA-F]{24}$/)
}}), studentController.deleteStudent);
router.get('/student/search/:searchText', expressJoi({params: {
    searchText: Joi.string().required().trim().regex(/^[a-zA-Z ]*$/)
}}), studentController.searchStudent);

module.exports = router;