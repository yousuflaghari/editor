import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropimage";
import "./filterpage.css";
import Image from "../component1/image";

const FilterPage = ({ setImage, image }) => {
  const [style, setStyle] = useState("");
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setCroppedImageURL(null);
    };
    reader.readAsDataURL(file);
  };

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
        setImage(filteredImageDataURL);
      }
    };
  };

  const handleFilterClick = (style) => {
    setStyle(style);
    applyFilter(style);
  };

  const handleCropSave = async () => {
    if (image && croppedArea) {
      const croppedImage = await getCroppedImg(image, croppedArea);
      setCroppedImageURL(croppedImage);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    if (croppedImageURL) {
      link.href = croppedImageURL;
      link.download = "cropped-image.png";
    } else if (image) {
      link.href = image;
      link.download = "filtered-image.png";
    }
    link.click();
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleCropperToggle = () => {
    setShowCropper(!showCropper);
  };

  return (
    <div className="container">
      <h1 className="heading">Photo Editor</h1>
      {image && (
        <>
          <div className="image-container">
            <img
              src={image}
              alt="Filtered"
              className="img"
              style={{ display: showCropper ? "none" : "block" }}
            />
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleCropperToggle}>
              {showCropper ? "Hide Cropper" : "Show Cropper"}
            </button>

            {showCropper && (
              <div>
                <div
                  style={{ position: "relative", width: "0%", height: "400" }}
                >
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <button onClick={handleCropSave}>Save Cropped Image</button>
              </div>
            )}
          </div>
          <div>
            <div className="filter-container">
              <Image
                src={image}
                alt="Vintage"
                className="vintage-filter"
                onClick={() => handleFilterClick("vintage-filter")}
              />
              <Image
                src={image}
                alt="Retro"
                className="retro-filter"
                onClick={() => handleFilterClick("retro-filter")}
              />
              <Image
                src={image}
                alt="Soft Glow"
                className="soft-glow-filter"
                onClick={() => handleFilterClick("soft-glow-filter")}
              />
              <Image
                src={image}
                alt="Cool Tone"
                className="cool-tone-filter"
                onClick={() => handleFilterClick("cool-tone-filter")}
              />
              <Image
                src={image}
                alt="Warm Tone"
                className="warm-tone-filter"
                onClick={() => handleFilterClick("warm-tone-filter")}
              />
              <Image
                src={image}
                alt="High Contrast B&W"
                className="high-contrast-bw-filter"
                onClick={() => handleFilterClick("high-contrast-bw-filter")}
              />
              <Image
                src={image}
                alt="Dreamy"
                className="dreamy-filter"
                onClick={() => handleFilterClick("dreamy-filter")}
              />
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>
        </>
      )}
      {!image && (
        <div className="img-input">
          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={handleImageChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilterPage;
