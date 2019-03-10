const Student = require('../models/student');

// create new student
function createStudent(req, res) {
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address : req.body.address || '',
  });

  return student
    .save()
    .then((newStudent) => {
      return res.status(201).json({
        success: true,
        message: 'New student created successfully',
        Student: newStudent,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}

// get all students
function getAllStudent(req, res) {
  Student.find()
    .select('_id firstName lastName address')
    .then((allStudent) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all students',
        Student: allStudent,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

// get single student
function getSingleStudent(req, res) {
  const id = req.params.studentId;
  Student.findById(id)
    .then((singleStudent) => {
      return res.status(200).json({
        success: true,
        message: `Info: ${singleStudent.firstName} ${singleStudent.lastName}`,
        Student: singleStudent,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This student does not exist',
        error: err.message,
      });
    });
}

// update student
function updateStudent(req, res) {
  const id = req.body.studentId;
  const updateObject = req.body;
  Student.update({
      _id: id
    }, {
      $set: updateObject
    })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Student is updated',
        updatedStudent: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again',
        error: err.message,
      });
    });
}

// delete student
function deleteStudent(req, res) {
  const id = req.params.studentId;
  Student.findByIdAndRemove(id)
    .exec()
    .then(() => res.status(204).json({
      success: true,
      message: 'Student is deleted',
    }))
    .catch((err) => res.status(500).json({
      success: false,
      message: 'Student not found',
      error: err.message,
    }));
}

// search student
function searchStudent(req, res) {
  const query = {
    isDeleted: false
  };
  if (req.params.searchText) {
      let regexText = new RegExp(req.params.searchText, 'i');
      query.$or = [{
          firstName: regexText
      }, {
          lastName: regexText
      }];
  }
  Student.find(query)
    .select('_id firstName lastName')
    .then((allStudent) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all students',
        Student: allStudent,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}


module.exports = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  searchStudent
}