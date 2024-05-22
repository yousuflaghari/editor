import React, { useState, useRef } from "react";
import Button from "../component1/button";

const FilterPage = ({ setImage, image, setFilteredImg }) => {
  const [style, setStyle] = useState("");
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const applyFilterAndDownload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const filterStyle = getComputedStyle(
        document.querySelector(`.${style}`)
      ).filter;
      ctx.filter = filterStyle;
      ctx.drawImage(img, 0, 0);
      const filteredImageDataURL = canvas.toDataURL();
      setFilteredImg(filteredImageDataURL);

      const link = document.createElement("a");
      link.href = filteredImageDataURL;
      link.download = "filtered-image.png";
      link.click();
    };
  };

  return (
    <div>
      <h2>Apply Filter</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <img src={image} alt="Preview" className={style} />
          <div className="button-container">
            <Button onClick={() => setStyle("style1")}>Sepia</Button>
            <Button onClick={() => setStyle("style2")}>Grayscale</Button>
            <Button onClick={() => setStyle("style3")}>Blur</Button>
            <Button onClick={() => setStyle("style4")}>Saturation</Button>
            <Button onClick={() => setStyle("style5")}>Brightness</Button>
            <Button onClick={() => setStyle("style6")}>Contrast</Button>
            <Button onClick={() => setStyle("style7")}>Hue Rotate</Button>
          </div>
          <button onClick={applyFilterAndDownload}>
            Download Filtered Image
          </button>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
      )}
    </div>
  );
};

export default FilterPage;
