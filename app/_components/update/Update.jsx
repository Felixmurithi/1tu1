"use client";

import FormRow from "@/app/_components/FormRow";
import Button from "@/app/_components/Button";
import Image from "@/app/_components/update/Image";
import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Provider, defaultTheme, DatePicker } from "@adobe/react-spectrum";

function Update() {
  const [date, setDate] = useState(today(getLocalTimeZone()));
  return (
    <div>
      <form className="w-[60%] h-fit  border p-4 grid gap-4 justify-start">
        <h3>Sign up</h3>

        <FormRow label="Profile Picture">
          <Image />
        </FormRow>

        <FormRow label="gender" id="lastName">
          <select id="">
            <option value="" hidden>
              select
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </FormRow>
        <FormRow id={"birthday"} label={"Birthday"}>
          <Provider theme={defaultTheme}>
            <DatePicker
              aria-labelledby="birthday"
              value={date}
              onChange={setDate}
              isRequired
            />
          </Provider>
        </FormRow>

        <Button>Submit</Button>
      </form>

      <Button>Skip</Button>
    </div>
  );
}

export default Update;

//   <html>
// <body>
// <input name="image" type="file" id="fileName" accept=".jpg,.jpeg,.png" onchange="validateFileType()"/>
// <script type="text/javascript">
//     function validateFileType(){
//         var fileName = document.getElementById("fileName").value;
//         var idxDot = fileName.lastIndexOf(".") + 1;
//         var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
//         if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
//             //TO DO
//         }else{
//             alert("Only jpg/jpeg and png files are allowed!");
//         }
//     }
// </script>
// </body>
// </html>

//Image
///lcal
// diont even beed dimsnions. teh are added auto by next depending on your layout sizing.

//remote
// remote images in next needs dimensions to eb able to calculate the right size depending on teh scren size
// style={{
//   objectFit: 'cover', // cover, contain, none
// }}
