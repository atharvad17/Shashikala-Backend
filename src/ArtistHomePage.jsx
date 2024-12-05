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

// Forgot Password Dialog
const ForgotPasswordDialog = ({ isOpen, onClose, onSend }) => {
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="forgot-password-dialog modal">
                <h2>Forgot Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                />
                <div className="modal-buttons">
                    <button className="modal-next" onClick={() => onSend(email)}>Send Reset Link</button>
                    <button className="modal-close" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

// Terms and Conditions Dialog
const TermsDialog = ({ isOpen, onClose, onAgree }) => {
    const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const termsRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
            setIsScrolledToEnd(scrollTop + clientHeight >= scrollHeight - 10);
        };

        if (termsRef.current) {
            termsRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (termsRef.current) {
                termsRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleCheckboxChange = () => {
        if (isScrolledToEnd) {
            setCheckboxChecked(true);
            setTimeout(() => {
                onAgree();
                onClose();
            }, 2000); // Close dialog after 2 seconds
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="terms-modal">
                <h2>Terms and Conditions</h2>
                <div ref={termsRef} className="terms-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Donec lacinia ligula eu magna dapibus, at ultricies tortor pharetra.</p>
                    <p>Additional terms and conditions to ensure scrolling functionality.</p>
                    <p>Further legal information can be added here.</p>
                </div>
                <div className="terms-footer">
                    <label className={`terms-checkbox-container ${isScrolledToEnd ? '' : 'disabled'}`}>
                        <input
                            type="checkbox"
                            disabled={!isScrolledToEnd}
                            checked={checkboxChecked}
                            onChange={handleCheckboxChange}
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
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://example.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) navigate('/dashboard');
            else setLoginMessage(data.message || 'Login failed. Please try again.');
        } catch {
            setLoginMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="form-submit-button">Login</button>
                <p className="forgot-password" onClick={() => setForgotPasswordOpen(true)}>Forgot Password?</p>
                {loginMessage && <p className="error-text">{loginMessage}</p>}
            </form>
            <ForgotPasswordDialog
                isOpen={forgotPasswordOpen}
                onClose={() => setForgotPasswordOpen(false)}
                onSend={async (email) => {
                    await fetch('https://example.com/api/forgot-password', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email }),
                    });
                    setForgotPasswordOpen(false);
                }}
            />
        </>
    );
};

// SignUpForm Component
const SignUpForm = () => {
    const [formData, setFormData] = useState({ email: '', firstName: '', lastName: '', password: '' });
    const [verificationSent, setVerificationSent] = useState(false);
    const [signupMessage, setSignupMessage] = useState('');
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            setSignupMessage('Please agree to the terms and conditions.');
            return;
        }
        const response = await fetch('https://example.com/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (response.ok) setVerificationSent(true);
    };

    return (
        <>
            {isTermsOpen && (
                <TermsDialog
                    isOpen={isTermsOpen}
                    onClose={() => setIsTermsOpen(false)}
                    onAgree={() => setAgreedToTerms(true)}
                />
            )}
            {verificationSent ? (
                <div className="verification-message">
                    <p>A verification link has been sent to your email.</p>
                </div>
            ) : (
                <form className="form" onSubmit={handleSignUpSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    </div>
                    <p className="terms-link" onClick={() => setIsTermsOpen(true)}>View Terms and Conditions</p>
                    <button type="submit" className="form-submit-button">Sign Up</button>
                    {signupMessage && <p className="error-text">{signupMessage}</p>}
                </form>
            )}
        </>
    );
};

export default ArtistHomePage;
