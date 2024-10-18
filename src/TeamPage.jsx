import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './MissionPage.css';
import Footer from './Footer.jsx';

const TeamPage = () => {
    return (
        <>
            <div className="about-container">
                <div className="about-description">
                    <h1 align="center">Meet the Team</h1><br></br>
                </div>
                <div className="about-description">
                    <p>
                        Our team is dedicated to nurturing artistic talent and empowering youth through art. We have experienced professionals who guide and support young artists in their journey.
                    </p>

                    <p>
                        We believe in collaboration and community, fostering a supportive environment where creativity can thrive.
                    </p>

                    {/* Navigation Links */}
                    <div className="navigation-links">
                        <h3>Explore More:</h3>
                        <div className="links-container">
                            <Link to="/vision">Vision</Link>
                            <Link to="/mission">Mission</Link>
                            <Link to="/sponsors">Sponsors</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TeamPage;
