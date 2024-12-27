import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ArtistPublicPage.css';
import { FaPaintBrush, FaPalette, FaCartPlus } from 'react-icons/fa'; // Icons for filters
import Footer from './Footer.jsx';

const ArtistPublicPage = () => {
    const [cart, setCart] = useState([]);
    const [highlightedItems, setHighlightedItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const artworks = [
        { id: 1, name: "Masterpiece 1", category: "Digital", price: "$100", imageUrl: "https://via.placeholder.com/150" },
        { id: 2, name: "Sculpture 1", category: "Physical", price: "$250", imageUrl: "https://via.placeholder.com/150" },
        { id: 3, name: "Abstract Art", category: "Canvas", price: "$150", imageUrl: "https://via.placeholder.com/150" },
        { id: 4, name: "Digital Illustration", category: "Digital", price: "$80", imageUrl: "https://via.placeholder.com/150" },
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
                {/* Top Section: Artist Details */}
                <header className="artist-header">
                    <img className="artist-photo" src="https://via.placeholder.com/150" alt="Artist" />
                    <div className="artist-info">
                        <h1>Artist Name</h1>
                        <p>
                            A short bio about the artist. This section introduces the artist, their style, and
                            their inspiration behind creating stunning art pieces.
                        </p>
                    </div>
                </header>

                {/* Middle Section: Catalog and Artwork */}
                <div className="content-grid">
                    {/* Left Section: Catalog */}
                    <aside className="catalog-section">
                        <h2>Top Catalogs</h2>
                        {catalogItems.map((catalog, index) => (
                            <div className="catalog-card" key={index}>
                                <h3>{catalog.category}</h3>
                                <div className="catalog-images">
                                    {catalog.topItems.map((item, idx) => (
                                        <img
                                            key={idx}
                                            src={item.imageUrl}
                                            alt={item.title}
                                            title={item.title}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
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
                < footer className="contact-section" >
                    <h2>Contact the Artist</h2>
                    <form>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </footer >
            </div>
            <Footer />
        </>
    );
};


export default ArtistPublicPage;
