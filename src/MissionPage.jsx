import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './MissionPage.css';
import Footer from './Footer.jsx';

const MissionPage = () => {
    return (
        <>
            <div className="about-container">
                <div className="about-description">
                    <h1 align="center">Our Mission</h1><br></br>
                </div>

                <div className="about-description">
                    <p>
                        We empower underprivileged children by providing scholarships for education, guidance, and mentorship. Through workshops, we aim to promote visual art within our community.
                    </p>

                    <p>
                        By developing a global Artist Guide, we connect artists with educational opportunities, fostering education and nurturing talent. Our mission is to inspire, educate, and elevate the next generation of artists.
                    </p>

                    {/* Navigation Links */}
                    <div className="navigation-links">
                        <h3>Explore More:</h3>
                        <div className="links-container">
                            <Link to="/vision">Vision</Link>
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

export default MissionPage;
