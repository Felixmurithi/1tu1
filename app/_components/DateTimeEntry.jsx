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
    <div className="w-fit grid gap-1">
      <label htmlFor="date" className=" font-extralight text-sm">
        {" "}
        enter date & time:
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
