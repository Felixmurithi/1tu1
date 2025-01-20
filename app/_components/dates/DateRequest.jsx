import DateTimeEntry from "@/app/_components/DateTimeEntry";
import Button from "@/app/_components/Button";
import { getLocalTimeZone, now } from "@internationalized/date";
import { updateDateAction, getUserAction } from "@/app/_lib/action";
import { useState } from "react";
import { SpinnerMiniII } from "@/app/_components/SpinnerMini";

export default function DateRequest({
  setOpenRequest,
  toast,
  date,
  userId,
  refetchAllDates,
  refetchAllNearbyDates,
  radius,
  closeCard,
  name,
  changeTab,
  mobile,
}) {
  const [dateTime, setDateTime] = useState(now(getLocalTimeZone()));
  const [loading, setLoading] = useState(false);

  function displayLoadingSpinner() {
    setLoading(true);
  }
  function stopLoadingSpinner() {
    setLoading(false);
  }

  // gets the differnce between the first date and the second, if its positive the first date is bigger, comparing with > 0 gets a bollean
  //if false fisrst date is behind the second
  // console.log(now(getLocalTimeZone()).add({ days: 10 }).compare(dateTime) > 0);

  // const current = new Date(dateTime); //'Mar 11 2015' current.getTime() = 1426060964567
  // console.log(current);
  // const followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
  // followingDay.toLocaleDateString();

  // returns date, the intial object is not modified, adding directly dopes not work
  // console.log(dateTime.add({ weeks: 3 }));

  // const c = dateTime.toAbsoluteString();

  // 2025-01-13T17:18:46.913+03:00[Africa/Nairobi]
  //[Africa/Nairobi]
  return (
    <div className="flex flex-col gap-4">
      <DateTimeEntry dateTime={dateTime} setDateTime={setDateTime} />
      <div className="flex justify-between">
        <Button
          classes={"min-w-32"}
          onClick={async () => {
            displayLoadingSpinner();
            const [{ active }] = await getUserAction({
              fields: "active",
              userId,
            });

            if (active) {
              stopLoadingSpinner();
              closeCard();
              return toast.error("u can only have 1 date at a time");
            }

            const [{ active: useractive }] = await getUserAction({
              fields: "active",
              userId: date.userid,
            });

            if (useractive) {
              if (radius) refetchAllNearbyDates();
              else refetchAllDates();
              stopLoadingSpinner();
              closeCard();
              return toast.error("user not available");
            }

            if (
              !(now(getLocalTimeZone()).add({ days: 10 }).compare(dateTime) > 0)
            ) {
              stopLoadingSpinner();

              return toast.error("set date not more than 10 days from now");
            }
            if (
              !(now(getLocalTimeZone()).add({ hours: 3 }).compare(dateTime) < 0)
            ) {
              stopLoadingSpinner();

              return toast.error("set more than 3 hours from now");
            }
            const formData = new FormData();
            formData.append("userid", userId);
            formData.append("date", dateTime.toAbsoluteString());
            formData.append("dateid", date.userid);
            formData.append("name", name);

            await updateDateAction(formData);

            toast.success("Date request sent");

            if (radius) refetchAllNearbyDates();
            else refetchAllDates();

            closeCard();
            stopLoadingSpinner();
            changeTab(3);
          }}
        >
          {!loading ? "send request" : <SpinnerMiniII />}
        </Button>
        {mobile ? (
          <Button type="icon" onClick={() => setOpenRequest?.(null)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="m357-384 123-123 123 123 57-56-180-180-180 180 57 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

// react spectrum bad example of how to do examples
