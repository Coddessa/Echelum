import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import burgerLeft from "../assets/icons/burger_left.svg";
import burgerRight from "../assets/icons/burger_right.svg";
import bookmark from "../assets/icons/bookmark.svg";
import dashboard from "../assets/icons/dashboard.svg";
import dashboardActive from "../assets/icons/dashboardActive.svg";
import favorites from "../assets/icons/favorites.svg";
import market from "../assets/icons/market.svg";
import profile from "../assets/icons/profile.svg";
import tableCartActive from "../assets/icons/table-cart-active.svg";
import tableImg from "../assets/icons/table-img.svg";
import tableRows from "../assets/icons/table-rows.svg";
import water from "../assets/icons/water.svg";
import plant from "../assets/icons/plant.svg";
import plantActive from "../assets/icons/plant-active.svg";
import logo from "../assets/icons/logo.svg";
import Add from "../assets/icons/add.svg";
import Search from "../assets/icons/search.svg";

const Bars = ({ closeMenu, handleCloseMenu }) => {
  const location = useLocation();
  console.log("Bars", closeMenu);
  return (
    <div className="bars">
      <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
        <div className="sidebarContainer">
          <div className="topContainer">
            <a className="aText" href="/">
              <div className="logoContainer">
                <div className="logo">
                  <img src={logo} alt="logo" />
                </div>
                <div className="logoText">Echelum</div>
              </div>
            </a>

            <div className="burgerContainer" onClick={handleCloseMenu}>
              <img
                src={closeMenu === false ? burgerLeft : burgerRight}
                alt="burger"
                className="burger"
              />
            </div>
          </div>
          <div className="dividerTop"></div>
          <div
            className={
              location.pathname === "/myplants"
                ? "viewContainer disp"
                : "viewContainer"
            }>
            <div className="viewButton active">
              <img src={tableCartActive} alt="dashboard" />
              <div className="viewText">Вид картой</div>
            </div>
            <div className="viewButton ">
              <img src={tableImg} alt="dashboard" />
              <div className="viewText">Вид списком</div>
            </div>
            <div className="viewButton">
              <img src={tableRows} alt="dashboard" />
              <div className="viewText">Вид таблицей</div>
            </div>
          </div>
          <div
            className={
              location.pathname === "/myplants"
                ? "dividerView disp"
                : "dividerView"
            }></div>
          <div className="iconsContainer">
            <ul>
              <li>
                <a className="aText" href="/dashboard">
                  <div
                    className={
                      location.pathname === "/dashboard"
                        ? "iconContainerTop active"
                        : "iconContainerTop"
                    }>
                    <div className="iconButton">
                      <img
                        src={
                          location.pathname === "/dashboard"
                            ? dashboardActive
                            : dashboard
                        }
                        alt="dashboard"
                      />
                    </div>
                    <div className="iconText">Обзор</div>
                  </div>
                </a>
              </li>
              <div className="divider "></div>
              <li>
                <a className="aText" href="/myplants">
                  <div
                    className={
                      location.pathname === "/myplants"
                        ? "iconContainer active"
                        : "iconContainer"
                    }>
                    <div className="iconButton ">
                      <img
                        src={
                          location.pathname === "/myplants"
                            ? plantActive
                            : plant
                        }
                        alt="myplants"
                      />
                    </div>
                    <div className="iconText ">Мои растения</div>
                  </div>
                </a>
              </li>
              <li>
                <a className="aText" href="/myplants">
                  <div className="iconContainer">
                    <div className="iconButton">
                      <img src={water} alt="dashboard" />
                    </div>
                    <div className="iconText">Полив</div>
                  </div>
                </a>
              </li>
              <div className="divider"></div>
              <li>
                <a className="aText" href="/myplants">
                  <div className="iconContainer">
                    <div className="iconButton">
                      <img src={market} alt="dashboard" />
                    </div>
                    <div className="iconText">На маркете</div>
                  </div>
                </a>
              </li>
              <li>
                <a className="aText" href="/myplants">
                  <div className="iconContainer">
                    <div className="iconButton">
                      <img src={favorites} alt="dashboard" />
                    </div>
                    <div className="iconText">Избранное</div>
                  </div>
                </a>
              </li>
              <div className="divider"></div>
              <li>
                <a className="aText" href="/myplants">
                  <div className="iconContainer">
                    <div className="iconButton">
                      <img src={profile} alt="dashboard" />
                    </div>
                    <div className="iconText">Моя страница</div>
                  </div>
                </a>
              </li>
              <li>
                <a className="aText" href="/myplants">
                  <div className="iconContainer">
                    <div className="iconButton">
                      <img src={bookmark} alt="dashboard" />
                    </div>
                    <div className="iconText">Сохраненное</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={closeMenu === false ? "topbar" : "topbar active"}>
        <div className="MenuContainer">
          <ul className="MenuContainerItems">
            <li>
              <a className="aText" href="/">
                <div className="menuText">Комнатные</div>
              </a>
            </li>

            <li>
              <a className="aText" href="/">
                <div className="menuText">Суккуленты</div>
              </a>
            </li>
            <li>
              <a className="aText" href="/">
                <div className="menuText">Сад</div>
              </a>
            </li>
            <li>
              <a className="aText" href="/">
                <div className="menuText">Огород</div>
              </a>
            </li>
            <li>
              <a className="aText" href="/">
                <div className="menuText">Травник</div>
              </a>
            </li>
            <li>
              <a className="aText" href="/">
                <div className="menuText">Сообщество</div>
              </a>
            </li>
            <li>
              <a className="aText" href="/">
                <div className="menuText">Маркет</div>
              </a>
            </li>
          </ul>
          <div className="addButton">
            <img src={Add} alt="dashboard" />
          </div>
          <div className="searchButton">
            <img src={Search} alt="dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
};
// Создание контекста
const BarsContext = createContext();

// Создание компонента-провайдера для контекста
export const BarsProvider = ({ children }) => {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(false);

  // Функция для изменения состояния closeMenu
  const handleCloseMenu = () => {
    setCloseMenu((prevState) => !prevState);
  };

  // Значение контекста, которое будет доступно во всем дереве компонентов, обернутом в BarsProvider
  const contextValue = {
    closeMenu,
    handleCloseMenu,
    location,
  };
  return (
    <BarsContext.Provider value={contextValue}>{children}</BarsContext.Provider>
  );
};

// Hook для использования контекста в функциональных компонентах
export const useBars = () => useContext(BarsContext);

export default Bars;
