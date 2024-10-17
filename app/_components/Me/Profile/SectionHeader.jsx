function SectionHeader({ children }) {
  return <h3 className="font-semibold opacity-50 text-xl">{children}</h3>;
}

export default SectionHeader;

export function SectionHeaderII({ children, onClickEdit, showEditButton }) {
  return (
    <div className="flex gap-4 items-center w-full justify-between pr-4">
      <h4 className="font-semibold opacity-50">{children}</h4>

      {showEditButton && (
        <button type="icon" className="w-1" onClick={onClickEdit}>
          🖊
        </button>
      )}
    </div>
  );
}
