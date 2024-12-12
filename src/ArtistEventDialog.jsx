import React, { useState } from 'react';

const ArtistEventDialog = ({ event = {}, onSave, onClose, mode }) => {
    const [title, setTitle] = useState(event.title || '');
    const [date, setDate] = useState(event.date || '2024-12-15');
    const [location, setLocation] = useState(event.location || 'Online');
    const [time, setTime] = useState(event.time || '18:00');
    const [price, setPrice] = useState(event.price || '0.00');

    const handleSave = () => {
        if (title && date && location && time) {
            onSave({
                title,
                date,
                location,
                time,
                price: price !== '' ? price : '0.00', // Ensure price is either the input value or '0.00'
            });
        } else {
            alert('Please fill in all required fields.');
        }
    };


    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <h3>{mode === 'create' ? 'Create Event' : 'Edit Event'}</h3>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="dialog-input"
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="dialog-input"
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="dialog-input"
                    />
                </label>
                <label>
                    Time:
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="dialog-input"
                    />
                </label>
                <label>
                    Price ($):
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="dialog-input"
                    />
                </label>
                <div className="dialog-buttons">
                    <button onClick={handleSave} className="dialog-save-button">
                        Save
                    </button>
                    <button onClick={onClose} className="dialog-cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ArtistEventDialog;
