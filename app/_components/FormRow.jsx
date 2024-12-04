function FormRow({ children, classes, label, id, error }) {

  return (
    <div className={`grid gap-2 w-[200px] ${classes}`}>
      <label className="capitalize text-lg font" htmlFor={id} id={id}>
        {label}
      </label>
      <div className="flex flex-wrap gap-4 mobile:flex-nowrap">{children}</div>
      {error && <span>{error}</span>}
    </div>
  );
}

export default FormRow;
