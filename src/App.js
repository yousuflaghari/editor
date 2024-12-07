import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FilterImage from "./component1/filterimages";
const App = () => {
  const [image, setImage] = useState(null);
  const [filteredImg, setFilteredImg] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <FilterImage
                image={image}
                setImage={setImage}
                filteredImg={filteredImg}
                setFilteredImg={setFilteredImg}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
