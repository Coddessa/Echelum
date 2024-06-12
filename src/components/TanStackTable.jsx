import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
//import { USERS } from "../data";
import { useState } from "react";
import DownloadBtn from "./DownloadBtn";
import DebouncedInput from "./DebouncedInput";
import dataJSON from "../data.json";

const TanStackTable = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "№",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "№",
    }),
    columnHelper.accessor("plantAvator", {
      cell: (info) => (
        <img src={info?.getValue()} alt="..." className="plantAvator" />
      ),
      header: "Фото",
    }),
    columnHelper.accessor("code", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Шифр",
    }),
    columnHelper.accessor("genus", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Род",
    }),
    columnHelper.accessor("species", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Вид",
    }),
    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Кол-во",
    }),
    columnHelper.accessor("plant", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "В том числе",
    }),
    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Полив",
    }),
    columnHelper.accessor("purchase price", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Цена покупки",
    }),
    columnHelper.accessor("seller", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Продавец",
    }),

    columnHelper.accessor("Date of purchase", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Дата покупки",
    }),
    columnHelper.accessor("notes", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Заметки",
    }),
  ];

  const [data] = useState(() => dataJSON, []);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container">
      <div className="tableContainerTop">
        <div className="tableSearchContainer">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="tableSearch"
            placeholder="Поиск моих растений . . ."
          />
        </div>
        <DownloadBtn data={data} fileName={"Echelum"} />
      </div>
      <div className="tableContainer">
        <table className="table">
          <thead className="thead">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="th">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? "tr" : "secondRow tr"}
                `}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="td">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Recoard Found!</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* pagination */}
        <div className="paginationContainer">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="arrowLeft">
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="arrowRight">
            {">"}
          </button>

          <div className="page">
            <div>Страница</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} из{" "}
              {table.getPageCount()}
            </strong>
          </div>
          <span className="goToPage">
            <span className="verticalDivider">| </span> Перейти на страницу:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="inputPage"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="show">
            {[10, 20, 30, 50, 100].map((pageSize) => (
              <option className="option" key={pageSize} value={pageSize}>
                Показать {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="end"> </div>
    </div>
  );
};

export default TanStackTable;
