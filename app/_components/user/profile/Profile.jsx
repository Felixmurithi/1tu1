import Bio from "@/app/_components/user/Profile/Bio";

export default function Profile() {
  // const { id } = useParams();
  // const [img, setImg] = useState("");

  // const [edit, setEdit] = useState(false);

  // useEffect(function () {
  //   setImg(user.profileImage);
  //   return URL.revokeObjectURL(imgBlob);
  // });

  // function changeprofile(e) {
  //   if (imgBlob) URL.revokeObjectURL(imgBlob);
  //   if (e.target.files && e.target.files[0]) {
  //     const profileImage = new FormData();
  //     profileImage.append("image", e.target.files[0]);
  //     profileImage.append("user", userName);
  //     uploadProfileImage(profileImage);

  //     const imgURL = URL.createObjectURL(e.target.files[0]);
  //     setImgBlob(imgURL);
  //     setEdit(false);
  //     // URL.revokeObjectURL(imgURL);
  //   }
  // }

  // async function removeImage() {
  //   if (img) URL.revokeObjectURL(img);
  //   if (user.profileImage)
  //     await deleteprofileImage({
  //       profileImage: user.profileImage,
  //       user: id,
  //     });
  //   setImg("");
  //   setImgBlob("");
  // }

  return (
    <div className="bg-grey py-4">
      <div className="grid   px-10   w-full flex-wrap gap-8  grid-cols-[1fr_2fr]">
        <div className="flex gap-4">
          <div className="grid justify-end">
            <img
              src="/svg/account.svg"
              alt=""
              className="border-2 w-[150px]"
              // onClick={() => setEdit((prev) => true)}
            />
            <input
              type="file"
              hidden
              // onChange={(e) => changeprofile(e)}
            />
          </div>

          <div className="grid h-fit gap-3">
            <p className="font-bold">User Name</p>
            <p className="text-sm opacity-50">MERU</p>
          </div>
        </div>
        <div className="grid h-fit gap-6 justify-self-end">
          <div className="grid grid-cols-2 ">
            <div className="grid h-fit justify-self-start gap-2">
              <p className="font-semibold">age</p>
              <p className="opacity-50 p-1 bg-white shadow-md">34</p>
            </div>
            <div className="grid justify-self-start h-fit gap-2">
              <img src="/svg/woman.svg" className="text-rose-700" alt="" />
              <p className="opacity-50 bg-white shadow-md p-1">female</p>
            </div>
          </div>
          <Bio />
        </div>
      </div>
    </div>
  );
}
