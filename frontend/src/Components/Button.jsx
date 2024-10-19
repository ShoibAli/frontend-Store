function Button({ text, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full rounded-lg font-medium text-sm  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 text-white bg-gray-800 px-5 py-2.5 mt-2 mb-2"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
