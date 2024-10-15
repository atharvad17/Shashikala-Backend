import React from 'react';
import './AboutPage.css'; // Import the CSS file for styling
import Footer from './Footer.jsx';

const AboutPage = () => {
    return (
    <>
        <div className="about-container">
            {/* About Section */}
            <div className="about-details">
                <h1 align = "center">About Us</h1><br></br>
                <p>
                        Welcome to Our Company! Shashikala Foundation is Georgia registered non-profit 501(3)(c) organization.
                </p>

                {/* Description Section */}
                <div className="about-description">
                    <h2>Our Mission</h2>
                    <p>
                            - Identify underprivileged kids who are talented in the field of art and provide them scholarships in the form of education, guidance, and mentorship <br />
                            - Conduct Art workshops for young generation to get opportunity to explore various visual art forms <br />
                            - Celebrate cultural festivals using Art
                    </p>

                    <h2>Our Vision</h2>
                    <p>
                        Spread Happiness through Visual Art 
                    </p>
                </div>

                {/* Contact Section */}
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <ul>
                        <li>Email: info@company.com</li>
                        <li>Phone: +1 234 567 8900</li>
                        <li>Location: 123 Main Street, City, Country</li>
                    </ul>
                </div>
            </div>
        </div>
         <Footer />
    </>
    );
};

export default AboutPage;
