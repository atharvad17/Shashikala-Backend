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

// LoginForm Component with Forgot Password
const LoginForm = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

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

    const handleForgotPasswordSend = async (email) => {
        try {
            const response = await fetch('https://api.example.com/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setPopupMessage('A password reset link has been sent to your email.');
            } else {
                setPopupMessage('Failed to send reset link. Please try again.');
            }
        } catch (error) {
            setPopupMessage('An error occurred. Please try again later.');
        } finally {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
            setForgotPasswordOpen(false); // Close the dialog
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
                <p
                    className="forgot-password"
                    onClick={() => setForgotPasswordOpen(true)}
                >
                    Forgot Password?
                </p>
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
                    navigate('/subscriptions'); // Navigate to the subscription page
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
