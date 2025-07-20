import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-main">
        <div className="footer-top">
          <div className="footer-social-icons">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="19" cy="19" r="19" fill="#fff"/>
                <path d="M24.5 19H21V29H17V19H15V16H17V14.5C17 12.57 18.57 11 20.5 11H24V14H22C21.45 14 21 14.45 21 15V16H24.5V19Z" fill="#181818"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="19" cy="19" r="19" fill="#fff"/>
                <g>
                  <rect x="12" y="12" width="14" height="14" rx="5" fill="#181818"/>
                  <circle cx="19" cy="19" r="3" fill="#fff"/>
                  <circle cx="23.5" cy="14.5" r="1" fill="#fff"/>
                </g>
              </svg>
            </a>
            {/* TikTok */}
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="19" cy="19" r="19" fill="#fff"/>
                <g>
                  <path d="M25.5 16.5c-1.38 0-2.5-1.12-2.5-2.5V13h-2v8.5a1.5 1.5 0 11-1.5-1.5v-2h-2v2a3.5 3.5 0 103.5-3.5V15c.64.58 1.48.94 2.4.99V16.5z" fill="#181818"/>
                </g>
              </svg>
            </a>
          </div>
          <div className="footer-company-name"><a href="https://www.linkedin.com/company/targlabs/" target="_blank" rel="noopener noreferrer">TargLabs</a></div>
        </div>
        <div className="footer-links-row">
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Get in Touch</h3>
            <ul>
              <li><span role="img" aria-label="Phone">📞</span> +92-304-5791888</li>
              <li><span role="img" aria-label="Email">✉️</span> contact@foodcart.com</li>
            </ul>
          </div>
          <div className="footer-col"></div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span>Copyright 2025 © foodcart - All Rights Reserved.</span>
        </div>
        <div className="footer-bottom-right">
          <span>Powered by <b><a href="https://www.linkedin.com/company/targlabs/" target="_blank" rel="noopener noreferrer">TargLabs</a></b></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
