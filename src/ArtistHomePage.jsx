import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistHomePage.css';
import Footer from './Footer';

// API endpoint configuration
const API_URL = 'https://shashikala-backend-gddy.onrender.com';


const ArtistHomePage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <div className="mainNav">
                <div className="image-container">
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

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginMessage('');

        try {
            const response = await fetch(`${API_URL}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    query: `
                       mutation ArtistLogin($email: String!, $password: String!) {
                           artistLogin(email: $email, password: $password) {
                               success
                               message
                               token
                               artist {
                                   email
                                   firstName
                                   lastName
                               }
                           }
                       }
                   `,
                    variables: { email, password }
                })
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            const { data } = result;

            if (data.artistLogin.success) {
                localStorage.setItem('artistToken', data.artistLogin.token);
                localStorage.setItem('artistData', JSON.stringify(data.artistLogin.artist));
                navigate('/artistprofile');
            } else {
                setLoginMessage(data.artistLogin.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginMessage(error.message || 'An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            <button
                type="submit"
                className="form-submit-button"
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <p className="forgot-password" onClick={() => setForgotPasswordOpen(true)}>
                Forgot Password?
            </p>
            {loginMessage && (
                <p className={`message ${loginMessage.includes('success') ? 'success' : 'error'}`}>
                    {loginMessage}
                </p>
            )}
            <ForgotPasswordDialog
                isOpen={forgotPasswordOpen}
                onClose={() => setForgotPasswordOpen(false)}
            />
        </form>
    );
};

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        city: '',
        state: '',
        country: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [signupMessage, setSignupMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'confirmPassword' || name === 'password') {
            setPasswordError('');
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSignupMessage('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        // Validate terms agreement
        if (!agreedToTerms) {
            setSignupMessage('Please agree to the terms and conditions.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    query: `
                       mutation ArtistSignup($input: ArtistSignupInput!) {
                           artistSignup(input: $input) {
                               success
                               message
                               artist {
                                   _id
                                   firstName
                                   lastName
                                   email
                                   phoneNumber
                                   city
                                   state
                                   country
                               }
                           }
                       }
                   `,
                    variables: {
                        input: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            password: formData.password,
                            phoneNumber: formData.phoneNumber,
                            city: formData.city,
                            state: formData.state,
                            country: formData.country
                        }
                    }
                })
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            const { data } = result;

            if (data.artistSignup.success) {
                setVerificationSent(true);
                setSignupMessage('Registration successful! Please check your email to verify your account.');
                navigate('/artistprofile');
            } else {
                setSignupMessage(data.artistSignup.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            setSignupMessage(error.message || 'An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
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
                            disabled={isLoading}
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
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
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    {passwordError && <p className="error-text">{passwordError}</p>}
                    <p className="terms-link" onClick={() => setIsTermsOpen(true)}>
                        View Terms and Conditions
                    </p>
                    <button
                        type="submit"
                        className="form-submit-button"
                        disabled={isLoading || !agreedToTerms}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    {signupMessage && (
                        <p className={`message ${signupMessage.includes('successful') ? 'success' : 'error'}`}>
                            {signupMessage}
                        </p>
                    )}
                </form>
            )}
        </>
    );
};

const ForgotPasswordDialog = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendResetLink = async () => {
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    query: `
                       mutation RequestPasswordReset($email: String!) {
                           requestPasswordReset(email: $email) {
                               success
                               message
                           }
                       }
                   `,
                    variables: { email }
                })
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            const { data } = result;

            if (data.requestPasswordReset.success) {
                setMessage('Reset link sent to your email');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setMessage(data.requestPasswordReset.message);
            }
        } catch (error) {
            console.error('Password reset error:', error);
            setMessage(error.message || 'An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

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
                    disabled={isLoading}
                />
                {message && (
                    <p className={`message ${message.includes('sent') ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}
                <div className="modal-buttons">
                    <button
                        className="modal-next"
                        onClick={handleSendResetLink}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    <button className="modal-close" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

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
            onAgree();
            setTimeout(() => {
                onClose();
            }, 2000);
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Donec lacinia ligula eu magna dapibus, at ultricies tortor pharetra.</p>
                    <p>Additional terms and conditions to ensure scrolling functionality.</p>
                    <p>Further legal information can be added here.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Donec lacinia ligula eu magna dapibus, at ultricies tortor pharetra.</p>
                    <p>Additional terms and conditions to ensure scrolling functionality.</p>
                    <p>Further legal information can be added here.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        city: '',
        state: '',
        country: ''
    });
    const [verificationSent, setVerificationSent] = useState(false);
    const [signupMessage, setSignupMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear password error when user types again
        if (name === 'confirmPassword' || name === 'password') {
            setPasswordError('');
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

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

            if (response.ok) {
                setVerificationSent(true);
            } else {
                const data = await response.json();
                setSignupMessage(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setSignupMessage('An error occurred. Please try again later.');
        }
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
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
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
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {passwordError && <p className="error-text">{passwordError}</p>}
                    <p className="terms-link" onClick={() => setIsTermsOpen(true)}>View Terms and Conditions</p>
                    <button type="submit" className="form-submit-button">Sign Up</button>
                    {signupMessage && <p className="error-text">{signupMessage}</p>}
                </form>
            )}
        </>
    );
};


export default ArtistHomePage;



*/}