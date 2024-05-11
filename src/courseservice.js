// src/services/courseService.js
const API_URL = 'http://localhost:3000/api/courses'; // Change this according to your server's URL

export const fetchCourses = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addCourse = async (course) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
    });
    if (!response.ok) {
        throw new Error('Failed to add course');
    }
    return await response.json();
};

export const updateCourse = async (id, course) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
    });
    if (!response.ok) {
        throw new Error('Failed to update course');
    }
    return await response.json();
};

export const deleteCourse = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete course');
    }
    return await response.json();
};
