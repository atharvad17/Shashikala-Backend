// ArtworkGallery.jsx
import React, { useState } from 'react';
import './ArtistDashboard.css';
import { FaPlus, FaTrash } from 'react-icons/fa';
import ArtworkEditModal from './ArtworkEditModal';

const ArtworkGallery = ({ isEditing, artworks, setArtworks }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState(null);

    const addArtwork = (type) => {
        const newArtwork = {
            id: Date.now(),
            type,
            title: 'New Artwork',
            description: 'Description',
            price: 0, // Default price as a numeric value
            imageUrl: 'https://via.placeholder.com/200',
        };
        setArtworks([...artworks, newArtwork]);
    };

    const removeArtwork = (id) => setArtworks(artworks.filter((artwork) => artwork.id !== id));

    const openEditModal = (artwork) => {
        setCurrentArtwork(artwork);
        setIsModalOpen(true);
    };

    const handleSave = (updatedArtwork) => {
        setArtworks(
            artworks.map((artwork) =>
                artwork.id === updatedArtwork.id ? updatedArtwork : artwork
            )
        );
        setIsModalOpen(false);
    };

    const groupedArtworks = artworks.reduce((acc, artwork) => {
        acc[artwork.type] = acc[artwork.type] ? [...acc[artwork.type], artwork] : [artwork];
        return acc;
    }, {});

    return (
        <div className="artwork-gallery">
            {Object.keys(groupedArtworks).map((type) => (
                <div key={type} className="artwork-group">
                    <h3>{type}</h3>
                    <div className="artwork-list">
                        {groupedArtworks[type].map((artwork) => (
                            <div key={artwork.id} className="artwork-card">
                                <img src={artwork.imageUrl} alt={artwork.title} className="artwork-image" />
                                <h3>{artwork.title}</h3>
                                <p>{artwork.description}</p>
                                <p className="artwork-price">${artwork.price}</p> {/* Display price correctly */}
                                {isEditing && (
                                    <FaTrash
                                        className="delete-icon"
                                        onClick={() => removeArtwork(artwork.id)}
                                        title="Delete Artwork"
                                    />
                                )}
                                <button
                                    className="learn-more-button"
                                    onClick={() => openEditModal(artwork)}
                                >
                                    Add/Update Artwork
                                </button>
                            </div>
                        ))}
                        {isEditing && (
                            <div className="artwork-card add-artwork-card" onClick={() => addArtwork(type)}>
                                <FaPlus className="add-icon" title="Add New Artwork" />
                                <p>Add New {type}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <ArtworkEditModal
                    artwork={currentArtwork}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ArtworkGallery;
