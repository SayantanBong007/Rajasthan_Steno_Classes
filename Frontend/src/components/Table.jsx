import React from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

const Table = ({ columns, data, typeOfTests }) => {

    const navigate = useNavigate();

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });


  
  const handleClick = (index) => {
    console.log(data[index].id);
    navigate(`/${typeOfTests}/${data[index].id}`);
  }

  return (
    <table {...getTableProps()} className="w-[100%]">
      <thead className="bg-gray-300 text-left border-b-[0.1rem] border-b-slate-400">
        {headerGroups.map((headerGroup, i1) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i1} >
            {headerGroup.headers.map((column, i2) => (
              <th {...column.getHeaderProps()} key={i2} className="py-4 px-6" >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
        {rows.map((row, i1) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i1} className="hover:bg-gray-200 cursor-pointer" onClick={()=>handleClick(i1)} >
              {row.cells.map((cell, i2) => {
                return (
                  <td {...cell.getCellProps()} key={i2} className=" text-gray-700 py-4 px-6 whitespace-nowrap">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
