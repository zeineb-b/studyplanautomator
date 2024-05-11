import React from 'react';
import CoursesList from './CoursesList';  // Component to display study plan courses
import SemesterCourses from './SemesterCourses';  // Component for courses offered this semester
import Notifications from './Notifications';  // Component for displaying notifications

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <CoursesList />
            <SemesterCourses />
            <Notifications />
        </div>
    );
}

export default Dashboard;
