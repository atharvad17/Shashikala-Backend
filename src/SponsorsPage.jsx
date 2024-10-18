import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './MissionPage.css';
import Footer from './Footer.jsx';

const SponsorsPage = () => {
    return (
        <>
            <div className="about-container">
                <div className="about-description">
                    <h1 align="center">Our Sponsors</h1><br></br>
                </div>
                <div className="about-description">
                    <p>
                        We are grateful to our sponsors for their generous support, which allows us to continue our mission of empowering young artists and promoting visual art.
                    </p>

                    <p>
                        Together, we create opportunities for children to explore their creativity and develop their artistic skills.
                    </p>

                    {/* Navigation Links */}
                    <div className="navigation-links">
                        <h3>Explore More:</h3>
                        <div className="links-container">
                            <Link to="/vision">Vision</Link>
                            <Link to="/mission">Mission</Link>
                            <Link to="/team">Team</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SponsorsPage;
