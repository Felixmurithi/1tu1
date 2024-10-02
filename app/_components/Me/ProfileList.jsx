function ProfileList({ icon, text, children }) {
  return (
    <p className="flex gap-3">
      {icon && <img src="" alt="" />}
      {text && <span className="w-max opacity-70">{text} :</span>}
      <span className=" opacity-50 ">{children}</span>
    </p>
  );
}

export default ProfileList;
