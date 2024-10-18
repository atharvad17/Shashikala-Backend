import React from 'react';
import './VisionPage.css'; // Import the CSS file for styling
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';

const VisionPage = () => {
    return (
        <>
            <div className="about-container">
                {/* Vision Section */}
                <div className="about-description">
                    <h1 align="center">Our Vision</h1><br></br>


                    {/* Description Section */}
                    <div className="about-description">
                        <h2>What We Aim For</h2>
                        <p>
                            Our vision is to spread joy and happiness through the power of visual art. We believe that art has the unique ability to uplift spirits, inspire creativity, and connect people.
                        </p>

                        <p>
                            By celebrating and promoting visual art in all its forms, we aim to create a world where art is accessible to everyone, and its beauty can be experienced and appreciated by all.
                        </p>
                    </div>
                    <div className="navigation-links">
                        <h3>Explore More:</h3>
                        <div className="links-container">
                            <Link to="/mission">Mission</Link>
                            <Link to="/team">Team</Link>
                            <Link to="/sponsors">Sponsors</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default VisionPage;
