import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingPage.css';
import { FaShoppingCart } from 'react-icons/fa'; // Cart icon
import Footer from './Footer.jsx';

const ShoppingPage = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [cart, setCart] = useState([]);
    const [highlightedItems, setHighlightedItems] = useState([]); // To highlight items when added to cart
    const navigate = useNavigate(); // For navigating to the cart page

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
        setCart((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setHighlightedItems((prev) => [...prev, item.id]); // Highlight the added item
    };

    const filteredItems = selectedFilters.length
        ? items.filter((item) => selectedFilters.includes(item.category))
        : items;

    const handleGoToCart = () => {
        navigate('/cart', { state: { cartItems: cart } });
    };

    return (
        <>
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

                <div className="artwork-section">
                    <div className="cart-icon" onClick={handleGoToCart}>
                        <FaShoppingCart size={30} />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </div>
                    <h2 className="artwork-title">Available Artworks</h2>
                    <div className="items-container">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className={`item-card ${highlightedItems.includes(item.id) ? 'highlighted' : ''}`}
                            >
                                <img src={item.imageUrl} alt={item.name} className="item-image" />
                                <h4>{item.name}</h4>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShoppingPage;
