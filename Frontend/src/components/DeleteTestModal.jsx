import React from "react";

const DeleteTestModal = ({ open, setDeleteTestModal }) => {
  const handleClose = () => {
    console.log("close");
    setDeleteTestModal(false);
  };

  const handleDelete = () => {
    console.log("delete");
    setDeleteTestModal(false);
  };

  if (open) {
    return (
      <main className="w-[100%] h-[100vh] bg-gray-600 bg-opacity-70 fixed top-0 left-0 flex items-center justify-center">
        <div className="absolute m-auto w-[30vw] max-w-[25rem]  bg-white shadow-lg flex flex-col rounded-md py-5 px-7">
          <h1 className="text-[1.9rem] mb-5 text-center">Confirm to Delete</h1>
          <div className="my-3 mt-3 flex items-center justify-center gap-10">
            <button
              onClick={handleClose}
              className="border-2 border-gray-400 text-gray-400 font-bold hover:border-black hover:text-black py-3 px-5 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 border-2 border-red-500 hover:border-red-700 text-white font-bold py-3 px-5 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </main>
    );
  }
  return null;
};

export default DeleteTestModal;
