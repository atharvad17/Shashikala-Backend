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

// LoginForm Component
const LoginForm = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted');
        navigate('/dashboard'); // Navigate to dashboard upon submission
    };

    return (
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
