import React from 'react';
import './AboutPage.css'; // Import the CSS file for styling
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom'; // Import Link


const AboutPage = () => {
    return (
    <>
        <div className="about-container">
            {/* About Section */}
            <div className="about-details">
                    <h1 align="center">Our Vision</h1><br></br>
              

                {/* Description Section */}
                <div className="about-description">
                        <p>
                            Our vision is to spread joy and happiness through the power of visual art. We believe that art has the unique ability to uplift spirits, inspire creativity, and connect people.
                        </p>

                        <p>
                            By celebrating and promoting visual art in all its forms, we aim to create a world where art is accessible to everyone, and its beauty can be experienced and appreciated by all.
                        </p>
                    </div>


                    <h2 align="center">Explore More</h2><br></br>

                    <div className="navigation-links">
                        <div className="links-container">
                            <Link to="/mission">Mission</Link>
                            <Link to="/team">Team</Link>
                            <Link to="/sponsors">Sponsors</Link>
                        </div>
                    </div>

                {/* Contact Section */}
                
            </div>
        </div>
         <Footer />
    </>
    );
};

export default AboutPage;
