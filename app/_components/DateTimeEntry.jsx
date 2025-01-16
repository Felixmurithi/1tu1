import { useState } from "react";
import {
  defaultTheme,
  // DatePicker,
  Provider,
  DateField,
} from "@adobe/react-spectrum";

function DateTimeEntry({ dateTime, setDateTime }) {
  // const [date, setDate] = useState(today(getLocalTimeZone()));

  return (
    <div className=" w-fit">
      <label htmlFor="date" className=" text-sm">
        {" "}
        enter date:
      </label>
      <Provider theme={defaultTheme}>
        <DateField
          width="size-100"
          height={"size-10"}
          aria-labelledby="date"
          value={dateTime}
          onChange={setDateTime}
          name="birthday"
          isRequired
          granularity="minute"
          hideTimeZone
        />
      </Provider>
    </div>
  );
}

export default DateTimeEntry;

{
  /* <DatePicker
// aria-labelledby="date"
value={date}
onChange={setDate}
name="birthday"
isRequired
granularity="minute"
hideTimeZone
/> */
}
