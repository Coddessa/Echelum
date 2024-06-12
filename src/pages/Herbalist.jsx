// MyPlants.js

import React from "react";
//import { useBars } from "../components/Bars";
import { paths } from "../paths/paths";
//import { titles } from "../paths/titles";

const Herbalist = ({ closeMenu, title, path }) => {
  //const { location } = useBars();
  return (
    <div
      className={
        closeMenu === false ? "pageContainer" : "pageContainer active"
      }>
      <div className="breadcrumbs">
        <a className="breadcrumbsHref" href={paths.herbalistPlantpage}>
          {paths.herbalistTitle}
        </a>
      </div>
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Herbalist;
