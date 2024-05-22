// src/CropPage.js
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropimage";

const CropPage = ({ filteredImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    const croppedImage = await getCroppedImg(filteredImg, croppedArea);
    console.log("Cropped Image:", croppedImage);
    setCroppedImageURL(croppedImage);
  };

  const handleDownload = () => {
    if (croppedImageURL) {
      const anchor = document.createElement("a");
      anchor.href = croppedImageURL;
      anchor.download = "cropped_image.jpg";
      anchor.click();
    }
  };

  return (
    <div>
      <h2>Crop Image</h2>
      {filteredImg ? (
        <div>
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={filteredImg}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button onClick={handleCropSave}>Save Cropped Image</button>
          {croppedImageURL && (
            <button onClick={handleDownload}>Download Cropped Image</button>
          )}
        </div>
      ) : (
        <p>No image to crop. Please apply a filter first.</p>
      )}
    </div>
  );
};

export default CropPage;
