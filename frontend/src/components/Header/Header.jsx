import React from 'react'
import './Header.css'

const Header = () => {
    const handleViewMenuClick = () => {
        console.log('Button clicked!') // Debug log
        const menuSection = document.getElementById('explore-menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className='header'>
            {/* Pure CSS background - no more orange images */}
            {/* Using deep green/black gradient as requested */}
            
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