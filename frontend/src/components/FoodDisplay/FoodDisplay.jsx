import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'
import FoodDetailsModal from '../FoodItem/FoodDetailsModal'

const FoodDisplay = ({ category, customList }) => {
  const { food_list } = useContext(StoreContext);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (food) => {
    setSelectedFood(food);
    setModalOpen(true);
  };

  const displayList = customList || food_list;
  return (
    <div className='food-display' id='food-display'>
      <h2>{category === undefined ? null : (category === "All" ? "All Recent Menu" : `${category} Menu`)}</h2>
      <div className='food-display-list'>
        {displayList.map((item) => (
          <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} onCardClick={() => handleCardClick(item)} />
        ))}
      </div>
      {modalOpen && selectedFood && (
        <FoodDetailsModal food={selectedFood} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}

export default FoodDisplay
