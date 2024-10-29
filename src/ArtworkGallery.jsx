import React, { useState } from 'react';
import './ArtistDashboard.css';
import { FaPlus, FaTrash } from 'react-icons/fa';
import ArtworkEditModal from './ArtworkEditModal';

const ArtworkGallery = ({ isEditing }) => {
    const [artworks, setArtworks] = useState([
        { id: 1, title: "Sample Artwork", description: "Artwork Description", price: "$100", imageUrl: "https://via.placeholder.com/200" }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState(null);

    const addArtwork = () => {
        const newArtwork = { id: Date.now(), title: "New Artwork", description: "Description", price: "$150", imageUrl: "https://via.placeholder.com/200" };
        setArtworks([...artworks, newArtwork]);
    };

    const removeArtwork = (id) => setArtworks(artworks.filter((artwork) => artwork.id !== id));

    const openEditModal = (artwork) => {
        setCurrentArtwork(artwork);
        setIsModalOpen(true);
    };

    const handleSave = (updatedArtwork) => {
        setArtworks(artworks.map(artwork => (artwork.id === updatedArtwork.id ? updatedArtwork : artwork)));
        setIsModalOpen(false);
    };

    return (
        <div className="artwork-gallery">
            {artworks.map((artwork) => (
                <div key={artwork.id} className="artwork-card">
                    <img src={artwork.imageUrl} alt={artwork.title} className="artwork-image" />
                    <h3>{artwork.title}</h3>
                    <p>{artwork.description}</p>
                    <p className="artwork-price">{artwork.price}</p>
                    {isEditing && (
                        <FaTrash className="delete-icon" onClick={() => removeArtwork(artwork.id)} title="Delete Artwork" />
                    )}
                    <button className="learn-more-button" onClick={() => openEditModal(artwork)}>
                        Add/Update Artwork
                    </button>
                </div>
            ))}
            {isEditing && (
                <div className="artwork-card add-artwork-card" onClick={addArtwork}>
                    <FaPlus className="add-icon" title="Add New Artwork" />
                    <p>Add New Artwork</p>
                </div>
            )}
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
