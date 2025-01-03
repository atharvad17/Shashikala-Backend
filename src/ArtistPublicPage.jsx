import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistPublicPage.css';
import { FaCartPlus } from 'react-icons/fa';
import Footer from './Footer';

const ArtistPublicPage = () => {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [highlightedItem, setHighlightedItem] = useState(null); // Track the added item
    const navigate = useNavigate();

    const artworks = [
        { id: 1, name: "Masterpiece 1", category: "Digital", price: "$100", imageUrl: "https://via.placeholder.com/200", isOutOfStock: false },
        { id: 2, name: "Sculpture 1", category: "Physical", price: "$250", imageUrl: "https://via.placeholder.com/200", isOutOfStock: true },
        { id: 3, name: "Abstract Art", category: "Canvas", price: "$150", imageUrl: "https://via.placeholder.com/200", isOutOfStock: false },
        { id: 4, name: "Digital Illustration", category: "Digital", price: "$80", imageUrl: "https://via.placeholder.com/200", isOutOfStock: false },
    ];

    const catalogItems = [
        {
            category: "Abstract",
            topItems: [
                { title: "Dreamscape", imageUrl: "https://via.placeholder.com/100" },
                { title: "Whirlwind", imageUrl: "https://via.placeholder.com/100" },
            ],
        },
        {
            category: "Nature",
            topItems: [
                { title: "Forest Path", imageUrl: "https://via.placeholder.com/100" },
                { title: "Golden Sunset", imageUrl: "https://via.placeholder.com/100" },
            ],
        },
    ];

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
        setHighlightedItem(item.id); // Set the item ID to highlight it
        setTimeout(() => setHighlightedItem(null), 1500); // Remove highlight after 1.5 seconds
    };

    const handleGoToCart = () => {
        navigate('/cart', { state: { cartItems: cart } });
    };

    const filteredArtworks = selectedCategory
        ? artworks.filter((art) => art.category === selectedCategory)
        : artworks;

    return (
        <>
            <div className="artist-page">
                {/* Artist Header */}
                <header className="artist-header">
                    <img className="artist-photo" src="https://via.placeholder.com/150" alt="Artist" />
                    <div className="artist-info">
                        <h1>Artist Name</h1>
                        <p>
                            A brief bio about the artist, describing their journey, style, and inspirations
                            for creating amazing artwork.
                        </p>
                    </div>
                </header>

                {/* Catalogs and Artworks Section */}
                <section className="content-grid">
                    {/* Left Panel: Top Catalogs */}
                    <div className="catalogs-section">
                        <h2>Top Catalogs</h2>
                        <div className="catalog-grid">
                            {catalogItems.map((catalog, index) => (
                                <div key={index} className="catalog-card">
                                    <h3>{catalog.category}</h3>
                                    <div className="catalog-images">
                                        {catalog.topItems.map((item, idx) => (
                                            <div key={idx} className="catalog-item">
                                                <img src={item.imageUrl} alt={item.title} />
                                                <p>{item.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Available Artworks */}
                    <div className="artworks-section">
                        <div className="cart-icon" onClick={handleGoToCart}>
                            <FaCartPlus size={30} />
                            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                        </div>
                        <h2>Available Artworks</h2>
                        <div className="filter-panel">
                            <h4>Filter by Category</h4>
                            <select onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="">All</option>
                                <option value="Digital">Digital</option>
                                <option value="Physical">Physical</option>
                                <option value="Canvas">Canvas</option>
                            </select>
                        </div>
                        <div className="artwork-grid">
                            {filteredArtworks.map((artwork) => (
                                <div
                                    key={artwork.id}
                                    className={`artwork-card ${highlightedItem === artwork.id ? 'artwork-added-to-cart' : ''} ${artwork.isOutOfStock ? 'out-of-stock' : ''}`}
                                >
                                    <div className="artwork-container">
                                        {artwork.isOutOfStock && (
                                            <div className="out-of-stock-banner">Out of Stock</div>
                                        )}
                                        <img src={artwork.imageUrl} alt={artwork.name} className="artwork-image" />
                                        <h4>{artwork.name}</h4>
                                        <p>{artwork.category}</p>
                                        <p>{artwork.price}</p>
                                        {!artwork.isOutOfStock && (
                                            <button onClick={() => handleAddToCart(artwork)}>Add to Cart</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="contact-section">
                    <h2>Contact Us</h2>
                    <form>
                        <label>
                            Name:
                            <input type="text" placeholder="Your Name" />
                        </label>
                        <label>
                            Message:
                            <textarea placeholder="Your Message" />
                        </label>
                        <button type="submit">Send</button>
                    </form>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ArtistPublicPage;
