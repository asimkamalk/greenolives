import React from 'react'
import './Header.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Header = () => {
    // Minimal slider settings
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        pauseOnHover: true
    }

    // Simplified image array
    const sliderImages = [
        '/olive_hero.jpg'
        // Removed '/header_img.png' - this was the orange cheese wedge
    ]

    const handleViewMenuClick = () => {
        console.log('Button clicked!') // Debug log
        const menuSection = document.getElementById('explore-menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className='header'>
            {/* Background Slider */}
            <div className='slider-container'>
                <Slider {...settings}>
                    {sliderImages.map((image, index) => (
                        <div key={index} className="slider-item">
                            <div 
                                className="slider-image" 
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            
            {/* Dark overlay */}
            <div className='header-overlay' />
            
            {/* Content - This should be visible now */}
            <div className='header-contents'>
                <h2>
                    Order your <span className="highlight">favourite</span> food here
                </h2>
                <p>
                    Choose from a diverse menu featuring a delectable array of dishes 
                    crafted with the finest ingredients and culinary expertise. Our 
                    mission is to satisfy your cravings and elevate your dining 
                    experience, one delicious meal at a time.
                </p>
                <button onClick={handleViewMenuClick}>
                    View Menu
                </button>
            </div>
        </div>
    )
}

export default Header