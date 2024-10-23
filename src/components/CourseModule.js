import React from 'react';

const CourseModule = ({ course, onClose }) => {
    return (
        <div className="course-module">
            <h2>{course.title} - Modules</h2>
            <button className="close-button" onClick={onClose}>Close</button>
            <div className="module-list">
                {course.modules && course.modules.length > 0 ? (
                    <ul>
                        {course.modules.map((module, index) => (
                            <li key={index}>
                                <h3>Module {index + 1}: {module.title}</h3>
                                <p>{module.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No modules available for this course.</p>
                )}
            </div>
        </div>
    );
};

export default CourseModule;
