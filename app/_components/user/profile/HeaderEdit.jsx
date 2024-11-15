import Button from "../../Button";

export default function HeaderEdit({ children, onClickEdit, showEditButton }) {
  return (
    <div className="flex justify-between items-center  pr-4">
      <h4 className="font-semibold opacity-80">{children}</h4>

      {showEditButton && (
        <Button onClick={onClickEdit} type="icon">
          <img src="/svg/edit.svg" alt="" />
        </Button>
      )}
    </div>
  );
}
