import React from 'react';
import { useLocation } from 'react-router-dom';
import './ArtistPublicPage.css';
import Footer from './Footer';

const ArtistPublicPage = () => {
    const location = useLocation();
    const { aboutText, profileImg, artworks } = location.state || {};

    return (
        <>
            {/* Header Section */}
            <header className="public-header">
                <h1>Welcome to My Gallery</h1>
                <p>Explore the artwork and creations that define my journey.</p>
            </header>

            {/* About Me Section */}
            <section className="about-section">
                <div className="about-container">
                    <div className="profile-image-container">
                        <img src={profileImg} alt="Artist" className="profile-image" />
                    </div>
                    <div className="about-text-container">
                        <h2>About Me</h2>
                        <p>{aboutText}</p>
                    </div>
                </div>
            </section>

            {/* Artworks Section */}
            <section className="artworks-section">
                <h2>My Artworks</h2>
                <div className="artworks-gallery">
                    {artworks && artworks.length > 0 ? (
                        artworks.map((artwork) => (
                            <div key={artwork.id} className="artwork-card">
                                <img
                                    src={artwork.imageUrl}
                                    alt={artwork.title}
                                    className="artwork-image"
                                />
                                <div className="artwork-details">
                                    <h3>{artwork.title}</h3>
                                    <p>{artwork.description}</p>
                                    <p className="artwork-price">${artwork.price}</p>
                                    <button className="customize-button">Customize</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No artworks available at the moment.</p>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ArtistPublicPage;
