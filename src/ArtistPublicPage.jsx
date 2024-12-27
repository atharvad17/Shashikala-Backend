import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ArtistPublicPage.css';

const ArtistPublicPage = () => {
    const location = useLocation();

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

    const artworks = [
        { id: 1, title: "Sunset Bliss", category: "Nature", imageUrl: "https://via.placeholder.com/300", price: "$300" },
        { id: 2, title: "Ocean Waves", category: "Nature", imageUrl: "https://via.placeholder.com/300", price: "$250" },
        { id: 3, title: "Mountain Dreams", category: "Abstract", imageUrl: "https://via.placeholder.com/300", price: "$400" },
        { id: 4, title: "City Lights", category: "Modern", imageUrl: "https://via.placeholder.com/300", price: "$350" },
    ];

    const [cart, setCart] = useState([]);

    const addToCart = (artwork) => {
        if (!cart.includes(artwork)) {
            setCart([...cart, artwork]);
        }
    };

    return (
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

                {/* Right Section: Artwork */}
                <main className="artwork-section">
                    <div className="artwork-header">
                        <h2>Available Artworks</h2>
                        <span className="cart-icon">🛒 {cart.length}</span>
                    </div>
                    <div className="artwork-grid">
                        {artworks.map((art) => (
                            <div
                                className={`artwork-card ${cart.includes(art) ? "selected" : ""
                                    }`}
                                key={art.id}
                            >
                                <img src={art.imageUrl} alt={art.title} />
                                <h3>{art.title}</h3>
                                <p>{art.price}</p>
                                <button onClick={() => addToCart(art)}>
                                    {cart.includes(art) ? "Added" : "Add to Cart"}
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Bottom Section: Contact Form */}
            <footer className="contact-section">
                <h2>Contact the Artist</h2>
                <form>
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </footer>
        </div>
    );
};

export default ArtistPublicPage;
