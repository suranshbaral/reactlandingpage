/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import axiosInstance from '../service/axiosInstance';

function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirm_password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/signup/', formData);

            if (response.status === 200 || response.status === 201) {
                navigate('/dashboard');  // Redirect to dashboard upon successful signup
            } else {
                console.error('Signup failed', response);
                setError('Signup failed. Please try again.');
            }
        } catch (err) {
            console.error('Signup failed', err);
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
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
                </div>

                {/* Right Side */}
                <div className="flex-1 flex flex-col justify-center p-6 md:p-12">
                    <h2 className="text-3xl font-bold mb-4 text-orange-500">Create Account</h2>
                    <p className="mb-6 text-gray-600">Please sign up to create your account</p>
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.username}
                                onChange={handleChange}
                                required
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
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-gray-500" />
                            </span>
                        </div>
                        <div>
                            <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full py-2 text-white bg-gradient-to-r from-orange-500 to-orange-800 rounded-lg transition-transform transform hover:scale-105" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300" />
                        <span className="mx-4 text-gray-500">Or Sign up with</span>
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
                        <span className="text-gray-600">Already have an account? </span>
                        <a href="/login" className="text-orange-500">Sign In</a>
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
                `}
            </style>
        </div>
    );
}

export default SignupPage;
