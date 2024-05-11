const express = require("express");
const studentRoute = express.Router();
const {
  getStudents,
  addStudent,
  login,
  signup,
  filterCourses,
  addFields,
  generateEmail
} = require("../Controllers/studentController");
studentRoute.get("/getstudents", getStudents);
studentRoute.post("/login", login);
studentRoute.post("/addstudent", addStudent);
studentRoute.post("/signup",signup);
studentRoute.post("/courses",filterCourses);
studentRoute.post("/addFields",addFields);
studentRoute.post("/email",generateEmail);


module.exports = studentRoute;
