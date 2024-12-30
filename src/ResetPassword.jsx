import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isResetPassword = location.state?.isResetPassword; // Read the state passed from the artist profile

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState(''); // Only used if changing password
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleSave = (e) => {
        e.preventDefault(); // Prevent the default form submission

        setErrorMessage('');
        setSuccessMessage('');
        setIsLoading(true);

        // Validation checks
        if (!password || !confirmPassword) {
            setIsLoading(false);
            setErrorMessage('Both password fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setIsLoading(false);
            setErrorMessage('Passwords do not match. Please try again.');
            return;
        }

        if (!isResetPassword && !currentPassword) {
            setIsLoading(false);
            setErrorMessage('Current password is required for changing password.');
            return;
        }

        // Simulate password update success
        setTimeout(() => {
            setPopupMessage(`Password updated successfully!`);
            setIsLoading(false);

            // Wait for 2 seconds before navigating to another page
            setTimeout(() => {
                navigate('/artisthome');
            }, 2000);
        }, 1000); // Simulate a delay for saving the password
    };

    return (
        <main className="reset-password-main">
            <div className="reset-password-container">
                <h2>{isResetPassword ? 'Reset Password' : 'Change Password'}</h2>
                <form className="form" onSubmit={handleSave}>
                    {/* Current Password field, only for changing password */}
                    {!isResetPassword && (
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                placeholder="Enter your current password"
                            />
                        </div>
                    )}

                    {/* New Password field */}
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            placeholder="Enter new password"
                        />
                    </div>

                    {/* Confirm Password field */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Display error message */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {/* Display success message */}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <button
                        type="submit"
                        className="reset-save-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating password...' : 'Save'}
                    </button>
                </form>
            </div>
            {popupMessage && <div className="popup-message">{popupMessage}</div>}
        </main>
    );
};

export default ResetPassword;
