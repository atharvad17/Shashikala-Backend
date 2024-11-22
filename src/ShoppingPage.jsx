import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingPage.css';
import { FaShoppingCart } from 'react-icons/fa'; // Cart icon
import Footer from './Footer.jsx';

const ShoppingPage = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        artist: [],
    });
    const [cart, setCart] = useState([]);
    const [highlightedItems, setHighlightedItems] = useState([]);
    const navigate = useNavigate();

    const items = [
        { id: 1, name: "Stylish Shirt", category: "Clothing", artist: "Artist A", price: "$50", imageUrl: "https://as2.ftcdn.net/v2/jpg/04/42/61/87/1000_F_442618700_rs9g067ckkYk31GYd8fEmunerI6FwuhO.jpg" },
        { id: 2, name: "Digital Painting", category: "Digital Image", artist: "Artist B", price: "$120", imageUrl: "https://via.placeholder.com/150" },
        { id: 3, name: "Wooden Sculpture", category: "Hard Copy", artist: "Artist C", price: "$200", imageUrl: "https://via.placeholder.com/150" },
        { id: 4, name: "Abstract Poster", category: "Digital Image", artist: "Artist A", price: "$25", imageUrl: "https://as2.ftcdn.net/v2/jpg/04/42/61/87/1000_F_442618700_rs9g067ckkYk31GYd8fEmunerI6FwuhO.jpg" },
        { id: 5, name: "Abstract Poster2", category: "Digital Image", artist: "Artist B", price: "$15", imageUrl: "https://via.placeholder.com/150" },
        { id: 6, name: "Abstract Poster3", category: "Hard Copy", artist: "Artist C", price: "$30", imageUrl: "https://as2.ftcdn.net/v2/jpg/04/42/61/87/1000_F_442618700_rs9g067ckkYk31GYd8fEmunerI6FwuhO.jpg" },
        { id: 7, name: "Abstract Poster4", category: "Digital Image", artist: "Artist A", price: "$25", imageUrl: "https://via.placeholder.com/150" },
    ];

    const categories = ["Clothing", "Digital Image", "Hard Copy"];
    const artists = ["Artist A", "Artist B", "Artist C"];

    const handleFilterChange = (filterCategory, filterValue) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterCategory]: prev[filterCategory].includes(filterValue)
                ? prev[filterCategory].filter((value) => value !== filterValue)
                : [...prev[filterCategory], filterValue],
        }));
    };

    const filteredItems = items.filter((item) =>
        (!selectedFilters.category.length || selectedFilters.category.includes(item.category)) &&
        (!selectedFilters.artist.length || selectedFilters.artist.includes(item.artist))
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
            <div className="shopping-portal">
                <div className="filter-section">
                    <h3>Filters</h3>

                    <h4>Category</h4>
                    {categories.map((category) => (
                        <div key={category} className="filter-option">
                            <input
                                type="checkbox"
                                id={category}
                                checked={selectedFilters.category.includes(category)}
                                onChange={() => handleFilterChange('category', category)}
                            />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}

                    <h4>Artist</h4>
                    {artists.map((artist) => (
                        <div key={artist} className="filter-option">
                            <input
                                type="checkbox"
                                id={artist}
                                checked={selectedFilters.artist.includes(artist)}
                                onChange={() => handleFilterChange('artist', artist)}
                            />
                            <label htmlFor={artist}>{artist}</label>
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
                                <p>{item.artist}</p>
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
