import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Icon from "../assets/icons/href.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import chemicalData from "../data/chemicalData";
import propertiesData from "../data/propertiesData";

//стилизация табов
const TagsList = ({ places }) => {
  return (
    <div className="tags">
      {places.map((place, index) => (
        <div key={index} className="tag">
          {place}
        </div>
      ))}
    </div>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#618167", // цвет текста вкладок
    },
    secondary: {
      main: "#618167", // цвет индикатора вкладок
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif", // замените на нужный вам шрифт
  },
});

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    height: "2px", // толщина индикатора
  },
});

const StyledTab = styled(Tab)({
  textTransform: "capitalize", // капитализация
  fontWeight: "400", // жирный шрифт
  fontSize: "16px",
  color: "#444444", // размер шрифта
  "&.Mui-selected": {
    fontWeight: "bold",
  },
});

const DividerBox = styled(Box)({
  borderBottom: "1px solid", // толщина и стиль дивайдера
  borderColor: "#ece9f1;",
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

///////////////////////////////////////////////////////////

export default function HerbalistTabs({ tabData, plantData }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabValues = Object.values(tabData);

  /////////////////////////////////////////////////////////
  //// СОСТАВ

  // Получаем массив частей растения
  let parts = plantData.compositionDetails.parts;

  // Создаем новые массивы для имен групп и описаний
  let allGroupNames = [];
  let allDescriptions = [];

  // Проходимся по каждой части растения
  parts.forEach((part) => {
    // Получаем массив групп для текущей части
    let groups = part.groups;

    // Создаем временные массивы для имен групп и описаний в текущей части
    let partGroupNames = [];
    let partDescriptions = [];

    // Для каждой группы в текущей части
    groups.forEach((group) => {
      // Добавляем имя группы в массив имен групп для текущей части
      partGroupNames.push(group.groupName);

      // Ищем описание группы в chemicalData
      let chemicalGroup = chemicalData.find(
        (chemicalGroup) => chemicalGroup.groupName === group.groupName
      );

      // Если находим описание, добавляем его в массив описаний для текущей части, иначе добавляем сообщение об ошибке
      if (chemicalGroup) {
        partDescriptions.push(chemicalGroup.description);
      } else {
        partDescriptions.push("");
      }
    });

    // Добавляем временные массивы имен групп и описаний для текущей части в общие массивы
    allGroupNames.push(partGroupNames);
    allDescriptions.push(partDescriptions);
  });

  ////////////////////////////////////////////////////////

  // Объект для хранения данных
  const data = {};

  // Обход всех частей, групп и элементов из plantData
  plantData.compositionDetails.parts.forEach((part, partIndex) => {
    part.groups.forEach((group, groupIndex) => {
      group.elements.forEach((element, elementIndex) => {
        const plantElementName = element.name;

        // Поиск соответствующего объекта в chemicalData
        const chemicalElement = chemicalData.find((chemicalElement) =>
          chemicalElement.elements.some((e) => e.name === plantElementName)
        );

        if (chemicalElement) {
          // Получение доступа к данным из chemicalData
          const foundElement = chemicalElement.elements.find(
            (e) => e.name === plantElementName
          );

          const generalDescription = foundElement.generalDescription;
          const properties = foundElement.properties;
          const contraindications = foundElement.contraindications;
          const solubility = foundElement.solubility;

          // Создание отдельного объекта для элемента
          const elementData = {
            generalDescription,
            properties,
            contraindications,
            solubility,
          };

          // Проверка наличия массивов для данной части, группы и элемента
          if (!data[partIndex]) data[partIndex] = {};
          if (!data[partIndex][groupIndex]) data[partIndex][groupIndex] = {};
          if (!data[partIndex][groupIndex][elementIndex])
            data[partIndex][groupIndex][elementIndex] = {};

          // Сохранение данных элемента
          data[partIndex][groupIndex][elementIndex] = elementData;

          // Отладочные строки внутри цикла
          console.log();
          console.log();
        } else {
          console.log(
            "Элемент",
            plantElementName,
            "не найден в бд chemicalData."
          );
        }
      });
    });
  });

  // Печать итогового объекта данных
  //console.log();

  /////////////////////////////////////////////////////////
  /////СВОЙСТВА

  const enrichedPropertiesData = plantData.propertiesDetails.map(
    (propertyDetail) => {
      const propertyData = propertiesData.find(
        (data) => data.propertiesName === propertyDetail.title
      );

      if (propertyData) {
        return {
          ...propertyDetail,
          propertiesSecondName: propertyData.propertiesSecondName,
          description: propertyData.description,
          medicine: propertyData.medicine,
        };
      } else {
        return {
          ...propertyDetail,
          propertiesSecondName: "Not found",
          description: "Not found",
          medicine: [],
        };
      }
    }
  );

  console.log(enrichedPropertiesData);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <DividerBox>
          <StyledTabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered>
            {tabValues.map((value, index) => (
              <StyledTab key={index} label={value} {...a11yProps(index)} />
            ))}
          </StyledTabs>
        </DividerBox>
        {tabValues.map((value, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {value}
          </CustomTabPanel>
        ))}
        <CustomTabPanel value={value} index={0}>
          <div className="tabContainer">
            <div className="tabText">
              <a className="ipniHref" href={plantData.IPNIurl}>
                <div className="ipniContainer">
                  <div className="ipni">
                    Идентификатор IPNI в области естественных наук (LSID):
                    <div className="ipniData">{plantData.IPNI}</div>
                    <div className="public">
                      Впервые было опубликовано в
                      <div className="ipniData">{plantData.public}</div>
                    </div>
                  </div>
                  <div className="ipniIconHref">
                    <img src={Icon} alt="" />
                  </div>
                </div>
              </a>
              <div className="descriptionColm">
                <div className="description">{plantData.description}</div>
                <div className="descriptionSubTitle">
                  {plantData.descriptionDetails.leaves.title}
                </div>
                <div className="descriptionSubText">
                  {plantData.descriptionDetails.leaves.text}
                </div>
                <div className="descriptionSubTitle">
                  {plantData.descriptionDetails.flowers.title}
                </div>
                <div className="descriptionSubText">
                  {plantData.descriptionDetails.flowers.text}
                </div>
                <div className="descriptionSubTitle">
                  {plantData.descriptionDetails.seeds.title}
                </div>
                <div className="descriptionSubText">
                  {plantData.descriptionDetails.seeds.text}
                </div>
                <div className="descriptionSubTitle">
                  {plantData.descriptionDetails.root.title}
                </div>
                <div className="descriptionSubText">
                  {plantData.descriptionDetails.root.text}
                </div>
                <div className="descriptionSubTitle">
                  {plantData.descriptionDetails.habitat.title}
                </div>
                <div className="descriptionSubText">
                  {plantData.descriptionDetails.habitat.text}
                </div>
                <div className="descriptionSubTitle">
                  {plantData.descriptionDetails.interestingFacts.title}
                </div>
                <div className="descriptionSubText">
                  <div className="subTitleBold">
                    {" "}
                    {plantData.descriptionDetails.interestingFacts.text[0].fact}
                  </div>
                  {
                    plantData.descriptionDetails.interestingFacts.text[0]
                      .description
                  }
                  <br />
                  <br />
                  <div className="subTitleBold">
                    {" "}
                    {plantData.descriptionDetails.interestingFacts.text[1].fact}
                  </div>
                  {
                    plantData.descriptionDetails.interestingFacts.text[1]
                      .description
                  }{" "}
                  <br />
                  <br />
                  <div className="subTitleBold">
                    {" "}
                    {plantData.descriptionDetails.interestingFacts.text[2].fact}
                  </div>
                  {
                    plantData.descriptionDetails.interestingFacts.text[2]
                      .description
                  }
                </div>
              </div>
            </div>

            <div className="tabInfoContainer">
              <div className="tabInfo">
                <div className="tabInfoTitle">Характеристики растения</div>
                <div className="tabInfoTitle2">
                  Морфология{" "}
                  <div className="tags">
                    <TagsList places={plantData.morfo} />
                  </div>
                </div>

                <div className="tabInfoTitle2">
                  Места произрастания{" "}
                  <div className="tags">
                    <TagsList places={plantData.places} />
                  </div>
                </div>

                <div className="paddingBottom"></div>
              </div>
              <div className="tabInfo">
                <div className="tabInfoTitle">Систематика</div>
                {Object.keys(plantData.taxonomy).map((key, index) => (
                  <div key={index} className="tabInfoRow">
                    <div className="tabInfoColm">
                      <div className="systemTitleRu">
                        {plantData.taxonomy[key].ru}
                      </div>
                      <div className="systemTitleLtColor">
                        {plantData.taxonomy[key].lt}
                      </div>
                    </div>
                    <div className="tabInfoColm2">
                      <div className="systemTitleRu">
                        {plantData.taxonomy[key].value}
                      </div>
                      <div className="systemTitleLt">
                        {plantData.taxonomy[key].lt_value}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="tabInfoTitle">Гетеротипические синонимы</div>
                <div className="tabInfoRowBottom">
                  {plantData.synonyms2.map((synonym, index) => (
                    <React.Fragment key={index}>
                      {synonym}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="tabContainer">
            <div className="tabText">
              <div className="descriptionColm">
                <div className="description">{plantData.сomposition}</div>
                <div>
                  {plantData.compositionDetails.parts.map((part, partIndex) => (
                    <React.Fragment key={partIndex}>
                      <div className="partTitle">{part.title}</div>
                      <div className="elementsGroupContainer">
                        {part.groups.map((group, groupIndex) => (
                          <React.Fragment key={groupIndex}>
                            <div className="elementsGroup">
                              {group.groupName}
                            </div>
                            {/* Добавляем проверку наличия описания группы */}
                            {allDescriptions[partIndex] &&
                            allDescriptions[partIndex][groupIndex] ? (
                              <div className="elementsGroupDescr">
                                {/* Описание группы */}
                                <div className="groupDescription">
                                  {allDescriptions[partIndex][groupIndex]}
                                </div>
                              </div>
                            ) : null}
                            <div className="accordion">
                              {group.elements.map((element, elementIndex) => {
                                const elementData =
                                  data[partIndex]?.[groupIndex]?.[elementIndex];

                                if (!elementData) {
                                  return null; // Если данных нет, пропускаем этот элемент
                                }

                                const hasProperties =
                                  elementData.properties?.length > 0;
                                const hasContraindications =
                                  elementData.contraindications?.length > 0;

                                return (
                                  <Accordion
                                    sx={{ boxShadow: "none" }}
                                    key={elementIndex}>
                                    <AccordionSummary
                                      sx={{
                                        backgroundColor: "#F1F4EF",
                                      }}
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1bh-content"
                                      id="panel1bh-header">
                                      <Typography
                                        sx={{
                                          width: "40%",
                                          flexShrink: 0,
                                          fontWeight: "500",
                                          color: "#11263C",
                                        }}>
                                        {element.name}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          width: "20%",
                                          flexShrink: 0,
                                          color: "#444444",
                                        }}>
                                        {element.percentage}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: "#444444",
                                        }}>
                                        {elementData.solubility}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                      sx={{
                                        fontSize: "14px",
                                        fontWeight: "400",
                                      }}>
                                      <br />
                                      {elementData.generalDescription} <br />
                                      <br />
                                      {hasProperties && (
                                        <>
                                          <span className="elementTitle">
                                            СВОЙСТВА
                                          </span>
                                          <br />
                                          <br />
                                          {elementData.properties.map(
                                            (property, propIndex) => (
                                              <React.Fragment key={propIndex}>
                                                <span className="elementTitle good">
                                                  {property.title}
                                                </span>{" "}
                                                <br />
                                                {property.description}
                                                <br />
                                                <br />
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                      {hasContraindications && (
                                        <>
                                          <span className="elementTitle">
                                            ПРОТИВОПОКАЗАНИЯ
                                          </span>
                                          <br />
                                          <br />
                                          {elementData.contraindications.map(
                                            (contraindication, contraIndex) => (
                                              <React.Fragment key={contraIndex}>
                                                <span className="elementTitle bad">
                                                  {contraindication.title}
                                                </span>{" "}
                                                <br />
                                                {contraindication.description}
                                                <br />
                                                <br />
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                      <br />
                                    </AccordionDetails>
                                  </Accordion>
                                );
                              })}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="partTitle">Источники</div>
                <ul>
                  <a
                    className="href"
                    href={plantData.сompositionStudies[0].link}>
                    <li>
                      <div className="subTitleBold">
                        {plantData.сompositionStudies[0].source}
                      </div>
                      <div>{plantData.сompositionStudies[0].title}</div>
                      <div>{plantData.сompositionStudies[0].description}</div>
                    </li>
                  </a>
                  <a
                    className="href"
                    href={plantData.сompositionStudies[1].link}>
                    <li>
                      <div className="subTitleBold">
                        {plantData.сompositionStudies[1].source}
                      </div>
                      <div>{plantData.сompositionStudies[1].title}</div>
                      <div>{plantData.сompositionStudies[1].description}</div>
                    </li>
                  </a>
                  <a
                    className="href"
                    href={plantData.сompositionStudies[2].link}>
                    <li>
                      <div className="subTitleBold">
                        {plantData.сompositionStudies[2].source}
                      </div>
                      <div>{plantData.сompositionStudies[2].title}</div>
                      <div>{plantData.сompositionStudies[2].description}</div>
                    </li>
                  </a>
                </ul>

                <div className="date">
                  {" "}
                  Дата создания {plantData.сompositionCreateDate}
                </div>
              </div>
            </div>

            <div className="tabInfoContainer">
              <div className="tabInfo">
                <div className="tabInfoTitle">Химический состав</div>
                <div>
                  {plantData.compositionDetails.parts.map((part, partIndex) => (
                    <div key={partIndex}>
                      <div className="tabInfoTitle0">{part.title}</div>
                      <div className="tagContainer">
                        {part.groups.map((group, groupIndex) => (
                          <div key={groupIndex}>
                            <div className="tabInfoTitle2">
                              {group.groupName}
                              <div className="tags">
                                {group.elements.map((element, elementIndex) => (
                                  <div key={elementIndex} className="tag">
                                    {element.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="paddingBottom"></div>
              </div>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="tabContainer">
            <div className="tabText">
              <div className="descriptionColm">
                <div>
                  {" "}
                  <div className="propertiesDescription">
                    {" "}
                    {plantData.propertiesDescription}
                  </div>
                  <div className="partTitle">Лекарственные свойства</div>{" "}
                  <div className="propertiesContainer">
                    {enrichedPropertiesData.map((property, index) => (
                      <div key={index} className="propertyItem">
                        <div className="propertyTitle">
                          {property.title}{" "}
                          <span className="propertyTitle">
                            {property.propertiesSecondName
                              ? ` •  ${property.propertiesSecondName}`
                              : ""}
                          </span>
                        </div>

                        <div className="propertyDescription">
                          {property.description}
                        </div>

                        <div>
                          <div className="propertyMedicineTitle">
                            Применяется для лечения:
                          </div>
                          <ul className="propertyMedicine">
                            {property.medicine.map((med, medIndex) => (
                              <li
                                className="propertyMedicineItem"
                                key={medIndex}>
                                - {med}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="partTitle">Противопоказания</div>
                  <div className="contraindicationContainer">
                    {plantData.propertiescontraindications.map(
                      (contraindication, index) => (
                        <div key={index}>
                          <div className="contraindicationTitle">
                            {contraindication.title}
                          </div>
                          <div className="contraindicationDescription">
                            {contraindication.description}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="partTitle">Источники</div>
                <ul>
                  <a
                    className="href"
                    href={plantData.сompositionStudies[0].link}>
                    <li>
                      <div className="subTitleBold">
                        {plantData.сompositionStudies[0].source}
                      </div>
                      <div>{plantData.сompositionStudies[0].title}</div>
                      <div>{plantData.сompositionStudies[0].description}</div>
                    </li>
                  </a>
                  <a
                    className="href"
                    href={plantData.сompositionStudies[1].link}>
                    <li>
                      <div className="subTitleBold">
                        {plantData.сompositionStudies[1].source}
                      </div>
                      <div>{plantData.сompositionStudies[1].title}</div>
                      <div>{plantData.сompositionStudies[1].description}</div>
                    </li>
                  </a>
                  <a
                    className="href"
                    href={plantData.сompositionStudies[2].link}>
                    <li>
                      <div className="subTitleBold">
                        {plantData.сompositionStudies[2].source}
                      </div>
                      <div>{plantData.сompositionStudies[2].title}</div>
                      <div>{plantData.сompositionStudies[2].description}</div>
                    </li>
                  </a>
                </ul>
                <div className="date">
                  {" "}
                  Дата создания {plantData.сompositionCreateDate}
                </div>
              </div>
            </div>

            <div className="tabInfoContainer">
              <div className="tabInfo">
                <div>
                  <div>
                    <div className="tabInfoTitle">Лекарственные свойства</div>
                    <div className="tagContainer">
                      {enrichedPropertiesData.map((property, index) => (
                        <div key={index}>
                          <div className="tabInfoTitle2">
                            {property.title}{" "}
                            {property.propertiesSecondName
                              ? ` •  ${property.propertiesSecondName}`
                              : ""}
                            <div className="tags">
                              {property.medicine.map((med, medIndex) => (
                                <div key={medIndex} className="tag">
                                  {med}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="paddingBottom"></div>
              </div>
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
