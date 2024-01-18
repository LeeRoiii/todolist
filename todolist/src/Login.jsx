// Login.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function AuthForm({ setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Update local storage with rememberMe state
    localStorage.setItem('rememberMe', rememberMe.toString());
  }, [rememberMe]);

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleAuth = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      setError(''); // Clear any previous errors
  
      const endpoint = isRegisterMode
        ? 'http://localhost:3001/auth/register'
        : 'http://localhost:3001/auth/login';
  
      const result = await axios.post(endpoint, {
        username,
        password,
      });
  
      if (isRegisterMode) {
        // handle registration logic
      } else {
        if (result.data.message === 'Login successful') {
          // Set authenticated to true
          setAuthenticated(true);
      
          // Redirect to the home page
          console.log('Redirecting to /home');
          navigate('/home');
        } else {
          setError('Invalid username or password. Please try again.');
  
          // Show toast for incorrect credentials
          if (result.status === 401) {
            toast.error('Incorrect username or password. Please try again.');
          }
        }
      }
  
      // Only save login data if it's a login and rememberMe is checked
      if (!isRegisterMode && rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Show toast for general error
      toast.error('Invalid Credentials');
    }
  };

  const handleToggleMode = () => {
    setRegisterMode(!isRegisterMode);
    setError('');
  };

  return (
    <div className="login-container">
      <h2 className="title">{isRegisterMode ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-container">
          <div className="input-with-icon">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="icon-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
        </div>

        {!isRegisterMode && (
          <div className="remember-me-container">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe" className="remember-me-label">
              Remember Me
            </label>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? <div className="spinner"></div> : isRegisterMode ? 'Register' : 'Login'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p onClick={handleToggleMode} className="toggle-mode">
        {isRegisterMode ? 'Already have an account? Login here.' : "Don't have an account? Register here."}
      </p>

      <ToastContainer />
    </div>
  );
}

export default AuthForm;
