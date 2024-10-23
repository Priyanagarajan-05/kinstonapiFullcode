/*
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5295/api/Auth/login', {
            email,
            password,
        });

        // Extract token, role, username, and userId from the response
        const { token, role, username, userId } = response.data; // Ensure userId is included

        // Store the token, username, userId, and email in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId); // Store userId
        localStorage.setItem('email', email); // Store email
        localStorage.setItem('role', role); // Store role

        // Navigate to different dashboards based on the role
        if (role === 'Admin') {
            navigate('/admin-dashboard');
        } else if (role === 'Professor') {
            navigate('/professor-dashboard');
        } else {
            navigate('/student-dashboard');
        }
    } catch (err) {
        setError('Invalid credentials or your account has not been approved.');
    }
};






    const handleCreateAccount = () => {
        navigate('/register');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.universityTitle}>KINSTON E LEARNING UNIVERSITY</h1>
            <div style={styles.card}>
                <h2 style={styles.heading}>Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                <div style={styles.createAccountContainer}>
                    <p>Don't have an account?</p>
                    <button onClick={handleCreateAccount} style={styles.createAccountButton}>
                        Create New Account
                    </button>
                </div>
            </div>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        padding: '20px',
    },
    universityTitle: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '12px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        marginTop: '10px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    createAccountContainer: {
        marginTop: '20px',
    },
    createAccountButton: {
        padding: '12px',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

// Styles remain unchanged
export default Login;


/*
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5295/api/Auth/login', {
                email,
                password,
            });

            // Extract token, role, username, and userId from the response
            const { token, role, username, userId } = response.data;

            // Store the token, username, userId, and email in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId); // Store userId
            localStorage.setItem('email', email); // Store email
            localStorage.setItem('role', role); // Store role

            // Navigate to different dashboards based on the role
            if (role === 'Admin') {
                navigate('/admin-dashboard');
            } else if (role === 'Professor') {
                navigate('/professor-dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } catch (err) {
            setError('Invalid credentials or your account has not been approved.');
        }
    };
*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css'; // For cross-browser consistency
import '../styles/login.css'; // Add your custom styles here

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5295/api/Auth/login', {
                email,
                password,
            });

            // Extract token, role, username, and userId from the response
            const { token, role, username, userId } = response.data; // Ensure userId is included

            // Store the token, username, userId, and email in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId); // Store userId
            localStorage.setItem('email', email); // Store email
            localStorage.setItem('role', role); // Store role

            // Navigate to different dashboards based on the role
            if (role === 'Admin') {
                navigate('/admin-dashboard');
            } else if (role === 'Professor') {
                navigate('/professor-dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } catch (err) {
            setError('Invalid credentials or your account has not been approved.');
        }
    };

    const handleCreateAccount = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="background-overlay"></div> {/* Semi-transparent overlay */}
            <div className="login-card">
                <h1 className="university-title">KINSTON E-LEARNING UNIVERSITY</h1>
                <h2 className="login-heading">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control custom-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control custom-input"
                    />
                    <button type="submit" className="btn btn-primary custom-btn">
                        Login
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="create-account-section">
                    <p>Don't have an account?</p>
                    <button onClick={handleCreateAccount} className="btn btn-success custom-btn">
                        Create New Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
