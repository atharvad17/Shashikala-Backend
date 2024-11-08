// ArtistPublicPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ArtistDashboard.css';
import Footer from './Footer';

const ArtistPublicPage = () => {
    const location = useLocation();
    const { aboutText, profileImg, artworks } = location.state || {};
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const addToCart = (artwork) => {
        const existingItem = cart.find((item) => item.id === artwork.id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...artwork, quantity: 1 }]);
        }
    };

    const handleRemoveFromCart = (artworkId) => {
        setCart(cart.filter((item) => item.id !== artworkId));
    };

    const handleUpdateQuantity = (artworkId, quantity) => {
        setCart(
            cart.map((item) =>
                item.id === artworkId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const handleCheckout = () => {
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        navigate('/payment', {
            state: { paymentAmount: totalAmount, cartItems: cart },
        });
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="profile-section">
                    <img src={profileImg} alt="Artist Profile" className="profile-image" />
                    <p>{aboutText}</p>
                </div>

                <div className="artwork-section">
                    <h2>Available Artwork</h2>
                    <div className="artwork-gallery">
                        {artworks.map((artwork) => (
                            <div key={artwork.id} className="artwork-card">
                                <img src={artwork.imageUrl} alt={artwork.title} className="artwork-image" />
                                <h3>{artwork.title}</h3>
                                <p>{artwork.description}</p>
                                <p className="artwork-price">${artwork.price}</p>
                                <button onClick={() => addToCart(artwork)} className="buy-button">Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cart-section">
                    <h3>Shopping Cart</h3>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.title}</h4>
                                    <p>${item.price} x {item.quantity}</p>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                    />
                                    <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {cart.length > 0 && (
                        <button onClick={handleCheckout} className="checkout-button">
                            Proceed to Checkout
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ArtistPublicPage;
