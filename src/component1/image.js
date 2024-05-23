// src/component1/Image.js
import React from "react";

const Image = ({ src, alt, className, onClick, style }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{ display: "inline-block", cursor: "pointer", ...style }}
    >
      <img src={src} alt={alt} style={{ width: "50px", height: "50px" }} />
    </div>
  );
};

export default Image;
