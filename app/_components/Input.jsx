function Input({
  classes,
  id,
  type = "text",
  name,
  checked,
  onChange,
  children,
}) {
  return (
    <input
      onChange={onChange}
      defaultChecked={checked}
      name={name}
      id={id}
      type={`${type}`}
      placeholder={children}
      className={`${classes} rounded-sm h-8  border border-deepSeaweed-tints-300 text-deepSeaweed-tints-300 w-fit px-2`}
    />
  );
}

export default Input;
