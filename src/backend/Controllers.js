const Student = require("../model/Students");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().limit(10);
    console.log(students);
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ msg: "error on getting users" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Student.find({ email, password }).limit(10);

    console.log(req.body);
    if (existingUser) {
      if (email === "" || password === "") {
        res.status(404).json({ success: false, message: "Data mising" });
      } else {
        res.status(200).json({ success: true, user: existingUser });
      }
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addStudent = async (req, res) => {
  const { name, semester, courseCode, failingGrade, courseName } = req.body;
  try {
    const userExists = await Student.findOne({ name }).limit(10);
    if (userExists) {
      res.status(400).json({ msg: "user already exists" });
    } else {
      const newStudent = new Student({
        name,
        semester,
        courseCode,
        failingGrade,
        courseName,
      });
      await newStudent.save();
      res
        .status(201)
        .json({ message: "Student added successfully", student: newStudent });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add student", details: err.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingName = await Student.find({ name });
    if (existingName) {
      await Student.updateMany({ name }, { $set: { email, password } });
      res.status(200).json({
        success: true,
        message: "Credentials have been updated successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const filterCourses = async (req, res) => {
  var failingGrade = [];
  var courseCodeSet = new Set(); // Using a Set to store unique course codes
  var courseName = [];
  const { email } = req.body;
  try {
    const existingEmail = await Student.find({ email });
    if (existingEmail.length > 0) {
      existingEmail.forEach((student) => {
        if (student.grade < 35.6) {
          const courseNameWithoutDetails = student.course_name.replace(/\s-\s[A-Z]+\d+\s-\s/, " - "); // Remove additional details
          const courseCode = courseNameWithoutDetails.match(/^[A-Z]+\d+/)[0]; // Extract course code
          // Check if the course code is not already in the set
          if (!courseCodeSet.has(courseCode)) {
            courseCodeSet.add(courseCode);
            courseName.push(courseNameWithoutDetails);
            failingGrade.push(student.grade);
          }
        }
      });

      res.status(200).json({ Grade: failingGrade, failedCourses: courseName });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};








const addFields = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Update all documents that have a name but do not have an email and password set
    const result = await Student.updateMany(
      {
        name: { $exists: true },
        email: { $exists: false },
        password: { $exists: false },
      },
      { $set: { email, password } }
    );

    res.json({
      message: `${result.nModified} student(s) updated successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const generateEmail = async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find();

    // Update each student's email based on their name
    for (const student of students) {
      const nameParts = student.name.trim().split(' ');
      if (nameParts.length >= 2) {
        const firstName = nameParts[0].toLowerCase();
        const lastName = nameParts[1].toLowerCase();

        // Update the student's email
        student.email = `${firstName}.${lastName}@medtech.tn`;
        await student.save();
      }
    }

    res.json({ message: 'Emails updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getStudents,
  addStudent,
  login,
  signup,
  filterCourses,
  addFields,
  generateEmail
};