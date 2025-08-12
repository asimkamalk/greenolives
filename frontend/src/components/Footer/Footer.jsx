import React from "react";
import "./Footer.css";

const Footer = () => {
  const phoneNumber = "+923456969693"; // Without dashes for WhatsApp
  const formattedPhoneNumber = "+92-345-6969693"; // Formatted for display
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const emailAddress = "newgreenolives@gmail.com";
  const mailToUrl = `mailto:${emailAddress}`;

  return (
    <footer className="footer" id="footer">
      <div className="footer-main">
        <div className="footer-top">
          <div className="footer-social-icons">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="19" cy="19" r="19" fill="#1877F2" />
                <path
                  d="M24.5 19H21V29H17V19H15V16H17V14.5C17 12.57 18.57 11 20.5 11H24V14H22C21.45 14 21 14.45 21 15V16H24.5V19Z"
                  fill="white"
                />
              </svg>
            </a>

            {/* Instagram - Fixed with proper link wrapper */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="instagram-gradient"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ffdc80" />
                    <stop offset="22%" stopColor="#fcaf45" />
                    <stop offset="44%" stopColor="#f77737" />
                    <stop offset="67%" stopColor="#f56040" />
                    <stop offset="89%" stopColor="#fd1d1d" />
                    <stop offset="100%" stopColor="#e1306c" />
                  </linearGradient>
                  <radialGradient id="instagram-radial" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#405de6" />
                    <stop offset="25%" stopColor="#5851db" />
                    <stop offset="50%" stopColor="#833ab4" />
                    <stop offset="75%" stopColor="#c13584" />
                    <stop offset="100%" stopColor="#fd1d1d" />
                  </radialGradient>
                </defs>

                {/* Background with Instagram gradient */}
                <rect
                  x="3"
                  y="3"
                  width="32"
                  height="32"
                  rx="7"
                  ry="7"
                  fill="url(#instagram-radial)"
                />

                {/* Main camera square outline */}
                <rect
                  x="8.5"
                  y="8.5"
                  width="21"
                  height="21"
                  rx="4.5"
                  ry="4.5"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />

                {/* Camera lens circle */}
                <circle
                  cx="19"
                  cy="19"
                  r="6"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />

                {/* Flash/lens indicator dot */}
                <circle cx="24.5" cy="13.5" r="1.3" fill="white" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="19" cy="19" r="19" fill="#000000" />
                <path
                  d="M22.402 12.0199H19.593V22.1149C19.593 23.5009 18.442 24.6259 17.03 24.6259C15.618 24.6259 14.467 23.5009 14.467 22.1149C14.467 20.7289 15.618 19.6039 17.03 19.6039C17.272 19.6039 17.505 19.6399 17.728 19.6999V16.8639C17.493 16.8289 17.252 16.8109 17.007 16.8109C13.691 16.8109 11 19.4409 11 22.6819C11 25.9229 13.691 28.5529 17.007 28.5529C20.323 28.5529 23.014 25.9229 23.014 22.6819V16.4959C24.208 17.3389 25.682 17.8759 27.274 17.8759V15.0379C25.063 15.0379 23.166 13.7659 22.402 12.0199Z"
                  fill="#FFFFFF"
                />
              </svg>
            </a>
          </div>

          <div className="footer-company-name">
            <a
              href="#home"
              aria-label="New Green Olives Home"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              New Green Olives
            </a>
          </div>
        </div>

        <div className="footer-links-row">
          <div className="footer-col">
            <h3>Get in Touch</h3>
            <ul>
              <li>
                <span className="phone-contact">
                  <span role="img" aria-label="Phone">
                    📞
                  </span>
                  <span className="whatsapp-indicator"> / </span>
                  <svg
                    className="whatsapp-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>{" "}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  aria-label="Contact us on WhatsApp"
                >
                  {formattedPhoneNumber}
                </a>
              </li>
              <li>
                <span role="img" aria-label="Email">
                  ✉️
                </span>{" "}
                <a
                  href={mailToUrl}
                  className="contact-link"
                  aria-label="Send us an email"
                >
                  {emailAddress}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span>Copyright 2025 © New Green Olives - All Rights Reserved.</span>
        </div>
        <div className="footer-bottom-right">
          <span>
            Powered by{" "}
            <a
              href="https://www.linkedin.com/company/targlabs/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TargLabs LinkedIn"
            >
              <b>TargLabs</b>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
