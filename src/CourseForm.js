// src/components/CourseForm.js
import React, { useState } from 'react';
import { addCourse, updateCourse } from '../src/courseService';
import { fetchCourses, addCourse, updateCourse, deleteCourse } from '../services/courseService';


function CourseForm({ course: initialCourse = { name: '', description: '' }, onSave }) {
    const [course, setCourse] = useState(initialCourse);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevCourse => ({ ...prevCourse, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedCourse = course._id ? await updateCourse(course._id, course) : await addCourse(course);
            onSave(savedCourse);
        } catch (error) {
            console.error('Failed to save the course:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={course.name} onChange={handleChange} required />
            </label>
            <label>
                Description:
                <textarea name="description" value={course.description} onChange={handleChange} required />
            </label>
            <button type="submit">Save Course</button>
        </form>
    );
}

export default CourseForm;
