import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Close mobile menu on window resize
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, [mobileMenuOpen]);

  return (
    <div className={`navbar${mobileMenuOpen ? " mobile-open" : ""}`}>
      <Link to="/">
        <img
          className="logo transition-transform duration-300 hover:scale-105"
          src={assets.logo}
          alt="Logo"
        />
      </Link>

      <button
        className="navbar-hamburger transition-transform duration-200 hover:scale-110"
        aria-label="Open menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Navigation Menu */}
      <ul
        className={`navbar-menu${
          mobileMenuOpen ? " show" : ""
        } text-base md:text-lg`}
      >
        <li>
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              setMobileMenuOpen(false);
            }}
            className={`${menu === "home" ? "active" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => {
              setMenu("menu");
              setMobileMenuOpen(false);
            }}
            className={`${menu === "menu" ? "active" : ""}`}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={(e) => {
              e.preventDefault();
              setMenu("contact");
              setMobileMenuOpen(false);
              const footer = document.getElementById("footer");
              if (footer) {
                footer.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`${menu === "contact" ? "active" : ""}`}
          >
            Contact Us
          </a>
        </li>

        {/* WhatsApp and Email ONLY in mobile hamburger menu */}
        {mobileMenuOpen && (
          <li
            className="whatsapp-email-links"
            style={{ marginTop: "auto", paddingTop: "1rem" }}
          >
            <a
              href="https://wa.me/1234567890" // Replace with your WhatsApp number (no spaces or +)
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-contact-link"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#25D366",
                fontWeight: "600",
              }}
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>

            <a
              href="mailto:newgreenolives@example.com" // Replace with your email
              className="navbar-contact-link"
              style={{
                display: "block",
                color: "#636B2F",
                fontWeight: "600",
              }}
              aria-label="Email"
            >
              Email
            </a>
          </li>
        )}
      </ul>

      {/* Right side controls */}
      <div className="navbar-right">
        <Link
          to="/cart"
          className="navbar-search-icon transition-transform duration-200 hover:scale-110"
          tabIndex={0}
          aria-label="Cart"
        >
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            tabIndex={0}
            className="transition-transform duration-200 hover:scale-105"
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile" tabIndex={0}>
            <span className="profile-caret">▼</span>
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="transition-transform duration-200 hover:scale-110"
            />
            <ul className="navbar-profile-dropdown">
              <li
                onClick={() => {
                  navigate("/myorders");
                  setMobileMenuOpen(false);
                }}
              >
                <img src={assets.bag_icon} alt="Orders" /> <p>Orders</p>
              </li>
              <li
                onClick={() => {
                  navigate("/myfavorites");
                  setMobileMenuOpen(false);
                }}
              >
                <span role="img" aria-label="Favorites">
                  ❤️
                </span>{" "}
                <p>Favorites</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="navbar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
