import React from "react";
import "./filterdiv.css";

const FilterDiv = ({ image, onFilterClick }) => {
  const filters = [
    { name: "Vintage", className: "vintage-filter" },
    { name: "Retro", className: "retro-filter" },
    { name: "Soft Glow", className: "soft-glow-filter" },
    { name: "Cool Tone", className: "cool-tone-filter" },
    { name: "Warm Tone", className: "warm-tone-filter" },
    { name: "High Contrast B&W", className: "high-contrast-bw-filter" },
    { name: "Dreamy", className: "dreamy-filter" },
  ];

  return (
    <div className="filter-container">
      {filters.map((filter, index) => (
        <div
          key={index}
          className={`filter-div ${filter.className}`}
          style={{ backgroundImage: `url(${image})` }}
          onClick={() => onFilterClick(filter.className)}
        ></div>
      ))}
    </div>
  );
};

export default FilterDiv;
