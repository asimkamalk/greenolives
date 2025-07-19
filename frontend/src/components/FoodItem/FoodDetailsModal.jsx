import React from 'react';
import './FoodDetailsModal.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const FoodDetailsModal = ({ food, onClose }) => {
  const { url, currency, addToCart } = useContext(StoreContext);
  return (
    <div className="food-details-modal-backdrop" onClick={onClose}>
      <div className="food-details-modal" onClick={e => e.stopPropagation()}>
        <button className="food-details-close" onClick={onClose}>×</button>
        <img className="food-details-image" src={url + '/images/' + food.image} alt={food.name} />
        <h2>{food.name}</h2>
        <p className="food-details-desc">{food.description}</p>
        <div className="food-details-bottom">
          <span className="food-details-price">{currency}{food.price}</span>
          <button className="food-details-add-btn" onClick={() => { addToCart(food._id); onClose(); }}>
            <img src={assets.add_icon_white} alt="Add" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsModal; 