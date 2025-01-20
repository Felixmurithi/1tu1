import Button from "@/app/_components/Button";
import {
  acceptAction,
  cancelAction,
  getUserAction,
  rescheduleAction,
} from "@/app/_lib/action";
import { useEffect, useState } from "react";
import SpinnerMini from "../SpinnerMini";
import DateTimeEntry from "../DateTimeEntry";
import { getLocalTimeZone, now } from "@internationalized/date";

export default function UserDate({
  userId,
  toast,
  notify,
  name,
  refetchAllDates,
  changeTab,
}) {
  const [reload, setReload] = useState(false);
  const [date, setDate] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [newDate, setNewDate] = useState(now(getLocalTimeZone()));
  async function getDateDetails() {
    setReload(false);

    const [user] = await getUserAction({
      fields: ["accept", "dateid", "date", "active"],
      userId,
    });

    if (!user.active) return setLoading(false);
    else setUser(user);
    const [date] = await getUserAction({
      fields: ["name", "image", "active", "accept"],
      userId: user.dateid,
    });
    if (date.active) setDate(date);
    setLoading(false);
  }

  useEffect(
    function () {
      getDateDetails();
    },
    [reload]
  );

  function refetchDate() {
    setLoading(true);
    setReload(true);
  }

  // TODO-nested function  return
  // TODO- for u to send date u have alrweady accepted, for u too reschedule u accept first

  async function accept() {
    //set state- stop resecheduling- accept again
    const [{ date, dateid }] = await getUserAction({
      fields: ["dateid", "date"],
      userId: user.dateid,
    });
    //check if date is still on & time the same
    if (dateid !== userId) {
      // jsut show notification thing, the notifications will be fetched on entry
      notify();
      // then reload
      refetchDate();

      return toast.error("date was cancelled");
    }

    if (date !== user.date) {
      notify();
      refetchDate();
      return toast.error("date was reschedulled");
    }

    //if date accept date
    setUser((val) => {
      return { ...val, accept: true };
    });

    setAcceptLoading(true);

    await acceptAction(userId, user.dateid, name);
    setAcceptLoading(false);
  }

  // the reschedule button only available if date has accepted  date and the date sender accepts before sending by default

  async function rescheduleDate() {
    setRescheduleLoading(true);
    // cehck date is with more than 3 hrs less tha 1odays
    if (!(now(getLocalTimeZone()).add({ days: 10 }).compare(newDate) > 0)) {
      setRescheduleLoading(false);

      return toast.error("set date not more than 10 days from now");
    }
    if (!(now(getLocalTimeZone()).add({ hours: 3 }).compare(newDate) < 0)) {
      setRescheduleLoading(false);

      return toast.error("set more than 3 hours from now");
    }

    // esnure date has not been cancelled
    // check if ur date hasnt cancelled already
    //check if date is still on & time the same then sender of date or reschedule requests accept before sending and cannot change data after that
    // that can however they can cancel;
    const [{ date, dateid }] = await getUserAction({
      fields: ["dateid", "date"],
      userId: user.dateid,
    });

    if (dateid !== userId) {
      // jsut show notification thing, the notifications will be fetched on entry
      notify();
      // then reload
      refetchDate();
      toast.error("date was cancelled");
      return refetchAllDates();
    }
    if (date !== user.date) {
      notify();
      refetchDate();
      toast.error("date was reschedulled");
      return refetchAllDates();
    }

    // update data
    const formData = new FormData();
    formData.append("userid", userId);
    formData.append("date", newDate.toAbsoluteString());
    formData.append("dateid", user.dateid);
    formData.append("name", name);
    await rescheduleAction(formData);
    setRescheduleLoading(false);
    toast.success("date rescheduled");
    //if date accept date
    setUser((val) => {
      return { ...val, accept: true };
    });
    setDate((val) => {
      return { ...val, accept: false };
    });
  }

  async function cancel() {
    // set db date details to null
    setCancelLoading(true);
    await cancelAction(userId, user.dateid, name);
    setCancelLoading(false);

    // reload
    refetchDate();
    // set state to null
    setUser(null);
    setDate(null);
    toast.success("date cancelled");
    refetchAllDates();
    changeTab(0);
  }

  // useEffect(
  //   function () {
  //     if (user?.date) getDate(user.date);
  //   },
  //   [user?.date]
  // );
  // always add taht dependncy array otherwise u end up in a loop.

  // console.log(date.image);
  // image not available before render

  // RESCHEDULE
  // if date accepeted it can be reschedul;led- check wether date of user has accpeted if yes, u can make it possibe to reschedule and when rescheduling set user accept to true, and their date will find it true butb set the date accept to false,

  // when the date recieved the rescheduled notification their date , this user accept will be true- they can reschedule

  //ACCEPT
  // accept when nuser has not yet accepted
  //

  // console.log(date.accept);

  return (
    <>
      {loading ? (
        <SpinnerMini />
      ) : !date?.active ? (
        <p className="font-extralight">your date will appear here</p>
      ) : (
        <div className="border border-stone-300 rounded-lg p-4 h-fit grid gap-8">
          <div className="grid gap-4">
            <p className="font-thin text-sm">
              date {date.accept ? "with" : "invite to"}:
            </p>
            <div className="flex items-center gap-2 ">
              <img
                src={date.image}
                alt="profile picture"
                className="w-[80px] h-[80px] rounded-full bg-stone-200"
              />
              <h4 className=" font-bold text-lg ">{date.name}</h4>
            </div>

            <div className="flex  flex-wrap gap-2 text-xs font-thin">
              <div className="flex w-fit h-fit rounded border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="16px"
                  fill="#9a3412"
                >
                  <path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
                </svg>

                <span className="  p-1 ">
                  {new Date(user.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex  w-fit h-fit rounded border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="16px"
                  fill="#9a3412"
                >
                  <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                </svg>
                <span className=" p-1  ">
                  {new Date(user.date).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
            {date.accept ? (
              reschedule && !user.accept ? (
                <div className="grid gap-3 border rounded-md p-2">
                  <DateTimeEntry dateTime={newDate} setDateTime={setNewDate} />

                  <div className="self-center h-fit w-fit flex gap-3">
                    <div className="h-fit self-center">
                      {rescheduleLoading ? (
                        <SpinnerMini />
                      ) : (
                        <Button
                          type="icon"
                          classes={"hover:bg-transparent"}
                          onClick={() => {
                            rescheduleDate();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            className="fill-stone-700 hover:fill-stone-500 bg-t"
                          >
                            <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                          </svg>
                        </Button>
                      )}
                    </div>
                    <Button
                      type="icon"
                      classes={"hover:bg-transparent"}
                      onClick={() => setReschedule(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        className="fill-stone-700 hover:fill-stone-500 "
                      >
                        <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  type="secondary"
                  onClick={() => {
                    setReschedule(true);
                  }}
                >
                  Reschedule
                </Button>
              )
            ) : (
              ""
            )}
          </div>

          {/* this is meant for the sender, teh cant accept the same date thery were sending */}
          <div className="flex justify-around">
            {acceptLoading ? (
              <div className="h-fit self-center">
                <SpinnerMini />
              </div>
            ) : !user.accept ? (
              <Button onClick={() => accept()}>
                {acceptLoading ? <SpinnerMini /> : "Accept"}
              </Button>
            ) : (
              ""
            )}

            <Button
              type="secondary"
              classes={"self-center"}
              onClick={() => cancel()}
            >
              {cancelLoading ? <SpinnerMini /> : "cancel"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="hover:fill-stone-400 fill-stone-900"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg> */
}
