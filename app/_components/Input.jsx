function Input({
  classes,
  id,
  type = "text",
  name,
  checked,
  onChange,
  children,
  value,
}) {
  return (
    <input
      onChange={onChange}
      defaultChecked={checked}
      name={name}
      value={value}
      id={id}
      type={`${type}`}
      placeholder={children}
      className={`${classes} rounded-sm h-8  border  px-2`}
    />
  );
}

export default Input;
