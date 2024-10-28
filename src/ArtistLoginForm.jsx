import React, { useState } from 'react';
import './ArtistLoginForm.css'; // Importing the CSS file
import Footer from './Footer';


const ArtistLoginForm = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted', loginData);
        // You can handle login logic here
    };

    return (
        <>
        <div className="login-form-container">
            <div className="login-form-card">
                <h2 className="login-form-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-submit-button">Login</button>
                </form>
            </div>
            </div>
        <Footer />
        </>
    );
};

export default ArtistLoginForm;
