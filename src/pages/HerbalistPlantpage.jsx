import React from "react";
import { paths } from "../paths/paths";
import Arrowbrc from "../assets/icons/arrowBrcr.svg";
import plantImg from "../assets/images/Herbalist/Taraxacum_officinale.png";
import Icon1 from "../assets/icons/form.svg";
import Icon2 from "../assets/icons/taste.svg";
import Icon3 from "../assets/icons/loop.svg";
import Icon4 from "../assets/icons/planet.svg";
import Icon5 from "../assets/icons/plase.svg";
import HerbalistTabs from "../components/HerbalistTabs";
import { herbsData } from "../data/herbsData";
import { useParams } from "react-router-dom";

const HerbalistPlantpage = ({ closeMenu }) => {
  const { plantKey } = useParams();
  const plantData = herbsData[plantKey];

  if (!plantData) {
    console.error("No plant data found for key:", plantKey);
    return <div>Error: Plant data not found</div>;
  }

  // Форматирование первых двух значений каждого свойства через пробел и запятую
  const formFormatted = formatFirstTwoValues(plantData.form);
  const tasteFormatted = formatFirstTwoValues(plantData.taste);
  const cycleFormatted = formatFirstTwoValues(plantData.cycle);
  const planetFormatted = formatFirstTwoValues(plantData.planet);
  const placesFormatted = formatFirstTwoValues(plantData.places);

  // Функция для форматирования первых двух значений через пробел и запятую
  function formatFirstTwoValues(value) {
    if (Array.isArray(value)) {
      return value.slice(0, 2).join(", ");
    }
    return value;
  }

  // Получение синонимов и научного имени из данных о растениях
  const synonyms = plantData.synonyms;
  const synonymsFormatted =
    synonyms && synonyms.length > 0
      ? synonyms.slice(0, 3).map((synonym, index) => {
          return (
            <span key={index} className="synonym">
              {index > 0 ? "," : ""}
              <span className="or-word"> или </span>
              {synonym}
            </span>
          );
        })
      : "";
  const hrefPath = paths.herbalist + plantData.path;
  return (
    <div className="page">
      <div className="backround"></div>
      <div className="pageWrapp">
        <div className="firstScreen">
          <div className={closeMenu === false ? "pageCont" : "pageCont active"}>
            <div className="mainScreen">
              <div className="mainScreenInfo">
                <div className="breadcrumbs">
                  <a className="breadcrumbsHref" href={paths.herbalist}>
                    {paths.herbalistTitle}
                  </a>
                  <span className="">
                    <img src={Arrowbrc} alt="" />
                  </span>
                  <a className="breadcrumbsHref" href={hrefPath}>
                    {plantData.title}
                  </a>
                </div>
                <div className="mainScreenTitles">
                  <div className="plantPageTitle">{plantData.title}</div>
                  <div className="plantPageTitle2">
                    {synonymsFormatted && <span>{synonymsFormatted}</span>}
                  </div>
                  <div className="plantPageTitle3">
                    {plantData.scientificName}
                  </div>
                </div>
                <div className="mainScreenIcons">
                  <div className="mainScreenIconsBlock">
                    <img src={Icon1} alt="" />
                    <div className="IconsBlockText">{formFormatted}</div>
                    <div className="IconsBlockTitle">Форма</div>
                  </div>
                  <div className="mainScreenIconsBlock">
                    <img src={Icon3} alt="" />
                    <div className="IconsBlockText">{cycleFormatted}</div>
                    <div className="IconsBlockTitle">Цикл</div>
                  </div>
                  <div className="mainScreenIconsBlock">
                    <img src={Icon5} alt="" />
                    <div className="IconsBlockText">{placesFormatted}</div>
                    <div className="IconsBlockTitle">Места</div>
                  </div>
                  <div className="mainScreenIconsBlock">
                    <img src={Icon2} alt="" />
                    <div className="IconsBlockText">{tasteFormatted}</div>
                    <div className="IconsBlockTitle">Вкус</div>
                  </div>

                  <div className="mainScreenIconsBlock">
                    <img src={Icon4} alt="" />
                    <div className="IconsBlockText">{planetFormatted}</div>
                    <div className="IconsBlockTitle">Планета</div>
                  </div>
                </div>
              </div>
              <div className="mainScreenSlider">
                <img src={plantImg} alt="" />
              </div>
            </div>

            <h1 className="title">{plantData.title}</h1>
          </div>
        </div>
        <div className={closeMenu === false ? "TabCont" : "TabCont active"}>
          <HerbalistTabs
            tabData={plantData.tabs}
            plantData={plantData}></HerbalistTabs>
        </div>
      </div>
    </div>
  );
};

export default HerbalistPlantpage;
