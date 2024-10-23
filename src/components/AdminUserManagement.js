import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5295/api/Users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleActivateUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5295/api/Auth/activate-user/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, isActive: true } : user
        )
      );
    } catch (err) {
      setError('Failed to activate user.');
    }
  };

  return (
    <div>
      <h2>Admin - User Management</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.name} ({user.role}) - {user.isActive ? 'Active' : 'Inactive'}
            {!user.isActive && (
              <button onClick={() => handleActivateUser(user.userId)}>
                Activate
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserManagement;
