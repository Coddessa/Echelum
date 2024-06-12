import downloadIcon from "../assets/icons/downLoadWhite.svg";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <button
      className="downloadBtn"
      onClick={() => {
        const datas = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}>
      <div className="downloadIcon">
        {" "}
        <img src={downloadIcon} alt="downloadIcon" />
      </div>
      Скачать Excel
    </button>
  );
};

export default DownloadBtn;
