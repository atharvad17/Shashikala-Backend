import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistDashboard.css';
import profileImage from './Images/homeScreen1.jpg';
import ArtworkGallery from './ArtworkGallery';
import SalesAnalytics from './SalesAnalytics';
import { FaPen } from 'react-icons/fa';
import Footer from './Footer';

const ArtistDashboard = () => {
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [isEditingArtwork, setIsEditingArtwork] = useState(false);
    const [aboutText, setAboutText] = useState("Hello, I'm [Artist's Name]! I'm a visual artist specializing in contemporary artwork. Here, I showcase some of my work for sale. Take a look and reach out if you’re interested!");
    const [profileImg, setProfileImg] = useState(profileImage);
    const [artworks, setArtworks] = useState([
        { id: 1, type: 'Clothing', title: 'Shirt Design', description: 'Unique shirt artwork', price: 50, imageUrl: 'https://via.placeholder.com/200' },
        { id: 2, type: 'Digital Picture', title: 'Digital Landscape', description: 'High-quality digital landscape', price: 120, imageUrl: 'https://via.placeholder.com/200' },
        { id: 3, type: 'Hard Copy', title: 'Printed Portrait', description: 'Framed portrait print', price: 200, imageUrl: 'https://via.placeholder.com/200' },
    ]);

    // Sample data for sold artworks
    const [soldArtworks] = useState([
        { id: 1, itemName: 'Sunset Canvas', quantity: 1, date: '2024-10-01', totalPrice: '$200' },
        { id: 2, itemName: 'Abstract Sculpture', quantity: 2, date: '2024-10-03', totalPrice: '$450' },
        { id: 3, itemName: 'Portrait Series', quantity: 1, date: '2024-10-07', totalPrice: '$350' },
    ]);

    const navigate = useNavigate();

    const toggleEditingAbout = () => setIsEditingAbout(!isEditingAbout);
    const toggleEditingArtwork = () => setIsEditingArtwork(!isEditingArtwork);

    const handleAboutChange = (e) => setAboutText(e.target.value);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImg(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => setProfileImg(profileImage); // Reset to default image

    const saveAboutSection = () => {
        setIsEditingAbout(false);
        console.log("About section saved:", { aboutText, profileImg });
    };

    const saveArtworkSection = () => {
        setIsEditingArtwork(false);
        console.log("Artwork section saved:", artworks);
    };

    const publishPublicPage = () => {
        navigate('/artist-public', {
            state: {
                aboutText,
                profileImg,
                artworks,
            },
        });
    };

    return (
        <>
            <div className="dashboard-container">
                {/* Profile Section */}
                <div className="profile-section">
                    <div className="section-header">
                        <h2>About Me</h2>
                        <FaPen className="edit-icon" onClick={toggleEditingAbout} />
                    </div>
                    <div className="profile-content">
                        <div className="profile-image-container">
                            <img src={profileImg} alt="Artist Profile" className="profile-image" />
                            {isEditingAbout && (
                                <div className="image-controls">
                                    <label className="upload-button">
                                        Upload
                                        <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
                                    </label>
                                    <button className="delete-button" onClick={handleImageDelete}>Delete</button>
                                </div>
                            )}
                        </div>
                        {isEditingAbout ? (
                            <textarea
                                value={aboutText}
                                onChange={handleAboutChange}
                                className="about-textarea"
                                style={{ height: '150px', width: '100%' }}
                            />
                        ) : (
                            <p>{aboutText}</p>
                        )}
                        {isEditingAbout && (
                            <button className="save-button" onClick={saveAboutSection}>Save</button>
                        )}
                    </div>
                </div>

                {/* Artwork Section */}
                <div className="artwork-section">
                    <div className="section-header">
                        <h2>My Artwork</h2>
                        <FaPen className="edit-icon" onClick={toggleEditingArtwork} />
                    </div>
                    <div className="artwork-gallery">
                        <ArtworkGallery isEditing={isEditingArtwork} artworks={artworks} setArtworks={setArtworks} />
                        {isEditingArtwork && (
                            <button className="save-button artwork-save-button" onClick={saveArtworkSection}>
                                Save
                            </button>
                        )}
                    </div>
                </div>


                {/* Analytics Section */}
                <SalesAnalytics soldArtworks={soldArtworks} />

                <div className="publish-section">
                    <button onClick={publishPublicPage} className="publish-button">Publish Now</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ArtistDashboard;
