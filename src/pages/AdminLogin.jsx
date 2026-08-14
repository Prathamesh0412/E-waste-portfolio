import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      login(data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8 shadow-card rounded-card bg-surface border border-border">
        <div className="text-center mb-8">
          <p className="text-small font-heading font-bold text-primary tracking-widest uppercase mb-2">EW</p>
          <h1 className="text-section font-heading font-bold text-dark">Admin Login</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6 text-small" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-label text-secondary mb-2" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body"
              required
            />
          </div>
          <div>
            <label className="block text-label text-secondary mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
