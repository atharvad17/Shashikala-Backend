{/* 
import React, { useState } from 'react';
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

// LoginForm Component
const LoginForm = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: e.target[0].value,
                    password: e.target[1].value,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPopupMessage('Login successful!');
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/dashboard');
                }, 2000);
            } else {
                setPopupMessage(`Login failed: ${data.message}`);
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 2000);
            }
        } catch (error) {
            setPopupMessage('An error occurred. Please try again.');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        }
    };

    return (
        <>
            {showPopup && <Popup message={popupMessage} />}
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" required />
                </div>
                <button type="submit" className="form-submit-button">Login</button>
            </form>
        </>
    );
};

// SignUpForm Component
const SignUpForm = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.example.com/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: e.target[0].value,
                    lastName: e.target[1].value,
                    email: e.target[2].value,
                    password: e.target[3].value,
                    phone: e.target[4].value,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPopupMessage('Signup successful!');
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/template'); // navigate to template screen
                }, 2000);
            } else {
                setPopupMessage(`Signup failed: ${data.message}`);
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 2000);
            }
        } catch (error) {
            setPopupMessage('An error occurred. Please try again.');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        }
    };

    return (
        <>
            {showPopup && <Popup message={popupMessage} />}
            <form className="form" onSubmit={handleSignUp}>
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
                <button type="submit" className="form-submit-button">Sign Up</button>
            </form>
        </>
    );
};

// Popup Component for success/failure messages
const Popup = ({ message }) => (
    <div className="popup">
        <p>{message}</p>
    </div>
);

export default ArtistHomePage;
*/}


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ArtistHomePage.css';
import templateImage from './Images/homeScreen1.jpg'; // Replace with your image path
import Footer from './Footer';

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

// LoginForm Component with Forgot Password functionality
const LoginForm = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [email, setEmail] = useState('');
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted');
        navigate('/dashboard'); // Navigate to dashboard upon submission
    };

    const handleForgotPassword = async () => {
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
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input type="password" required />
            </div>
            <button type="submit" className="form-submit-button">Login</button>
            <p className="forgot-password" onClick={handleForgotPassword}>
                Forgot Password?
            </p>
            {forgotPasswordMessage && (
                <p className="forgot-password-message">{forgotPasswordMessage}</p>
            )}
        </form>
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
        <button type="submit" className="form-submit-button">Sign Up</button>
    </form>
);

export default ArtistHomePage;
