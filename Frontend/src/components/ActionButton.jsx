const ActionButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#4582FF] py-2 px-4 text-white rounded-md font-bold hover:bg-[#346bda]"
    >
      {title}
    </button>
  );
};

export default ActionButton;
