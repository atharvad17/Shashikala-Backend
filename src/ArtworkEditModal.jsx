import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ArtworkEditModal = ({ artwork, onSave, onClose }) => {
    const [title, setTitle] = useState(artwork.title);
    const [description, setDescription] = useState(artwork.description);
    const [price, setPrice] = useState(artwork.price);
    const [image, setImage] = useState(artwork.imageUrl);
    const [imageFile, setImageFile] = useState(null);
    const [artworkType, setArtworkType] = useState(artwork.type || '');
    const [customFields, setCustomFields] = useState(artwork.customFields || []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const updatedArtwork = {
            ...artwork,
            title,
            description,
            price,
            imageUrl: image,
            type: artworkType,
            customFields,
        };
        onSave(updatedArtwork);
    };

    const handleCustomFieldChange = (index, field, value) => {
        const updatedFields = [...customFields];
        updatedFields[index][field] = value;
        setCustomFields(updatedFields);
    };

    const addCustomField = () => {
        setCustomFields([...customFields, { label: '', value: '' }]);
    };

    const removeCustomField = (index) => {
        const updatedFields = customFields.filter((_, i) => i !== index);
        setCustomFields(updatedFields);
    };

    const handleArtworkTypeChange = (type) => {
        setArtworkType(type);
        setCustomFields([]);
    };

    const renderAdditionalFields = () => {
        let additionalFields = [];

        switch (artworkType) {
            case 'Clothing':
                additionalFields = [
                    { label: 'Color', placeholder: 'Color (e.g., Red)' },
                    { label: 'Size', placeholder: 'Size (e.g., M, L, XL)' },
                ];
                break;
            case 'Digital Picture':
                additionalFields = [
                    { label: 'Image Link', placeholder: 'URL of Digital Image' },
                ];
                break;
            case 'Hard Copy':
                additionalFields = [
                    { label: 'Size', placeholder: 'Dimensions (e.g., 8x10 inches)' },
                ];
                break;
            default:
                break;
        }

        return additionalFields.map((field, index) => (
            <div key={index}>
                <label>{field.label}:</label>
                <input
                    type="text"
                    placeholder={field.placeholder}
                    value={customFields.find((f) => f.label === field.label)?.value || ''}
                    onChange={(e) => {
                        const newFields = customFields.filter((f) => f.label !== field.label);
                        setCustomFields([...newFields, { label: field.label, value: e.target.value }]);
                    }}
                />
            </div>
        ));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2>Edit Artwork</h2>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>Type of Artwork:</label>
                    <select
                        value={artworkType}
                        onChange={(e) => handleArtworkTypeChange(e.target.value)}
                    >
                        <option value="" disabled>Select Art Type</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Digital Picture">Digital Picture</option>
                        <option value="Hard Copy">Hard Copy</option>
                    </select>
                </div>

                {/* Render Dynamic Fields Based on Artwork Type */}
                {renderAdditionalFields()}

                {/* Custom Fields */}
                <h3>Additional Information</h3>
                {customFields.map((field, index) => (
                    <div key={index} className="custom-field">
                        <input
                            type="text"
                            placeholder="Field Name"
                            value={field.label}
                            onChange={(e) => handleCustomFieldChange(index, 'label', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Field Value"
                            value={field.value}
                            onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                        />
                        <button type="button" onClick={() => removeCustomField(index)}>
                            <FaTimes />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addCustomField} className="dialog-add-field-button">
                    Add Custom Field
                </button>

                <div>
                    <label>Select Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
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
