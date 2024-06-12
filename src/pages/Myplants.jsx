// MyPlants.js

import React from "react";
//import { useBars } from "../components/Bars";
import TanStackTable from "../components/TanStackTable";

const MyPlants = ({ closeMenu, title, path }) => {
  //const { location } = useBars();
  return (
    <div
      className={
        closeMenu === false ? "pageContainer" : "pageContainer active"
      }>
      <div className="breadcrumbs">
        <a className="breadcrumbsHref" href="/myplants">
          {title}
        </a>
      </div>
      <h1 className="title">{title}</h1>
      <div className="table">
        <TanStackTable />
      </div>
    </div>
  );
};

export default MyPlants;
