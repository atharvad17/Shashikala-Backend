// SalesAnalytics.jsx
import React from 'react';
import './ArtistDashboard.css';

const SalesAnalytics = ({ soldArtworks }) => {
    return (
        <div className="analytics-section">
            <div className="section-header">
                <h2>Sales Analytics</h2>
            </div>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {soldArtworks.map((artwork) => (
                        <tr key={artwork.id}>
                            <td>{artwork.itemName}</td>
                            <td>{artwork.quantity}</td>
                            <td>{artwork.date}</td>
                            <td>{artwork.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesAnalytics;
