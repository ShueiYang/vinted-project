



const InputForm = ({
    children,
    id,
    handleChange,
    inputValue,
    placeholder,
}) => {

  return (
    <div className="flex flex-col md:flex-row w-[85%] h-28 md:h-20 justify-center mx-auto py-5 border-b border-neutral-200">
      <label className="flex flex-1 items-center h-full px-4" htmlFor={id}>
        {children}
      </label>
      <input
        className="publishField"
        type="text"
        id={id}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
