import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import './ArtistHomePage.css';
import templateImage from './Images/homeScreen1.jpg'; // Replace with your image path
import Footer from './Footer';
import SubscriptionPage from './SubscriptionPage.jsx';


const ArtistHomePage = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up

    return (
        <>
            <div className="mainNav">
                <div className="image-container">
                    <img src={templateImage} alt="Artistic Background" />
                    <div className="overlay">
                        <h1>Welcome to the Artist Platform</h1>
                        <p>Showcase your talent, connect with fans, and manage your art catalog in one place.</p>
                        <div className="text-switch">
                            <span onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</span>
                            <span onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Sign Up</span>
                        </div>
                        <div className="form-container">
                            {isLogin ? <LoginForm /> : <SignUpForm />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Footer remains at the bottom */}
        </>
    );
};

// Forgot Password Dialog Component
const ForgotPasswordDialog = ({ isOpen, onClose, onSend }) => {
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Forgot Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                />
                <div className="modal-buttons">
                    <button
                        className="modal-next"
                        onClick={() => onSend(email)}
                    >
                        Send Reset Link
                    </button>
                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

// LoginForm Component
const LoginForm = () => {
    const navigate = useNavigate();
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted');
        navigate('/dashboard'); // Navigate to dashboard upon submission
    };

    const handleForgotPasswordSend = async (email) => {
        try {
            const response = await fetch('https://example.com/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setForgotPasswordMessage('A password reset link has been sent to your email.');
            } else {
                setForgotPasswordMessage('Failed to send reset link. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setForgotPasswordMessage('An error occurred. Please try again later.');
        } finally {
            setForgotPasswordOpen(false); // Close the dialog
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" required />
                </div>
                <button type="submit" className="form-submit-button">Login</button>
                <p
                    className="forgot-password"
                    onClick={() => setForgotPasswordOpen(true)}
                >
                    Forgot Password?
                </p>
                {forgotPasswordMessage && (
                    <p className="forgot-password-message">{forgotPasswordMessage}</p>
                )}
            </form>

            <ForgotPasswordDialog
                isOpen={forgotPasswordOpen}
                onClose={() => setForgotPasswordOpen(false)}
                onSend={handleForgotPasswordSend}
            />
        </>
    );
};

// SignUpForm Component
const SignUpForm = () => (
    <form className="form">
        <div className="form-group">
            <label>First Name</label>
            <input type="text" required />
        </div>
        <div className="form-group">
            <label>Last Name</label>
            <input type="text" required />
        </div>
        <div className="form-group">
            <label>Email</label>
            <input type="email" required />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" required />
        </div>
        <div className="form-group">
            <label>Phone</label>
            <input type="phone" required />
        </div>
        <Link to="/subscription" className="form-submit-button">Sign Up</Link>
    </form>
);

export default ArtistHomePage;




{/* 
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistHomePage.css';
import templateImage from './Images/homeScreen1.jpg';
import Footer from './Footer';

const ArtistHomePage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <div className="mainNav">
                <div className="image-container">
                    <img src={templateImage} alt="Artistic Background" />
                    <div className="overlay">
                        <h1>Welcome to the Artist Platform</h1>
                        <p>Showcase your talent, connect with fans, and manage your art catalog in one place.</p>
                        <div className="text-switch">
                            <span onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</span>
                            <span onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Sign Up</span>
                        </div>
                        <div className="form-container">
                            {isLogin ? <LoginForm /> : <SignUpForm />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

// Terms and Conditions Dialog
const TermsDialog = ({ isOpen, onClose, onAgree }) => {
    const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
    const termsRef = useRef(null);

    useEffect(() => {
        if (termsRef.current) {
            const handleScroll = () => {
                const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
                setIsScrolledToEnd(scrollTop + clientHeight >= scrollHeight - 10);
            };

            termsRef.current.addEventListener('scroll', handleScroll);

            return () => termsRef.current.removeEventListener('scroll', handleScroll);
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Terms and Conditions</h2>
                <div ref={termsRef} className="terms-content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia ligula eu magna 
                        dapibus, at ultricies tortor pharetra. Suspendisse potenti. Cras vel elit sit amet sapien 
                        efficitur interdum a nec magna. Proin et dui ut odio bibendum blandit.
                    </p>
                    <p>
                        Additional terms and conditions can go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
                <div className="modal-footer">
                    <label className={`checkbox-container ${isScrolledToEnd ? '' : 'disabled'}`}>
                        <input
                            type="checkbox"
                            disabled={!isScrolledToEnd}
                            onChange={(e) => {
                                if (e.target.checked) onAgree();
                            }}
                        />
                        I agree to the terms and conditions
                    </label>
                </div>
            </div>
        </div>
    );
};

// LoginForm Component
const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://example.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                setLoginMessage(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-submit-button">Login</button>
                {loginMessage && <p className="error-text">{loginMessage}</p>}
            </form>
        </>
    );
};

// SignUpForm Component
const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });
    const [verificationSent, setVerificationSent] = useState(false);
    const [signupMessage, setSignupMessage] = useState('');
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            setSignupMessage('Please agree to the terms and conditions.');
            return;
        }

        try {
            const response = await fetch('https://example.com/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setVerificationSent(true);
                setSignupMessage('A verification link has been sent to your email.');
            } else {
                setSignupMessage(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setSignupMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            {isTermsOpen && (
                <TermsDialog
                    isOpen={isTermsOpen}
                    onClose={() => setIsTermsOpen(false)}
                    onAgree={() => {
                        setAgreedToTerms(true);
                        setIsTermsOpen(false);
                    }}
                />
            )}
            {verificationSent ? (
                <div className="verification-message">
                    <p>{signupMessage}</p>
                </div>
            ) : (
                <form className="form" onSubmit={handleSignUpSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="terms-button"
                        onClick={() => setIsTermsOpen(true)}
                    >
                        View Terms and Conditions
                    </button>
                    <button type="submit" className="form-submit-button">
                        Sign Up
                    </button>
                    {signupMessage && <p className="signup-message">{signupMessage}</p>}
                </form>
            )}
        </>
    );
};

export default ArtistHomePage;

*/}