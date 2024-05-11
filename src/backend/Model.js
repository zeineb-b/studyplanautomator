const mongoose=require("mongoose");

const userDetailsSchema= new mongoose.Schema({
    course_code: String,
    semester: String,
    course_name: String,
    name: {
        type:String,
        required:true
    },
    grade: Number,
    email: String,
    password: String,
}
);

module.exports = mongoose.model("students" ,userDetailsSchema,"students");