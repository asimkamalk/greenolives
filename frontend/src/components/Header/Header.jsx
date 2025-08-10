import React from 'react'
import './Header.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Header = () => {
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false
    }

    // Array of slider images
    const sliderImages = [
        '/olive_hero.jpg',
        '/header_img.png',
        // For the third image, you can use one from your assets or add a new one
        // For now, I'll reuse olive_hero.jpg as a placeholder
        '/olive_hero.jpg'
    ]

    return (
        <div className='header'>
            <div className='slider-container'>
                <Slider {...settings}>
                    {sliderImages.map((image, index) => (
                        <div key={index} className="slider-item">
                            <div 
                                className="slider-image" 
                                style={{ backgroundImage: `url(${image})` }}
                            ></div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className='header-contents'>
                <h2>Order your <span className="highlight">favourite</span> food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button onClick={() => {
                  const menuSection = document.getElementById('explore-menu');
                  if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>View Menu</button>
            </div>
        </div>
    )
}

export default Header
