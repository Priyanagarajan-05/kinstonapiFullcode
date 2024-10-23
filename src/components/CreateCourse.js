import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
    const username = localStorage.getItem('username');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateCourse = async () => {
        try {
            const course = {
                title,
                description,
                startDate,
                endDate,
                price,
                professorId: username,
                content,
            };

            const response = await axios.post('http://localhost:5295/api/Courses', course);

            if (response.status === 201) {
                setMessage('Course created successfully and pending approval!');
                clearForm();
            } else {
                setMessage('Failed to create the course. Please try again.');
            }
        } catch (error) {
            console.error('Error creating course:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setPrice('');
        setContent('');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create a Course</h2>

            {message && <p style={styles.message}>{message}</p>}

            <div style={styles.courseForm}>
                <label style={styles.label}>Course Title:</label>
                <input
                    style={styles.input}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter course title"
                />

                <label style={styles.label}>Description:</label>
                <textarea
                    style={styles.textArea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter course description"
                ></textarea>

                <label style={styles.label}>Start Date:</label>
                <input
                    style={styles.input}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <label style={styles.label}>End Date:</label>
                <input
                    style={styles.input}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <label style={styles.label}>Price (in USD):</label>
                <input
                    style={styles.input}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter course price"
                />

                <label style={styles.label}>Course Content:</label>
                <textarea
                    style={styles.textArea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter course content"
                ></textarea>

                <button style={styles.createButton} onClick={handleCreateCourse}>
                    Create Course
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        maxWidth: '600px',
        margin: '0 auto',
    },
    heading: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    courseForm: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '16px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textArea: {
        width: '100%',
        padding: '10px',
        minHeight: '100px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    createButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    message: {
        marginBottom: '20px',
        color: '#d9534f',
    },
};

export default CreateCourse;
