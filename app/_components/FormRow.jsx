function FormRow({ children, classes, label, id, error }) {
  return (
    <div className={`grid gap-2 w-full ${classes}`}>
      <label className="capitalize" htmlFor={id}>
        {label}
      </label>
      <div className="flex flex-wrap gap-4 mobile:flex-nowrap">{children}</div>
      {error && <span>{error}</span>}
    </div>
  );
}

export default FormRow;
