import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import FoodItem from '../components/FoodItem/FoodItem';

const MyFavorites = () => {
  const { favorites, food_list } = useContext(StoreContext);
  const favoriteFoods = food_list.filter(item => favorites.includes(item._id));

  return (
    <div style={{maxWidth: 1200, margin: '40px auto', padding: 24}}>
      <h2 style={{marginBottom: 24}}>My Favorites</h2>
      {favoriteFoods.length === 0 ? (
        <div style={{textAlign: 'center', color: '#888', fontSize: 20, marginTop: 40}}>
          You have no favorite dishes yet.
        </div>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 32}}>
          {favoriteFoods.map(item => (
            <FoodItem key={item._id} image={item.image} name={item.name} price={item.price} desc={item.description} id={item._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites; 