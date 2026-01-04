const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center py-10 text-gray-500">
      <span className="animate-pulse text-lg">{text}</span>
    </div>
  );
};

export default Loader;
