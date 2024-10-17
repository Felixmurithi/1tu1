"use client";

function Select({ text, options, classes, onChange, name, id, onClickOption }) {
  return (
    <select
      name={name}
      id={id}
      className={`${classes} px-2 rounded-md bg-deepSeaweed-tints-700`}
      onChange={onChange}
    >
      <option hidden value="">
        {text}
      </option>
      {options.map((option, i) => (
        <option value={option} key={i} onClick={() => onClickOption(option)}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
