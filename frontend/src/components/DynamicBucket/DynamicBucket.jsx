import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import bucketIcon from '../../assets/basket_icon.png';
import './DynamicBucket.css';

const DynamicBucket = () => {
  const { cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  // Calculate total items in cart
  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + (qty > 0 ? qty : 0), 0);

  if (totalItems === 0) return null;

  const handleClick = () => {
    navigate('/cart');
    window.scrollTo(0, 0);
  };

  return (
    <div className="dynamic-bucket" onClick={handleClick} title="View Cart">
      <img src={bucketIcon} alt="Cart Bucket" />
      <span className="dynamic-bucket-count">{totalItems}</span>
    </div>
  );
};

export default DynamicBucket; 