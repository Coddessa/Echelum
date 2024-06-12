import React, { useState } from "react";
import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BarsProvider } from "./components/Bars";
import Dashboard from "./pages/Dashboard";
import MyPlants from "./pages/Myplants";
import Favorites from "./pages/Favorites";
import Rightbar from "./components/Rightbar";
import Bars from "./components/Bars";
import HerbalistPlantpage from "./pages/HerbalistPlantpage";
import Herbalist from "./pages/Herbalist";
import { paths } from "./paths/paths";

function App() {
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu((prevState) => !prevState);
  };
  return (
    <Router>
      <BarsProvider>
        <div className="App">
          <Bars closeMenu={closeMenu} handleCloseMenu={handleCloseMenu} />
          <Rightbar />
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard closeMenu={closeMenu} title="Обзор" />}
            />
            <Route
              path="/myplants"
              element={<MyPlants closeMenu={closeMenu} title="Мои растения" />}
            />
            <Route
              path="/herbalist/:plantKey"
              element={<HerbalistPlantpage closeMenu={closeMenu} />}
            />

            <Route
              path={paths.herbalist}
              element={
                <Herbalist closeMenu={closeMenu} title={paths.herbalistTitle} />
              }
            />
            <Route
              path="/favorites"
              element={<Favorites closeMenu={closeMenu} />}
            />
          </Routes>
        </div>
      </BarsProvider>
    </Router>
  );
}

export default App;
