import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import FoodItemSkeleton from "../FoodItem/FoodItemSkeleton";
import { StoreContext } from "../../Context/StoreContext";
import FoodDetailsModal from "../FoodItem/FoodDetailsModal";

const FoodDisplay = ({ category, customList, excludeDeals = false }) => {
  const { food_list, isFoodLoading } = useContext(StoreContext);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (food) => {
    setSelectedFood(food);
    setModalOpen(true);
  };

  let displayList;
  if (customList) {
    displayList = customList;
  } else if (category === "All") {
    // Exclude deals if requested for All Recent Menu
    displayList = excludeDeals
      ? food_list.filter((item) => !item.isDeal)
      : food_list;
  } else {
    displayList = food_list.filter(
      (item) =>
        item.category === category && (excludeDeals ? !item.isDeal : true)
    );
  }
  return (
    <div className="food-display" id="food-display">
      <h2>
        {category === undefined
          ? null
          : category === "All"
          ? "All Recent Menu"
          : `${category} Menu`}
      </h2>
      <div className="food-display-list">
        {isFoodLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <FoodItemSkeleton key={idx} />
            ))
          : displayList.map((item) => (
              <FoodItem
                key={item._id}
                image={item.image}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
                onCardClick={() => handleCardClick(item)}
              />
            ))}
      </div>
      {modalOpen && selectedFood && (
        <FoodDetailsModal
          food={selectedFood}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FoodDisplay;
