import React from "react";
import "./FoodItem.css";

const FoodItemSkeleton = () => {
  return (
    <div className="food-item skeleton">
      <div className="food-item-img-container">
        <div className="skeleton-box skeleton-img" />
      </div>
      <div className="food-item-info">
        <div className="skeleton-box skeleton-title" />
        <div className="skeleton-box skeleton-desc" />
        <div className="skeleton-box skeleton-price" />
      </div>
    </div>
  );
};

export default FoodItemSkeleton;
