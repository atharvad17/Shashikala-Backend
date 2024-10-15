import React from 'react';
import './Footer.css'; // Add styles specific to the footer

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Shashikala Foundation. All rights reserved.</p>
            <div className="footerLinks">
                <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a> | <a href="#contact">Contact Us</a>
            </div>
        </footer>
    );
};

export default Footer;
