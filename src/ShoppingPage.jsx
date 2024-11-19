import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported
import './ShoppingPage.css';

const ShoppingPage = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate(); // For navigating to the payment page

    const items = [
        { id: 1, name: "Stylish Shirt", category: "Clothing", price: "$50", imageUrl: "https://via.placeholder.com/150" },
        { id: 2, name: "Digital Painting", category: "Art", price: "$120", imageUrl: "https://via.placeholder.com/150" },
        { id: 3, name: "Wooden Sculpture", category: "Decor", price: "$200", imageUrl: "https://via.placeholder.com/150" },
        { id: 4, name: "Abstract Poster", category: "Art", price: "$25", imageUrl: "https://via.placeholder.com/150" },
    ];

    const filters = ["Clothing", "Art", "Decor"];

    const handleFilterChange = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    const handleAddToCart = (item) => {
        setCart((prev) => [...prev, item]);
    };

    const handleRemoveFromCart = (itemId) => {
        setCart((prev) => prev.filter((item) => item.id !== itemId));
    };

    const filteredItems = selectedFilters.length
        ? items.filter((item) => selectedFilters.includes(item.category))
        : items;

    const handleProceedToPayment = () => {
        navigate('/payment', { state: { cartItems: cart } }); // Pass cart items to payment page
    };

    return (
        <div className="shopping-portal">
            <div className="filter-section">
                <h3>Filters</h3>
                {filters.map((filter) => (
                    <div key={filter} className="filter-option">
                        <input
                            type="checkbox"
                            id={filter}
                            checked={selectedFilters.includes(filter)}
                            onChange={() => handleFilterChange(filter)}
                        />
                        <label htmlFor={filter}>{filter}</label>
                    </div>
                ))}
            </div>
            <div className="items-section">
                <div className="items-grid">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="item-card">
                            <img src={item.imageUrl} alt={item.name} className="item-image" />
                            <h4>{item.name}</h4>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="cart-section">
                <h3>Cart</h3>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            </div>
                        ))}
                        <button className="proceed-to-payment" onClick={handleProceedToPayment}>
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingPage;
