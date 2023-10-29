import React from "react";
import { useTable, usePagination } from "react-table";
import "./table.css";

const Table = ({ results, handleSearch, currentPage, totalPages }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "avatar_url",
        Cell: ({ row }) => (
          <img
            className="rounded p-1"
            src={row.values.avatar_url}
            alt="Avatar"
            width={30}
          />
        ),
      },
      {
        Header: "User Name",
        accessor: "login",
      },
      {
        Header: "Followers Count",
        accessor: "followers",
      },
      {
        Header: "User Followers",
        accessor: "followers_url",
        Cell: ({ row }) => (
          <a
            href={`https://github.com/${row.values.login}?tab=followers`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Followers
          </a>
        ),
      },
      {
        Header: "User Profile",
        accessor: "html_url",
        Cell: ({ row }) => (
          <a
            href={row.values.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Profile
          </a>
        ),
      },
    ],
    []
  );

  const table = useTable(
    {
      columns,
      data: results,
    },
    usePagination
  );

  const nextPage = () => {
    console.log(currentPage, totalPages);
    if (currentPage < totalPages) {
      handleSearch(currentPage + 1);
    }
  };

  const previousPage = () => {
    console.log(currentPage, totalPages, "pr");
    if (currentPage > 1) {
      handleSearch(currentPage - 1);
    }
  };
  return (
    <div className="table-container">
      <table {...table.getTableProps()} className="user-table">
        <thead>
          {table.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...table.getTableBodyProps()}>
          {table.page.map((row) => {
            table.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>{" "}
        <button
          className={`next ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>{" "}
      </div>
    </div>
  );
};

export default Table;
