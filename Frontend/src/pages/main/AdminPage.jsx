import { useEffect, useMemo, useState } from "react";
import ActionButton from "../../components/ActionButton";
import Table from "../../components/Table";
import tests from "../../data/tests";
import { cn } from "../../lib/utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";
import AddTypingTestModal from "../../components/AddTypingTestModal";
import DeleteTestModal from "../../components/DeleteTestModal";
import AddStenoTestModal from "../../components/AddStenoTestModal";

const AdminPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [typingTestModal, setTypingTestModal] = useState(false);
  const [deleteTestModal, setDeleteTestModal] = useState(false);
  const [stenoTestModal, setStenoTestModal] = useState(false);

  const handleDeleteTypingTest = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    console.log(id);
    setDeleteTestModal(true);
  };

  const typingTestColumns = useMemo(
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
      {
        Header: "Delete",
        accessor: "id",
        Cell: ({ value }) => (
          <RiDeleteBin6Line
            className="hover:text-red-500"
            onClick={(e) => handleDeleteTypingTest(value, e)}
          />
        ),
      },
    ],
    []
  );

  useEffect(() => {

    

    setData(tests);
  }, []);

  const handleOpenTypingTestModal = () => {
    setTypingTestModal(true);
  };

  const handleOpenStenoTestModal = () => {
    setStenoTestModal(true);
  };

  return (
    <main className="w-[100%] bg-gray-100">
      <div className=" flex flex-col w-[80%] pb-20 mx-auto min-h-[100vh]">
        <div className="flex items-center justify-between pt-10">
          <h1 className="text-[2rem] text-center font-medium ">
            Welcome Admin
          </h1>
          <span className="text-[1.4rem] ">
            Total number of users:
            <span className="text-blue-800"> 45</span>
          </span>
        </div>
        <div className="mt-[3rem] mb-[1rem] flex items-center justify-between">
          <h2 className="text-[1.8rem]">Typing tests</h2>
          <ActionButton title={"Add"} onClick={handleOpenTypingTestModal} />
        </div>
        <div
          className={cn(
            "w-[100%] max-h-[30rem] bg-white overflow-auto rounded-lg shadow hidden md:block",
            "container-scrollbar"
          )}
        >
          <Table
            columns={typingTestColumns}
            data={data}
            typeOfTests="typing-tests"
          />
        </div>
        <div className="mt-[3rem] mb-[1rem] flex items-center justify-between">
          <h2 className="text-[1.8rem]">Steno tests</h2>
          <ActionButton title={"Add"} onClick={handleOpenStenoTestModal} />
        </div>
        <div
          className={cn(
            "w-[100%] max-h-[30rem] bg-white overflow-auto rounded-lg shadow hidden md:block",
            "container-scrollbar"
          )}
        >
          <Table
            columns={typingTestColumns}
            data={data}
            typeOfTests="steno-tests"
          />
        </div>
      </div>
      <DeleteTestModal
        open={deleteTestModal}
        setDeleteTestModal={setDeleteTestModal}
      />
      <AddTypingTestModal
        open={typingTestModal}
        setTypingTestModal={setTypingTestModal}
      />
      <AddStenoTestModal
        open={stenoTestModal}
        setStenoTestModal={setStenoTestModal}
      />
    </main>
  );
};

export default AdminPage;
