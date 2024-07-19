/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const loginData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'An error occurred during login.');
      } else {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(`Error during login: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getCsrfToken = () => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken'))
      ?.split('=')[1];
    return cookieValue || '';
  };

  // For fade-in animation
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className={`flex flex-col md:flex-row w-full max-w-5xl p-4 md:p-8 bg-white rounded-[30px] shadow-2xl transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Left Side */}
        <div className="hidden md:flex flex-1 flex-col justify-between bg-gradient-to-r from-orange-600 to-orange-800 rounded-[30px] p-6 md:p-12 relative overflow-hidden">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">Retail Samadhan</h1>
            <p className="text-lg text-white">Simplify your Retail management.</p>
          </div>
          <div className="ripple-container">
            <div className="ripple"></div>
          </div>
          <div className="animation-container">
            <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
              <source src="animation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-12">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">Welcome Back</h2>
          <p className="mb-6 text-gray-600">Please login to your account</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-gray-500" />
              </span>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-orange-500">Forgot password?</a>
            </div>
            <button type="submit" className="w-full py-2 text-white bg-gradient-to-r from-orange-500 to-orange-800 rounded-lg transition-transform transform hover:scale-105" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">Or Login with</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center justify-center w-1/2 py-2 border rounded-lg bg-red-400 text-white">
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2" />
              Google
            </button>
            <button className="flex items-center justify-center w-1/2 py-2 border rounded-lg bg-blue-500 text-white">
              <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5 mr-2" />
              Facebook
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/signup" className="text-orange-500">Sign Up</a>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes ripple {
            0% {
              transform: scale(0.8);
              opacity: 1;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }

          .ripple-container {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 300px;
            height: 300px;
            margin-left: -150px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            perspective: 1000px;
          }

          .ripple {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
            animation: ripple 2s infinite;
          }

          .animation-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }

          .animation-container video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .flex button {
            color: white;
          }

          .flex button svg {
            width: 20px;
            height: 20px;
            margin-right: 8px;
          }

          .flex button:nth-child(odd) {
            background-color: #FF5555;
          }

          .flex button:nth-child(even) {
            background-color: #3b5998;
          }
        `}
      </style>
    </div>
  );
}

export default LoginPage;
