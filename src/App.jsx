import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm.jsx';
import LoginForm from './LoginForm.jsx';
import PaymentPage from './PaymentPage.jsx';
import EventPage from './EventPage.jsx';
import './App.css';
import logoImage from './Images/shashikalaLogo.jpg';
import AboutPage from './AboutPage.jsx';
import Footer from './Footer.jsx';


// Slider Images
const images = [
    'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1595351297944-cc4f8f78558b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://as2.ftcdn.net/v2/jpg/04/42/61/87/1000_F_442618700_rs9g067ckkYk31GYd8fEmunerI6FwuhO.jpg',
    'https://images.ctfassets.net/wlzmdirin2hy/2MN9KIzCXmCc6p7JCQmooe/e8507bf633ab2eb08b380fa2cc894f6e/LX_Colorado82_SM_SarahPalmeri_05.jpg',
];

const DonateModal = ({ isOpen, onClose, onDonate }) => {
    const [donationAmount, setDonationAmount] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const handleDonate = () => {
        const amountToDonate = selectedTemplate || donationAmount; // Use selected template if exists
        onDonate(amountToDonate);
        setDonationAmount(''); // Clear custom input field after donation
        setSelectedTemplate(''); // Clear selected template after donation
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Enter Donation Amount</h2>
                {/* Template Donation Options */}
                <div className="amount-options">
                    {['10', '20', '50', '100'].map((value) => (
                        <div
                            key={value}
                            className={`amount-option ${selectedTemplate === value ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedTemplate(value);
                                setDonationAmount(''); // Clear custom amount if template is selected
                            }}
                        >
                            ${value}
                        </div>
                    ))}
                </div>

                {/* Custom Donation Input */}
                <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={donationAmount}
                    onChange={(e) => {
                        setDonationAmount(e.target.value);
                        setSelectedTemplate(''); // Clear template if custom amount is entered
                    }}
                />

                <div className="modal-buttons">
                    <button className="modal-close" onClick={onClose}>Cancel</button>
                    <button className="modal-next" onClick={handleDonate}>Next</button>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Router>
            <header className="header">
                <Link to="/" className="logo"></Link>  {/* Navigates to home */}
                <nav className="nav">
                    {/* <a href="#shop" className="navLink">Shop</a> */}
                    <Link to="/event" className="navLink">Events</Link>
                    <Link to="/about" className="navLink">About</Link>
                    {/* <a href="#artists" className="navLink">Artists</a>
                    <Link to="/login" className="navButton">Login</Link>
                    <Link to="/signup" className="navButtonSignUp">Sign Up</Link> */}
                    <button className="navButton" onClick={handleOpenModal}>Donate</button>
                </nav>
            </header>

            {/* Modal for donation */}
            <Routes>
                <Route path="/*" element={<AppRoutes isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />} />
            </Routes>
        </Router>
    );
}

// Separate component for routes and donation handling
const AppRoutes = ({ isModalOpen, handleCloseModal }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDonate = (amount) => {
        navigate('/payment', { state: { paymentAmount: amount } });
    };

    // Automatically switch images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    // Function to change image based on indicator click
    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
            <DonateModal isOpen={isModalOpen} onClose={handleCloseModal} onDonate={handleDonate} />

            <Routes>
                <Route path="/" element={
                    <>
                        <section className="hero" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
                            <h1>Handcrafted Art, Heartfelt Stories</h1>
                            <p>Your one-stop solution for managing tasks efficiently.</p>
                            <div className="buttonContainer">
                                <Link to="/signup" className="ctaButton">Get Started</Link>
                                <Link to="/about" className="learnMoreButton">Learn More</Link>
                            </div>
                            <div className="Indicators">
                                {images.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`Indicator ${index === currentIndex ? 'active' : ''}`}
                                        onClick={() => handleIndicatorClick(index)}
                                    ></div>
                                ))}
                            </div>
                        </section>

                        {/* Image Slider Below Hero */}
                        <div className="Slider" style={{ display: 'none' }}>
                            {/* The slider is now part of the hero background */}
                        </div>

                        {/* Explore Artwork Section */}
                        <section className="explore_artwork">
                            <h1>Explore Artwork</h1>
                            <div className="artworkGrid">
                                <div className="artworkCard">
                                    <div className="artworkImage"></div>
                                    <h3>Abstract Wonders</h3>
                                    <p>Discover unique abstract pieces that play with colors and shapes.</p>
                                    <div className="buttonContainer">
                                        <button className="ctaButton">Buy Now</button>
                                        <button className="learnMoreButton">Learn More</button>
                                    </div>
                                </div>
                                <div className="artworkCard">
                                    <div className="artworkImage"></div>
                                    <h3>Nature's Beauty</h3>
                                    <p>Immerse yourself in breathtaking depictions of nature’s finest moments.</p>
                                    <div className="buttonContainer">
                                        <button className="ctaButton">Buy Now</button>
                                        <button className="learnMoreButton">Learn More</button>
                                    </div>
                                </div>
                                <div className="artworkCard">
                                    <div className="artworkImage"></div>
                                    <h3>Modern Portraits</h3>
                                    <p>Find contemporary portraits that capture the essence of the human experience.</p>
                                    <div className="buttonContainer">
                                        <button className="ctaButton">Buy Now</button>
                                        <button className="learnMoreButton">Learn More</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Footer */}
                        <Footer />
                    </>
                } />

                {/* Signup Page */}
                <Route path="/signup" element={<RegistrationForm />} />

                {/* Login Page */}
                <Route path="/login" element={<LoginForm />} />

                {/* Payment Page Route */}
                <Route path="/payment" element={<PaymentPage />} />

                {/* Event Page Route */}
                <Route path="/event" element={<EventPage />} />

                <Route path="/register" element={<RegistrationForm />} />

                <Route path="/about" element={<AboutPage />} />

                <Route path="/" element={<App />} />  {/* Home route */}
            </Routes>
        </>
    );
};

export default App;
