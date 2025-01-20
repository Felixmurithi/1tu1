import Button from "../Button";

function NotificationsCard({ type, name, setTab, clearNotification, id }) {
  const color = {
    request: "bg-lime-500",
    rescheduled: "bg-stone-600",
    accepted: "bg-lime-600",
    cancelled: "bg-orange-700",
    rejected: "bg-red-700",
  };

  const message = {
    request: `Date request from ${name}`,
    accepted: `${name} accepted your date request`,
    rejected: `Date request to ${name} cancelled`,
    cancelled: `Date with  ${name} cancelled`,
    rescheduled: `${name} requested to reschedule date`,
  };

  return (
    <div className="flex  w-full  ">
      <div className={`${color[type]} w-2 h-full rounded-l-2xl`}></div>
      <div className="border border-r-stone-100 border-b border-t p-2 flex justify-between w-full">
        <div
          className="grid"
          onClick={() => {
            if (type == "request" || "accepted" || "rescheduled") setTab(3);
          }}
        >
          <span className="font-bold text-sm">{name}</span>
          <p className="font-thin text-xs ">{message[type]}</p>
        </div>

        <Button
          type="icon"
          classes={"self-center font-extralight text-xl"}
          onClick={() => clearNotification(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#D9D9D9"
            className="hover:fill-stone-800"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default NotificationsCard;

// TODO
// add numbers to notifications and messages
