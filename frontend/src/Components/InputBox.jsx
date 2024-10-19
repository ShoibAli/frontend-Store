function InputBox({ labeltext, placeholder, onChange }) {
  return (
    <div>
      <div className="font-medium text-left text-sm py-2 pl-2">{labeltext}</div>
      <input
        className="shadow border-rounded border-slate-300 w-full px-2 py-1"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default InputBox;
