// ArtworkEditModal.jsx
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ArtworkEditModal = ({ artwork, onSave, onClose }) => {
    const [title, setTitle] = useState(artwork.title);
    const [description, setDescription] = useState(artwork.description);
    const [price, setPrice] = useState(artwork.price);
    const [image, setImage] = useState(artwork.imageUrl);
    const [imageFile, setImageFile] = useState(null); // State for the uploaded image

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the preview image
                setImageFile(file); // Store the image file for saving
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleSave = () => {
        const updatedArtwork = {
            ...artwork,
            title,
            description,
            price,
            imageUrl: image,
        };
        onSave(updatedArtwork); // Pass the updated artwork back
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2>Edit Artwork</h2>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Select Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                {image && (
                    <div className="image-preview">
                        <img src={image} alt="Preview" className="image-preview-img" />
                    </div>
                )}
                <button className="dialog-save-button" onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ArtworkEditModal;
