import React, { useState, useRef, useEffect } from "react";
import "./filterimage.css";
import FilterDiv from "./filterdiv";
import Cropper from "react-easy-crop";
import getCroppedImg from "../pages/cropimage";

const FilterImage = ({ image, setImage }) => {
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [filteredImage, setFilteredImage] = useState(image);
  const canvasRef = useRef(null);

  const CONTAINER_HEIGHT = 300;

  useEffect(() => {
    if (image && selectedFilter) {
      applyFilter(selectedFilter);
    } else {
      setFilteredImage(image);
    }
  }, [image, selectedFilter]);

  const applyFilter = (style) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const filterElement = document.querySelector(`.${style}`);
      if (filterElement) {
        const filterStyle = getComputedStyle(filterElement).filter;
        ctx.filter = filterStyle;
        ctx.drawImage(img, 0, 0);
        const filteredImageDataURL = canvas.toDataURL();
        setFilteredImage(filteredImageDataURL);
      }
    };
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setSelectedFilter("");
    };
    reader.readAsDataURL(file);
  };

  const handleCropSave = async () => {
    if (filteredImage && croppedArea) {
      const croppedImage = await getCroppedImg(filteredImage, croppedArea);
      setCroppedImageURL(croppedImage);
    }
  };

  const handleCropperToggle = () => {
    setShowCropper(!showCropper);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    if (croppedImageURL) {
      link.href = croppedImageURL;
      link.download = "cropped-image.png";
    } else if (filteredImage) {
      link.href = filteredImage;
      link.download = "filtered-image.png";
    }
    link.click();
  };

  const handleFilterClick = (filterClass) => {
    setSelectedFilter(filterClass);
  };

  return (
    <div>
      <h1 className="heading">PHOTO EDITOR</h1>
      <div className="img-input">
        <input
          type="file"
          accept="image/*"
          className="input"
          onChange={handleImageChange}
        />
      </div>
      {image && (
        <div className="image-container">
          {showCropper && filteredImage && (
            <Cropper
              image={filteredImage}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onMediaLoaded={(mediaSize) => {
                // Adapt zoom based on media size to fit max height
                setZoom(CONTAINER_HEIGHT / mediaSize.naturalHeight);
              }}
            />
          )}

          {!showCropper && filteredImage && (
            <div className="img">
              <img
                src={filteredImage}
                alt="Uploaded"
                className={`img ${selectedFilter}`}
              />
            </div>
          )}

          <div className="btn-container">
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleCropSave}>Save Image</button>
            <button onClick={handleCropperToggle}>
              {showCropper ? "Hide Crop" : "Show Crop"}
            </button>
          </div>
        </div>
      )}
      {image && !showCropper && (
        <FilterDiv image={image} onFilterClick={handleFilterClick} />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default FilterImage;
