function TopBar({ text, line }) {
  return (
    <div className="flex justify-between mr-11">
      <div className="font-bold text-2xl">{text}</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 font-semibold">
          {line}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
