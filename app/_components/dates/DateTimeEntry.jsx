import { useState } from "react";
import {
  defaultTheme,
  DatePicker,
  Provider,
  DateField,
} from "@adobe/react-spectrum";
// import { getLocalTimeZone, today} from "@internationalized/date";
import { getLocalTimeZone, today, now } from "@internationalized/date";

// Dialog>
//                 <DateTimeEntry />
//               </Dialog>

// const newPath = `${pathname}?showDialog=y`;
// console.log(newPath);
// window.history.replaceState(null, "", newPath);
// const pathname = usePathname();
// const searchParams = useSearchParams();

function DateTimeEntry() {
  // const [date, setDate] = useState(today(getLocalTimeZone()));
  const [date, setDate] = useState(now(getLocalTimeZone()));

  console.log(date);
  return (
    <Provider theme={defaultTheme} zIndex={50}>
      <div className="grid px-2">
        <label htmlFor="date">Enter Date</label>
        <DatePicker
          portalId="my-popper"
          // aria-labelledby="date"
          value={date}
          onChange={setDate}
          name="birthday"
          isRequired
          granularity="minute"
          hideTimeZone
        />
      </div>
    </Provider>
  );
}

export default DateTimeEntry;
