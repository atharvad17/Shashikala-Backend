import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './TeamPage.css'; // Import the separate CSS file for styling
import Footer from './Footer.jsx';
import image1 from './Images/homeScreen1.jpg'; // Import the image


// Modal configuration
Modal.setAppElement('#root');

const TeamPage = () => {
    // Team members data
    const teamMembers = [
        {
            id: 1,
            name: 'John Doe',
            designation: 'Senior Artist',
            image: image1,
            description: 'John is an experienced artist and mentor with 10 years of experience in visual arts.',
        },
        {
            id: 2,
            name: 'Jane Smith',
            designation: 'Art Educator',
            image: image1,
            description: 'Jane specializes in art education and has a passion for teaching young artists.',
        },
        {
            id: 3,
            name: 'Alex Johnson',
            designation: 'Digital Artist',
            image: image1,
            description: 'Alex is a digital artist focused on new media and contemporary art styles.',
        },
        {
            id: 4,
            name: 'Alex Johnson',
            designation: 'Digital Artist',
            image: image1,
            description: 'Alex is a digital artist focused on new media and contemporary art styles.',
        },
        {
            id: 5,
            name: 'Alex Johnson',
            designation: 'Digital Artist',
            image: image1,
            description: 'Alex is a digital artist focused on new media and contemporary art styles.',
        },
        {
            id: 6,
            name: 'Alex Johnson',
            designation: 'Digital Artist',
            image: image1,
            description: 'Alex is a digital artist focused on new media and contemporary art styles.',
        },
        // Add more members as needed
    ];

    const [selectedMember, setSelectedMember] = useState(null);

    // Function to open the modal for a selected member
    const openModal = (member) => {
        setSelectedMember(member);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedMember(null);
    };

    return (
        <>
            <div className="team-container">
                <div className="about-description">
                    <h1 align="center">Meet the Team</h1><br></br>
                </div>

                {/* Team Grid */}
                <div className="team-grid">
                    {teamMembers.map((member) => (
                        <div className="team-card" key={member.id} onClick={() => openModal(member)}>
                            <div
                                className="team-image"
                                style={{ backgroundImage: `url(${member.image})` }}
                            ></div>
                            <h3>{member.name}</h3>
                            <p className="designation">{member.designation}</p>
                        </div>
                    ))}
                </div>

                {/* Modal for displaying team member details */}
                {selectedMember && (
                    <Modal
                        isOpen={!!selectedMember}
                        onRequestClose={closeModal}
                        className="team-modal"
                        overlayClassName="team-modal-overlay"
                    >
                        <img src={selectedMember.image} alt={selectedMember.name} className="team-modal-image" />
                        <h2>{selectedMember.name}</h2>
                        <p className="team-modal-designation">{selectedMember.designation}</p>
                        <p>{selectedMember.description}</p>
                        <button onClick={closeModal} className="team-close-button">Close</button>
                    </Modal>
                )}

                <div className="navigation-links">
                    <h3>Explore More:</h3>
                    <div className="links-container">
                        <Link to="/vision">Vision</Link>
                        <Link to="/mission">Mission</Link>
                        <Link to="/sponsors">Sponsors</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TeamPage;
