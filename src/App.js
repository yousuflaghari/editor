import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FilterPage from "./pages/filterpage";
import CropPage from "./pages/croppage";

const App = () => {
  const [image, setImage] = useState(null);
  const [filteredImg, setFilteredImg] = useState(null);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Filter</Link>
          <Link to="/crop">Crop</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <FilterPage
                image={image}
                setImage={setImage}
                setFilteredImg={setFilteredImg}
              />
            }
          />
          <Route
            path="/crop"
            element={<CropPage filteredImg={filteredImg} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
