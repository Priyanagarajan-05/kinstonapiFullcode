/* ------ professor/student ------


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const [pendingStudents, setPendingStudents] = useState([]);
    const [pendingProfessors, setPendingProfessors] = useState([]);

    useEffect(() => {
        // Fetch pending accounts (students and professors)
        const fetchPendingAccounts = async () => {
            try {
                const studentResponse = await axios.get('http://localhost:5295/api/Students/pending');
                const professorResponse = await axios.get('http://localhost:5295/api/Professors/pending');

                setPendingStudents(studentResponse.data);
                setPendingProfessors(professorResponse.data);
            } catch (err) {
                console.error('Error fetching pending accounts:', err);
            }
        };

        fetchPendingAccounts();
    }, []);

    // Approve user
    const handleApprove = async (id, type) => {
        try {
            await axios.post(`http://localhost:5295/api/${type}/approve/${id}`);
            if (type === 'Students') {
                setPendingStudents(pendingStudents.filter(student => student.userId !== id)); // assuming userId is the key
            } else if (type === 'Professors') {
                setPendingProfessors(pendingProfessors.filter(professor => professor.userId !== id));
            }
        } catch (err) {
            console.error('Error approving account:', err);
        }
    };

    // Reject user
    const handleReject = async (id, type) => {
        try {
            await axios.post(`http://localhost:5295/api/${type}/reject/${id}`);
            if (type === 'Students') {
                setPendingStudents(pendingStudents.filter(student => student.userId !== id));
            } else if (type === 'Professors') {
                setPendingProfessors(pendingProfessors.filter(professor => professor.userId !== id));
            }
        } catch (err) {
            console.error('Error rejecting account:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/'); // Redirect to the admin page
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Admin Dashboard</h2>
            <p>Welcome, {username}</p>
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>

            <h3 style={styles.subHeader}>Manage Students</h3>
            <div style={styles.tableContainer}>
                {pendingStudents.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingStudents.map((student) => (
                                <tr key={student.userId}>
                                    <td style={styles.td}>{student.name}</td>
                                    <td style={styles.td}>{student.email}</td>
                                    <td style={styles.td}>
                                        <button style={styles.approveButton} onClick={() => handleApprove(student.userId, 'Students')}>Approve</button>
                                        <button style={styles.rejectButton} onClick={() => handleReject(student.userId, 'Students')}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No pending student accounts for approval.</p>
                )}
            </div>

            <h3 style={styles.subHeader}>Manage Professors</h3>
            <div style={styles.tableContainer}>
                {pendingProfessors.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingProfessors.map((professor) => (
                                <tr key={professor.userId}>
                                    <td style={styles.td}>{professor.name}</td>
                                    <td style={styles.td}>{professor.email}</td>
                                    <td style={styles.td}>
                                        <button style={styles.approveButton} onClick={() => handleApprove(professor.userId, 'Professors')}>Approve</button>
                                        <button style={styles.rejectButton} onClick={() => handleReject(professor.userId, 'Professors')}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No pending professor accounts for approval.</p>
                )}
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    subHeader: {
        marginTop: '30px',
        color: '#555',
    },
    tableContainer: {
        marginBottom: '40px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#f9f9f9',
    },
    th: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '3px',
        marginRight: '5px',
    },
    rejectButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '3px',
    },
};

export default AdminDashboard;
*/

/* ---------- course -----------

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const [pendingCourses, setPendingCourses] = useState([]);

    useEffect(() => {
        // Fetch pending courses
        const fetchPendingCourses = async () => {
            try {
                const courseResponse = await axios.get('http://localhost:5295/api/Courses');
                setPendingCourses(courseResponse.data);
            } catch (err) {
                console.error('Error fetching pending courses:', err);
            }
        };

        fetchPendingCourses();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:5295/api/Courses/approve/${id}`);
            setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
        } catch (err) {
            console.error('Error approving course:', err);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:5295/api/Courses/reject/${id}`);
            setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
        } catch (err) {
            console.error('Error rejecting course:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome, {username}</p>
            <button onClick={handleLogout}>Logout</button>

            <h3>Manage Courses</h3>
            <div>
                {pendingCourses.length > 0 ? (
                    <ul>
                        {pendingCourses.map((course) => (
                            <li key={course.courseId}>
                                {course.title} ({course.description}) - Pending Approval
                                <button onClick={() => handleApprove(course.courseId)}>Approve</button>
                                <button onClick={() => handleReject(course.courseId)}>Reject</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending courses for approval.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
*/



/* -- p / s / c -----

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const [pendingStudents, setPendingStudents] = useState([]);
    const [pendingProfessors, setPendingProfessors] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);

    useEffect(() => {
        const fetchPendingAccounts = async () => {
            try {
                const studentResponse = await axios.get('http://localhost:5295/api/Students/pending');
                const professorResponse = await axios.get('http://localhost:5295/api/Professors/pending');
                setPendingStudents(studentResponse.data);
                setPendingProfessors(professorResponse.data);
            } catch (err) {
                console.error('Error fetching pending accounts:', err);
            }
        };

        const fetchPendingCourses = async () => {
            try {
                const courseResponse = await axios.get('http://localhost:5295/api/Courses');
                setPendingCourses(courseResponse.data);
            } catch (err) {
                console.error('Error fetching pending courses:', err);
            }
        };

        fetchPendingAccounts();
        fetchPendingCourses();
    }, []);

    const handleApprove = async (id, type) => {
        try {
            await axios.post(`http://localhost:5295/api/${type}/approve/${id}`);
            if (type === 'Students') {
                setPendingStudents(pendingStudents.filter(student => student.userId !== id));
            } else if (type === 'Professors') {
                setPendingProfessors(pendingProfessors.filter(professor => professor.userId !== id));
            } else if (type === 'Courses') {
                setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
            }
        } catch (err) {
            console.error(`Error approving ${type}:`, err);
        }
    };

    const handleReject = async (id, type) => {
        try {
            await axios.post(`http://localhost:5295/api/${type}/reject/${id}`);
            if (type === 'Students') {
                setPendingStudents(pendingStudents.filter(student => student.userId !== id));
            } else if (type === 'Professors') {
                setPendingProfessors(pendingProfessors.filter(professor => professor.userId !== id));
            } else if (type === 'Courses') {
                setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
            }
        } catch (err) {
            console.error(`Error rejecting ${type}:`, err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h2 style={styles.header}>Admin Dashboard</h2>
                <p style={styles.welcome}>Welcome, {username}</p>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>

            <div style={styles.content}>
                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Students</h3>
                    {pendingStudents.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingStudents.map((student) => (
                                    <tr key={student.userId}>
                                        <td style={styles.td}>{student.name}</td>
                                        <td style={styles.td}>{student.email}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(student.userId, 'Students')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(student.userId, 'Students')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending student accounts for approval.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Professors</h3>
                    {pendingProfessors.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingProfessors.map((professor) => (
                                    <tr key={professor.userId}>
                                        <td style={styles.td}>{professor.name}</td>
                                        <td style={styles.td}>{professor.email}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(professor.userId, 'Professors')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(professor.userId, 'Professors')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending professor accounts for approval.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Courses</h3>
                    {pendingCourses.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Course Title</th>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingCourses.map((course) => (
                                    <tr key={course.courseId}>
                                        <td style={styles.td}>{course.title}</td>
                                        <td style={styles.td}>{course.description}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(course.courseId, 'Courses')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(course.courseId, 'Courses')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending courses for approval.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    header: {
        color: '#333',
        fontSize: '24px',
    },
    welcome: {
        fontSize: '16px',
        color: '#777',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
    },
    section: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    subHeader: {
        color: '#555',
        marginBottom: '15px',
        fontSize: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
    },
    th: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        fontSize: '14px',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        fontSize: '14px',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        marginRight: '5px',
    },
    rejectButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
};

export default AdminDashboard;
*/




/* -- manage professor / stduent working , but new course  updated if IsApproved is 1  ==========================


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const [pendingStudents, setPendingStudents] = useState([]);
    const [pendingProfessors, setPendingProfessors] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);

    useEffect(() => {
        const fetchPendingAccounts = async () => {
            try {
                const studentResponse = await axios.get('http://localhost:5295/api/Students/pending');
                const professorResponse = await axios.get('http://localhost:5295/api/Professors/pending');
                setPendingStudents(studentResponse.data);
                setPendingProfessors(professorResponse.data);
            } catch (err) {
                console.error('Error fetching pending accounts:', err);
            }
        };

        const fetchPendingCourses = async () => {
            try {
                const courseResponse = await axios.get('http://localhost:5295/api/Courses');
                setPendingCourses(courseResponse.data);
            } catch (err) {
                console.error('Error fetching pending courses:', err);
            }
        };

        fetchPendingAccounts();
        fetchPendingCourses();
    }, []);

    const handleApprove = async (id, type) => {
        try {
            await axios.post(`http://localhost:5295/api/${type}/approve/${id}`);
            if (type === 'Students') {
                setPendingStudents(pendingStudents.filter(student => student.userId !== id));
            } else if (type === 'Professors') {
                setPendingProfessors(pendingProfessors.filter(professor => professor.userId !== id));
            } else if (type === 'Courses') {
                setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
            }
        } catch (err) {
            console.error(`Error approving ${type}:`, err);
        }
    };

    const handleReject = async (id, type) => {
        try {
            await axios.post(`http://localhost:5295/api/${type}/reject/${id}`);
            if (type === 'Students') {
                setPendingStudents(pendingStudents.filter(student => student.userId !== id));
            } else if (type === 'Professors') {
                setPendingProfessors(pendingProfessors.filter(professor => professor.userId !== id));
            } else if (type === 'Courses') {
                setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
            }
        } catch (err) {
            console.error(`Error rejecting ${type}:`, err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h2 style={styles.header}>Admin Dashboard</h2>
                <p style={styles.welcome}>Welcome, {username}</p>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>

            <div style={styles.content}>
                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Students</h3>
                    {pendingStudents.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingStudents.map((student) => (
                                    <tr key={student.userId}>
                                        <td style={styles.td}>{student.name}</td>
                                        <td style={styles.td}>{student.email}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(student.userId, 'Students')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(student.userId, 'Students')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending student accounts for approval.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Professors</h3>
                    {pendingProfessors.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingProfessors.map((professor) => (
                                    <tr key={professor.userId}>
                                        <td style={styles.td}>{professor.name}</td>
                                        <td style={styles.td}>{professor.email}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(professor.userId, 'Professors')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(professor.userId, 'Professors')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending professor accounts for approval.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Courses</h3>
                    {pendingCourses.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Course Title</th>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingCourses.map((course) => (
                                    <tr key={course.courseId}>
                                        <td style={styles.td}>{course.title}</td>
                                        <td style={styles.td}>{course.description}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(course.courseId, 'Courses')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(course.courseId, 'Courses')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending courses for approval.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    header: {
        color: '#333',
        fontSize: '24px',
    },
    welcome: {
        fontSize: '16px',
        color: '#777',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
    },
    section: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    subHeader: {
        color: '#555',
        marginBottom: '15px',
        fontSize: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
    },
    th: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        fontSize: '14px',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        fontSize: '14px',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        marginRight: '5px',
    },
    rejectButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
};

export default AdminDashboard;

=================================================*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const [pendingStudents, setPendingStudents] = useState([]);
    const [pendingProfessors, setPendingProfessors] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);

    useEffect(() => {
        const fetchPendingAccountsAndCourses = async () => {
            try {
                const userResponse = await axios.get('http://localhost:5295/api/Admin/pending-approvals');
                const courseResponse = await axios.get('http://localhost:5295/api/Courses/pending');

                // Filter users by role
                const students = userResponse.data.filter(user => user.role === 'Student');
                const professors = userResponse.data.filter(user => user.role === 'Professor');

                setPendingStudents(students);
                setPendingProfessors(professors);
                setPendingCourses(courseResponse.data);
            } catch (err) {
                console.error('Error fetching pending accounts or courses:', err);
            }
        };

        fetchPendingAccountsAndCourses();
    }, []);

    const handleApprove = async (id, type) => {
        try {
            if (type === 'Course') {
                await axios.put(`http://localhost:5295/api/Courses/approve/${id}`);
                setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
            } else {
                await axios.put(`http://localhost:5295/api/Admin/approve-user/${id}?approve=true`);
                if (type === 'Student') {
                    setPendingStudents(pendingStudents.filter(user => user.userId !== id));
                } else {
                    setPendingProfessors(pendingProfessors.filter(user => user.userId !== id));
                }
            }
        } catch (err) {
            console.error(`Error approving ${type}:`, err);
        }
    };

    const handleReject = async (id, type) => {
        try {
            if (type === 'Course') {
                await axios.put(`http://localhost:5295/api/Courses/reject/${id}`);
                setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
            } else {
                await axios.put(`http://localhost:5295/api/Admin/approve-user/${id}?approve=false`);
                if (type === 'Student') {
                    setPendingStudents(pendingStudents.filter(user => user.userId !== id));
                } else {
                    setPendingProfessors(pendingProfessors.filter(user => user.userId !== id));
                }
            }
        } catch (err) {
            console.error(`Error rejecting ${type}:`, err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h2 style={styles.header}>Admin Dashboard</h2>
                <p style={styles.welcome}>Welcome, {username}</p>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>

            <div style={styles.content}>
                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Students</h3>
                    {pendingStudents.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingStudents.map((user) => (
                                    <tr key={user.userId}>
                                        <td style={styles.td}>{user.name}</td>
                                        <td style={styles.td}>{user.email}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(user.userId, 'Student')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(user.userId, 'Student')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending students for approval.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Professors</h3>
                    {pendingProfessors.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingProfessors.map((user) => (
                                    <tr key={user.userId}>
                                        <td style={styles.td}>{user.name}</td>
                                        <td style={styles.td}>{user.email}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(user.userId, 'Professor')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(user.userId, 'Professor')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending professors for approval.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Courses</h3>
                    {pendingCourses.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Course Title</th>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingCourses.map((course) => (
                                    <tr key={course.courseId}>
                                        <td style={styles.td}>{course.title}</td>
                                        <td style={styles.td}>{course.description}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(course.courseId, 'Course')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(course.courseId, 'Course')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending courses for approval.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    header: {
        color: '#333',
        fontSize: '24px',
    },
    welcome: {
        fontSize: '16px',
        color: '#777',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
    },
    section: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    subHeader: {
        color: '#555',
        marginBottom: '15px',
        fontSize: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
    },
    th: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        fontSize: '14px',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        fontSize: '14px',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        marginRight: '5px',
    },
    rejectButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
};

export default AdminDashboard;

/* -- new coureses with IsApproved 0 is displayed but , p and s not acceped . rejeected 

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const [pendingStudents, setPendingStudents] = useState([]);
    const [pendingProfessors, setPendingProfessors] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);

    useEffect(() => {
        const fetchPendingAccounts = async () => {
            try {
                const studentResponse = await axios.get('http://localhost:5295/api/Students/pending');
                const professorResponse = await axios.get('http://localhost:5295/api/Professors/pending');
                setPendingStudents(studentResponse.data);
                setPendingProfessors(professorResponse.data);
            } catch (err) {
                console.error('Error fetching pending accounts:', err);
            }
        };

        const fetchPendingCourses = async () => {
            try {
                const courseResponse = await axios.get('http://localhost:5295/api/Courses');
                // Filter only courses that are not approved (IsApproved === 0)
                const unapprovedCourses = courseResponse.data.filter(course => course.isApproved === 0);
                setPendingCourses(unapprovedCourses);
            } catch (err) {
                console.error('Error fetching pending courses:', err);
            }
        };

        fetchPendingAccounts();
        fetchPendingCourses();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:5295/api/Courses/approve/${id}`);
            // Update the state to remove the approved course
            setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
        } catch (err) {
            console.error('Error approving course:', err);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.delete(`http://localhost:5295/api/Courses/${id}`);
            // Update the state to remove the rejected course
            setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
        } catch (err) {
            console.error('Error rejecting course:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h2 style={styles.header}>Admin Dashboard</h2>
                <p style={styles.welcome}>Welcome, {username}</p>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>

            <div style={styles.content}>
                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Students</h3>
                    {pendingStudents.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingStudents.map((student) => (
                                    <tr key={student.userId}>
                                        <td style={styles.td}>{student.name}</td>
                                        <td style={styles.td}>{student.email}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(student.userId, 'Students')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(student.userId, 'Students')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending student accounts for approval.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Professors</h3>
                    {pendingProfessors.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingProfessors.map((professor) => (
                                    <tr key={professor.userId}>
                                        <td style={styles.td}>{professor.name}</td>
                                        <td style={styles.td}>{professor.email}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(professor.userId, 'Professors')}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(professor.userId, 'Professors')}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending professor accounts for approval.</p>
                    )}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Manage Courses</h3>
                    {pendingCourses.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Course Title</th>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingCourses.map((course) => (
                                    <tr key={course.courseId}>
                                        <td style={styles.td}>{course.title}</td>
                                        <td style={styles.td}>{course.description}</td>
                                        <td style={styles.td}>
                                            <button style={styles.approveButton} onClick={() => handleApprove(course.courseId)}>Approve</button>
                                            <button style={styles.rejectButton} onClick={() => handleReject(course.courseId)}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pending courses for approval.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    header: {
        color: '#333',
        fontSize: '24px',
    },
    welcome: {
        fontSize: '16px',
        color: '#777',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
    },
    section: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    subHeader: {
        color: '#555',
        marginBottom: '15px',
        fontSize: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
    },
    th: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        fontSize: '14px',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        fontSize: '14px',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        marginRight: '5px',
    },
    rejectButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
};

export default AdminDashboard;
*/




/*


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [pendingCourses, setPendingCourses] = useState([]);

    useEffect(() => {
        const fetchPendingCourses = async () => {
            try {
                const courseResponse = await axios.get('http://localhost:5295/api/Courses');
                // Assuming the backend sends all courses, filter for IsApproved = 0
                const filteredCourses = courseResponse.data.filter(course => course.isApproved === 0);
                setPendingCourses(filteredCourses);
            } catch (err) {
                console.error('Error fetching pending courses:', err);
            }
        };

        fetchPendingCourses();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:5295/api/Courses/approve/${id}`);
            setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
        } catch (err) {
            console.error(`Error approving course:`, err);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:5295/api/Courses/reject/${id}`);
            setPendingCourses(pendingCourses.filter(course => course.courseId !== id));
        } catch (err) {
            console.error(`Error rejecting course:`, err);
        }
    };

    return (
        <div>
            <h3>Manage Courses</h3>
            {pendingCourses.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Course Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingCourses.map((course) => (
                            <tr key={course.courseId}>
                                <td>{course.title}</td>
                                <td>{course.description}</td>
                                <td>
                                    <button onClick={() => handleApprove(course.courseId)}>Approve</button>
                                    <button onClick={() => handleReject(course.courseId)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No pending courses for approval.</p>
            )}
        </div>
    );
};

export default AdminDashboard;
*/