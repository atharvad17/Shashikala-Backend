import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistPublicPage.css';
import { FaPaintBrush, FaPalette, FaCartPlus } from 'react-icons/fa'; // Icons for filters
import Footer from './Footer.jsx';

const ArtistPublicPage = () => {
    const [cart, setCart] = useState([]);
    const [highlightedItems, setHighlightedItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();

    const artworks = [
        { id: 1, name: "Masterpiece 1", category: "Digital", price: "$100", imageUrl: "https://via.placeholder.com/150" },
        { id: 2, name: "Sculpture 1", category: "Physical", price: "$250", imageUrl: "https://via.placeholder.com/150" },
        { id: 3, name: "Abstract Art", category: "Canvas", price: "$150", imageUrl: "https://via.placeholder.com/150" },
        { id: 4, name: "Digital Illustration", category: "Digital", price: "$80", imageUrl: "https://via.placeholder.com/150" },
    ];

    const categories = [
        { label: "Digital", icon: <FaPaintBrush /> },
        { label: "Physical", icon: <FaPalette /> },
        { label: "Canvas", icon: <FaCartPlus /> },
    ];

    const handleCategorySelect = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
        );
    };

    const filteredArtworks = artworks.filter(
        (artwork) => !selectedCategories.length || selectedCategories.includes(artwork.category)
    );

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
        setHighlightedItems((prev) => [...prev, item.id]);
    };

    const handleGoToCart = () => {
        navigate('/cart', { state: { cartItems: cart } });
    };

    return (
        <>
            <div className="artist-page">
                <div className="artist-grid">
                    {/* Left Section: Artist Profile and Catalog */}
                    <aside className="artist-profile">
                        <img src="https://via.placeholder.com/150" alt="Artist" className="artist-image" />
                        <h2>Artist's Name</h2>
                        <p>Bio: This artist specializes in unique digital and physical artworks.</p>

                        <div className="catalog-section">
                            <h3>Top Catalogs</h3>
                            {categories.map((category) => (
                                <div key={category.label} className="catalog-item">
                                    {category.icon}
                                    <span>{category.label}</span>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Right Section: Artwork Section */}
                    <main className="artwork-section">
                        <div className="cart-icon" onClick={handleGoToCart}>
                            <FaCartPlus size={30} />
                            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                        </div>

                        <div className="filter-box">
                            <h3>Filter by Category</h3>
                            <div className="category-filters">
                                {categories.map((category) => (
                                    <div
                                        key={category.label}
                                        className={`filter-icon ${selectedCategories.includes(category.label) ? 'active' : ''}`}
                                        onClick={() => handleCategorySelect(category.label)}
                                    >
                                        {category.icon}
                                        <span>{category.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2>Artworks</h2>
                        <div className="artwork-grid">
                            {filteredArtworks.map((artwork) => (
                                <div
                                    key={artwork.id}
                                    className={`artwork-card ${highlightedItems.includes(artwork.id) ? 'highlighted' : ''}`}
                                >
                                    <img src={artwork.imageUrl} alt={artwork.name} className="artwork-image" />
                                    <h4>{artwork.name}</h4>
                                    <p>{artwork.category}</p>
                                    <p>{artwork.price}</p>
                                    <button onClick={() => handleAddToCart(artwork)}>Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ArtistPublicPage;
