function Input({
  classes,
  id,
  type = "text",
  name,
  checked,
  onChange,
  children,
  value,
  reactHooKFormValidate,
  border = true,
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
      className={`${classes} ${
        border ? "border border-stone-400 " : ""
      } rounded h-8    px-2`}
      {...reactHooKFormValidate}
    />
  );
}

export default Input;
