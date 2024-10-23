import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const isActive = role === 'Admin' ? true : false;

    try {
      await axios.post('http://localhost:5295/api/Auth/register', {
        name: name,
        email: email,
        passwordHash: passwordHash,
        role: role,
        isActive: isActive,
      });

      setSuccess('Registration successful! Awaiting admin approval.');
      setError('');

      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Status:', err.response.status);
        console.error('Headers:', err.response.headers);

        const errorMessages = err.response.data.errors 
          ? Object.values(err.response.data.errors).flat().join(' ') 
          : 'Registration failed. Please try again.';
        setError(errorMessages);
      } else {
        setError('Network error occurred. Please try again later.');
      }
      setSuccess('');
    }
  };

  // Inline CSS styling
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      position: 'relative', // Position for background image
      zIndex: 1, // Ensure form is above background
    },
    inputField: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#FF9800', // Orange color
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    errorText: {
      color: 'red',
      fontWeight: 'bold',
      marginTop: '10px',
    },
    successText: {
      color: 'green',
      fontWeight: 'bold',
      marginTop: '10px',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: '', // Update the path to your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 0, // Background should be behind the form
    },
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={styles.backgroundImage}></div>
      <div style={styles.container}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.inputField}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            required
            style={styles.inputField}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.inputField}
          >
            <option value="Student">Student</option>
            <option value="Professor">Professor</option>
          </select>
          {error && <p style={styles.errorText}>{error}</p>}
          {success && <p style={styles.successText}>{success}</p>}
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
