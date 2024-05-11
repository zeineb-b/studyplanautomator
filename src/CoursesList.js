

import React, { useEffect, useState } from 'react';
import { fetchCourses, addCourse, updateCourse, deleteCourse } from '/src/courseService'; 

function CoursesList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses().then(setCourses).catch(console.error);
    }, []);

    const handleAddCourse = (course) => {
        addCourse(course).then(newCourse => {
            setCourses([...courses, newCourse]);
        }).catch(console.error);
    };

    // Similarly implement handleUpdateCourse and handleDeleteCourse

    return (
        <div>
            <h2>Study Plan Courses</h2>
            {courses.map(course => (
                <div key={course.id}>{course.name}</div> // Simplified for brevity
            ))}
            {/* Add forms or buttons for adding, updating, and deleting courses */}
        </div>
    );
}

export default CoursesList;