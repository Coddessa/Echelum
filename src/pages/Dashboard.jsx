import React from "react";
import { useBars } from "../components/Bars";

const Dashboard = ({ closeMenu, title }) => {
  const { location } = useBars();
  return (
    <div
      className={
        closeMenu === false ? "pageContainer" : "pageContainer active"
      }>
      <div className="breadcrumbs">
        <a className="breadcrumbsHref" href="/dashboard">
          {title}
        </a>
      </div>

      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Dashboard;
