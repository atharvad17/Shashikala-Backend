import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShoppingCart.css';
import Footer from './Footer.jsx';

const ShoppingCart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(location.state?.cartItems || []);

    const handleIncreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleDeleteItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity,
        0
    );

    const handleProceedToPayment = () => {
        navigate('/payment', { state: { cartItems, totalAmount } });
    };

    return (
        <>
            <div className="shopping-cart">
                <h1>Your Cart</h1>
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p className="cart-item-price">{item.price}</p>
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-button"
                                            onClick={() => handleDecreaseQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="quantity-button"
                                            onClick={() => handleIncreaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteItem(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-total">
                        <p>
                            <strong>Total: ${totalAmount.toFixed(2)}</strong>
                        </p>
                        <button
                            onClick={handleProceedToPayment}
                            className="proceed-to-payment"
                        >
                            Pay ${totalAmount.toFixed(2)}
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ShoppingCart;
