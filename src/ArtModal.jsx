import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ArtModal = ({ isOpen, onClose, onSave, artItem = {} }) => {
    const [title, setTitle] = useState(artItem.title || '');
    const [type, setType] = useState(artItem.type || 'clothing');
    const [description, setDescription] = useState(artItem.description || '');
    const [price, setPrice] = useState(artItem.price || '');
    const [image, setImage] = useState(artItem.image || '');
    const [imagePreview, setImagePreview] = useState(artItem.image || '');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        const updatedItem = {
            title,
            type,
            description,
            price,
            image: imagePreview,
        };
        onSave(updatedItem);
        onClose(); // Close the modal after saving
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2>{artItem ? 'Edit Art' : 'Add New Art'}</h2>
                <div className="modal-fields">
                    <label>
                        Artwork Name:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Type:
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="clothing">Clothing</option>
                            <option value="digital-image">Digital Image</option>
                            <option value="hardcopy">Hardcopy</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    <label>
                        Image:
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </label>
                    {imagePreview && <img src={imagePreview} alt="Image Preview" />}
                    <button onClick={handleSubmit} className="save-button">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtModal;