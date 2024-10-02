function InterestList({ icon, text, children }) {
  return (
    <p className="flex gap-2 w-max px-4 py-1 rounded-md bg-stone-200 ">
      {icon && <img src="" alt="" />}
      {text && <span className="w-max">{text}</span>}
      <span className="">{children}</span>
    </p>
  );
}

export default InterestList;
