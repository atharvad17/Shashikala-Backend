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
import VisionPage from './VisionPage.jsx';
import MissionPage from './MissionPage.jsx';
import TeamPage from './TeamPage.jsx';
import SponsorsPage from './SponsorsPage.jsx';
import EventCatalog from './EventCatalog.jsx';
import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons
import { FaHeart } from 'react-icons/fa';
import image1 from './Images/homeScreen1.jpg'; // Import the image


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
    const [isMonthly, setIsMonthly] = useState(false); // Toggle state

    const handleDonate = () => {
        const amountToDonate = selectedTemplate || donationAmount;
        onDonate(amountToDonate);
        setDonationAmount('');
        setSelectedTemplate('');
        setIsMonthly(false); // Reset toggle state  
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="close-icon" onClick={onClose}>
                    <FaTimes size={20} />
                </div>
                <h2>Enter Donation Amount</h2>

                {/* Payment Type Toggle */}
                <div className="payment-toggle">
                    <label>
                        <input
                            type="radio"
                            checked={!isMonthly}
                            onChange={() => setIsMonthly(false)}
                        />
                        One-Time Payment
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={isMonthly}
                            onChange={() => setIsMonthly(true)}
                        />
                        Monthly Donation
                    </label>
                </div>

                <div className="amount-options">
                    {['20', '50', '100', '200'].map((value) => (
                        <div
                            key={value}
                            className={`amount-option ${selectedTemplate === value ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedTemplate(value);
                                setDonationAmount('');
                            }}
                        >
                            ${value}
                        </div>
                    ))}
                </div>

                <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={donationAmount}
                    onChange={(e) => {
                        setDonationAmount(e.target.value);
                        setSelectedTemplate('');
                    }}
                />

                <div className="modal-buttons">
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
                <Link to="/" className="logo"></Link>
                <nav className="nav">
                    <Link to="#shop" className="navLink">Shop</Link>
                    <Link to="/eventCard" className="navLink">Events</Link>
                    <Link to="/vision" className="navLink">About</Link>
                    <Link to="#artist" className="navLink">Artists</Link>
                    <button className="navButton" onClick={handleOpenModal}>
                        <FaHeart size={16} style={{ marginRight: '8px' }} />
                        Donate Now
                    </button>
                </nav>
            </header>

            <Routes>
                <Route path="/*" element={<AppRoutes isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />} />
            </Routes>
        </Router>
    );
}

const AppRoutes = ({ isModalOpen, handleCloseModal, handleOpenModal }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDonate = (amount) => {
        navigate('/payment', { state: { paymentAmount: amount } });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
                                {/**<Link to="/signup" className="ctaButton">Get Started</Link>
                                <Link to="/about" className="learnMoreButton">Learn More</Link> */}
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

                        {/* Who We Are Section */}
                        <section className="who-we-are">
                            <div className="who-we-are-content">
                                <div className="text-column">
                                    <h1>Who We Are</h1>
                                <p>
                                    Shashikala Foundation is a non-profit organization dedicated to spreading joy through visual arts.
                                    We aim to empower underprivileged children by providing them with art education, guidance, and mentorship.
                                    Our goal is to promote creativity and bring happiness to the community by celebrating cultural diversity through art.
                                </p>
                                <p>
                                    Our mission is to support and nurture young talents, helping them develop their artistic skills while fostering a
                                    sense of belonging and appreciation for art in society. Join us in creating a brighter future for our next generation
                                    of artists.
                                    </p> <br></br>
                                    <button className="navButton" onClick={handleOpenModal}>
                <FaHeart size={16} style={{ marginRight: '8px' }} />
                Donate Now
            </button>
                                </div>
                                <div className="image-column">
                                    <img src={image1} alt="About Us" className="about-image" />
                                </div>
                            </div>
                        </section>

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

                        <Footer />
                    </>
                } />

                <Route path="/signup" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/event" element={<EventPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/" element={<App />} />
                <Route path="/vision" element={<VisionPage />} />
                <Route path="/mission" element={<MissionPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/sponsors" element={<SponsorsPage />} />
                <Route path="/eventCard" element={<EventCatalog />} />
                <Route path="/event/:id" element={<EventPage />} />
            </Routes>
        </>
    );
};

export default App;
