import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import tests from "../../../data/tests";
import Table from "../../../components/Table";

const TypingTests = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "S.No.",
        accessor: "sno",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Language",
        accessor: "language",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  useEffect(() => {
    setData(tests);
  }, []);

  const handleClick = (index) => {
    console.log(data[index].id);
    navigate(`/typing-tests/${data[index].id}`);
  }

  return (
    <main className="flex flex-col min-h-[100vh] bg-gray-100 pb-20">
      <h1 className="text-[2rem] text-center mt-10 font-medium" >Typing Tests</h1>
      <div className="w-[80vw] bg-white m-auto mt-[3rem] overflow-auto rounded-lg shadow hidden md:block">
        <Table columns={columns} data={data} />
      </div>

      <div className="w-[80%] max-w-[35rem] mt-[3rem] mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
        {
          data.map((test, i)=>(
            <div key={i} className="bg-white space-y-3 p-4 rounded-lg shadow hover:bg-gray-200 " onClick={()=>handleClick(i)} >
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-blue-500 font-bold" >#{test.id}</span>
                <span className="text-gray-500">{test.date}</span>
              </div>
              <p className="text-sm text-gray-700" >{test.name}</p>
              <p className="text-sm font-medium text-black" >{test.language}</p>
            </div>
          ))
        }

      </div>
    </main>
  );
};

export default TypingTests;
