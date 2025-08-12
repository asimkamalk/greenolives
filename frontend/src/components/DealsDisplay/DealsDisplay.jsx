import React from "react";
import FoodDisplay from "../FoodDisplay/FoodDisplay";

const DealsDisplay = ({ title, list }) => {
  if (!list || list.length === 0) return null;
  return (
    <div>
      {title ? <h2 style={{ marginTop: 24 }}>{title}</h2> : null}
      <FoodDisplay customList={list} category={undefined} />
    </div>
  );
};

export default DealsDisplay;
