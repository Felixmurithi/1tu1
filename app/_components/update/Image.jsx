import { useState } from "react";
import Cropper from "react-easy-crop";

const dogImg =
  "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

function Image() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <input type="file" name="image" id="" />

      <div className={`relative h-36 bg-white`}>
        <Cropper
          image={dogImg}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <p></p>
    </div>
  );
}

export default Image;
