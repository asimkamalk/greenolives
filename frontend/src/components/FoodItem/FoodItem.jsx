import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import { motion } from 'framer-motion';

const FoodItem = ({ image, name, price, desc, id, onCardClick }) => {
  const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

  return (
    <motion.div
      className='food-item'
      onClick={onCardClick}
      style={{cursor: 'pointer'}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className='food-item-img-container'>
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />
        {!cartItems[id] ? (
          <img className='add' onClick={e => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div className="food-item-counter">
            <img src={assets.remove_icon_red} onClick={e => { e.stopPropagation(); removeFromCart(id); }} alt="Remove" />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={e => { e.stopPropagation(); addToCart(id); }} alt="Add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">{currency}{price}</p>
      </div>
    </motion.div>
  )
}

export default FoodItem
