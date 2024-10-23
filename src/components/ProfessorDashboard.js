/* ==== working =====

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';

const ProfessorDashboard = () => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('create');
    const [courseCreated, setCourseCreated] = useState(false);
    const [courses, setCourses] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [course, setCourse] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        price: '',
        modules: [{ title: '', content: '', order: 1 }],
    });

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5295/api/Courses', {
                title: course.title,
                description: course.description,
                professorId: userId,
                startDate: course.startDate,
                endDate: course.endDate,
                price: course.price,
                modules: course.modules,
            });
            setCourseCreated(true);
            alert('Course created successfully!');
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    const handleAddModule = () => {
        setCourse({
            ...course,
            modules: [...course.modules, { title: '', content: '', order: course.modules.length + 1 }],
        });
    };

    const handleModuleChange = (index, field, value) => {
        const updatedModules = [...course.modules];
        updatedModules[index][field] = value;
        setCourse({ ...course, modules: updatedModules });
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5295/api/Courses');
                const approvedCourses = response.data.filter(course => course.isApproved && course.professorId === parseInt(userId));
                setCourses(approvedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const reviewResponse = await axios.get(`http://localhost:5295/api/Reviews/professor/${userId}`);
                setReviews(reviewResponse.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchCourses();
        fetchReviews();
    }, [userId]);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Professor Dashboard</h2>
            <p style={styles.welcomeMessage}>Welcome, {username}</p>
            <p style={styles.professorInfo}>Email: {email} (User ID: {userId})</p>

            <div style={styles.headerRow}>
                <div style={styles.tabs}>
                    <button onClick={() => setActiveTab('create')} style={activeTab === 'create' ? styles.activeTab : styles.tab}>Create Course</button>
                    <button onClick={() => setActiveTab('myCourses')} style={activeTab === 'myCourses' ? styles.activeTab : styles.tab}>My Courses</button>
                    <button onClick={() => setActiveTab('reviews')} style={activeTab === 'reviews' ? styles.activeTab : styles.tab}>Course Review</button>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}><FaSignOutAlt /> Logout</button>
            </div>

            {}
            {activeTab === 'create' && (
                <div>
                    {!courseCreated ? (
                        <div>
                            <h3 style={styles.subHeading}>Create a Course</h3>
                            <form onSubmit={handleCreateCourse} style={styles.form}>
                                <input
                                    type="text"
                                    placeholder="Course Title"
                                    value={course.title}
                                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                                <textarea
                                    placeholder="Course Description"
                                    value={course.description}
                                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                                    required
                                    style={styles.textarea}
                                />
                                <input
                                    type="date"
                                    placeholder="Start Date"
                                    value={course.startDate}
                                    onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                                <input
                                    type="date"
                                    placeholder="End Date"
                                    value={course.endDate}
                                    onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={course.price}
                                    onChange={(e) => setCourse({ ...course, price: e.target.value })}
                                    required
                                    style={styles.input}
                                />

                                <h4>Modules</h4>
                                {course.modules.map((module, index) => (
                                    <div key={index} style={styles.moduleContainer}>
                                        <input
                                            type="text"
                                            placeholder={`Module ${index + 1} Title`}
                                            value={module.title}
                                            onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                                            required
                                            style={styles.moduleInput}
                                        />
                                        <textarea
                                            placeholder={`Module ${index + 1} Content`}
                                            value={module.content}
                                            onChange={(e) => handleModuleChange(index, 'content', e.target.value)}
                                            required
                                            style={styles.moduleTextarea}
                                        />
                                    </div>
                                ))}
                                <div style={styles.buttonContainer}>
                                    <button type="button" onClick={handleAddModule} style={styles.addButton}><FaPlus /> Add Module</button>
                                    <button type="submit" style={styles.submitButton}>Create Course</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h3 style={styles.subHeading}>Course Created Successfully!</h3>
                        </div>
                    )}
                </div>
            )}

            {}
            {activeTab === 'myCourses' && (
                <div>
                    <h3 style={styles.subHeading}>My Approved Courses</h3>
                    {courses.length > 0 ? (
                        <ul style={styles.courseList}>
                            {courses.map((course) => (
                                <li key={course.courseId} style={styles.courseItem}>
                                    <h4>{course.title}</h4>
                                    <p>{course.description}</p>
                                    <p><strong>Start Date:</strong> {course.startDate}</p>
                                    <p><strong>End Date:</strong> {course.endDate}</p>
                                    <p><strong>Price:</strong> ${course.price}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No courses approved by the admin yet.</p>
                    )}
                </div>
            )}

            {}
            {activeTab === 'reviews' && (
                <div>
                    <h3 style={styles.subHeading}>Course Reviews</h3>
                    {reviews.length > 0 ? (
                        <ul style={styles.courseList}>
                            {reviews.map((review) => (
                                <li key={review.courseId} style={styles.courseItem}>
                                    <h4>Course: {review.courseTitle}</h4>
                                    <p>Students Enrolled: {review.studentCount}</p>
                                    <p>Rating: {review.rating}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'linear-gradient(135deg, #ece9e6, #ffffff)',
        maxWidth: '800px',
        margin: '0 auto',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '28px',
        color: '#007bff',
        textAlign: 'center',
        marginBottom: '10px',
    },
    subHeading: {
        fontSize: '22px',
        color: '#555',
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    tabs: {
        display: 'flex',
        gap: '10px',
    },
    tab: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#f0f0f0',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    activeTab: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        transition: 'border 0.3s',
        outline: 'none',
    },
    textarea: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        transition: 'border 0.3s',
        outline: 'none',
        resize: 'vertical',
    },
    moduleContainer: {
        marginTop: '10px',
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '4px',
    },
    moduleInput: {
        display: 'block',
        width: '100%',
        padding: '8px',
        marginBottom: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    moduleTextarea: {
        display: 'block',
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    addButton: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    submitButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    courseList: {
        listStyleType: 'none',
        padding: '0',
    },
    courseItem: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '10px',
    },
    welcomeMessage: {
        fontSize: '20px',
        color: '#333',
    },
    professorInfo: {
        fontSize: '16px',
        color: '#777',
    },
};

export default ProfessorDashboard;
*/





/* =============
=================final working ===========*/







import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { Box, Tab, Tabs, Typography, TextField, Button, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import '../styles/ProfessorDashboard.css';  // Add the external CSS file if needed

const ProfessorDashboard = () => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(0);
    const [courseCreated, setCourseCreated] = useState(false);
    const [courses, setCourses] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [enrollmentCounts, setEnrollmentCounts] = useState({});

    const [course, setCourse] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        price: '',
        modules: [{ title: '', content: '', order: 1 }],
    });

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5295/api/Courses', {
                title: course.title,
                description: course.description,
                professorId: userId,
                startDate: course.startDate,
                endDate: course.endDate,
                price: course.price,
                modules: course.modules,
            });
            setCourseCreated(true);
            alert('Course created successfully!');
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    const handleAddModule = () => {
        setCourse({
            ...course,
            modules: [...course.modules, { title: '', content: '', order: course.modules.length + 1 }],
        });
    };

    const handleModuleChange = (index, field, value) => {
        const updatedModules = [...course.modules];
        updatedModules[index][field] = value;
        setCourse({ ...course, modules: updatedModules });
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5295/api/Courses');
                const approvedCourses = response.data.filter(course => course.isApproved && course.professorId === parseInt(userId));
                setCourses(approvedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const reviewResponse = await axios.get(`http://localhost:5295/api/Reviews/professor/${userId}`);
                setReviews(reviewResponse.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        const fetchEnrollmentCounts = async () => {
            try {
                const enrollments = await axios.get('http://localhost:5295/api/Enrollments'); // Fetch enrollments
                const counts = {};
                
                // Check what fields are returned in the enrollments response
                console.log(enrollments.data); // Add this for debugging
                
                // Process enrollments to count students per course
                enrollments.data.forEach(enrollment => {
                    const courseId = enrollment.courseId; // Ensure this field matches the one in your response
                    if (!counts[courseId]) {
                        counts[courseId] = 0;
                    }
                    counts[courseId]++;
                });
        
                // Set the enrollment counts state
                setEnrollmentCounts(counts);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            }
        };
        

        fetchCourses();
        fetchReviews();
        fetchEnrollmentCounts();
    }, [userId]);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Professor Dashboard</Typography>
            <Typography variant="h6">Welcome, {username}</Typography>
            <Typography>Email: {email} (User ID: {userId})</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 2 }}>
                <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)}>
                    <Tab label="Create Course" />
                    <Tab label="My Courses" />
                    <Tab label="Course Review" />
                </Tabs>
                <Button variant="outlined" startIcon={<FaSignOutAlt />} onClick={handleLogout}>
                    Logout
                </Button>
            </Box>

            {/* Create Course */}
            {activeTab === 0 && (
                <Paper elevation={3} sx={{ padding: 3 }}>
                    {!courseCreated ? (
                        <Box component="form" onSubmit={handleCreateCourse}>
                            <Typography variant="h5" gutterBottom>Create a Course</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Course Title"
                                        value={course.title}
                                        onChange={(e) => setCourse({ ...course, title: e.target.value })}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Course Description"
                                        value={course.description}
                                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Start Date"
                                        type="date"
                                        value={course.startDate}
                                        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="End Date"
                                        type="date"
                                        value={course.endDate}
                                        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Price"
                                        type="number"
                                        value={course.price}
                                        onChange={(e) => setCourse({ ...course, price: e.target.value })}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6" gutterBottom>Modules</Typography>
                            {course.modules.map((module, index) => (
                                <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
                                    <TextField
                                        label="Module Title"
                                        value={module.title}
                                        onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        label="Module Content"
                                        value={module.content}
                                        onChange={(e) => handleModuleChange(index, 'content', e.target.value)}
                                        multiline
                                        rows={3}
                                        fullWidth
                                        required
                                    />
                                </Paper>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                <Button variant="outlined" startIcon={<FaPlus />} onClick={handleAddModule} sx={{ flex: 1, marginRight: 1 }}>
                                    Add Module
                                </Button>
                                <Button type="submit" variant="contained" sx={{ flex: 1, marginLeft: 1 }}>
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Typography variant="h6">Course Created Successfully!</Typography>
                    )}
                </Paper>
            )}

            {/* My Courses */}
            {activeTab === 1 && (
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="h5">My Courses</Typography>
                    {courses.length > 0 ? (
                        <List>
                            {courses.map(course => (
                                <ListItem key={course.id}>
                                    <ListItemText
                                        primary={course.title}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="text.primary">{course.description}</Typography>
                                                <br />
                                                <Typography component="span" variant="body2">Start: {new Date(course.startDate).toLocaleDateString()} - End: {new Date(course.endDate).toLocaleDateString()}</Typography>
                                                <br />
                                                <Typography component="span" variant="body2">Price: ${course.price}</Typography>
                                                <br />
                                                <Typography component="span" variant="body2" sx={{ color: 'green' }}>Status: Approved</Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No courses found.</Typography>
                    )}
                </Paper>
            )}

{/* Course Reviews */}
{activeTab === 2 && (
    <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5">Course Review</Typography>
        {courses.length > 0 ? (
            <List>
                {courses.map(course => (
                    <ListItem key={course.id}>
                        <ListItemText
                            primary={course.title}
                            secondary={
                                <>
                                    {/* Display the number of students enrolled */}
                                    <Typography component="span" variant="body2" color="text.primary">
                                        Students Enrolled: {enrollmentCounts[course.id] || 0}
                                    </Typography>
                                    <br />
                                    {/* Display reviews if any */}
                                    {reviews.filter(review => review.courseId === course.id).length > 0 ? (
                                        reviews.filter(review => review.courseId === course.id).map(review => (
                                            <Typography key={review.id} component="span" variant="body2" sx={{ display: 'block' }}>
                                                Review: {review.content} - Rating: {review.rating}
                                            </Typography>
                                        ))
                                    ) : (
                                        <Typography component="span" variant="body2">No reviews yet.</Typography>
                                    )}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        ) : (
            <Typography>No courses found.</Typography>
        )}
    </Paper>
)}


        </Box>
    );
};

export default ProfessorDashboard;
