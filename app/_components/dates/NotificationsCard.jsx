import Button from "../Button";

function NotificationsCard({ type, name, setTab, clearNotification, id }) {
  const color = {
    request: "bg-green-400",
    rescheduled: "bg-stone-600",
    accepted: "bg-green-500",
    cancelled: "bg-rose-500",
    rejected: "bg-rose-500",
  };

  const message = {
    request: `Date request from ${name}`,
    accepted: `${name} accepted your date request`,
    rejected: `Date request to ${name} not accepted`,
    cancelled: `Date with  ${name} cancelled`,
    rescheduled: `${name} requested to reschedule date`,
  };

  return (
    <div className="flex gap-6 border border-r-stone-100 border-b border-t   ">
      <div className={`${color[type]} w-2 h-16 rounded-l-2xl`}></div>
      <div
        onClick={() => {
          if (type == "request" || "accepted" || "rescheduled") setTab(3);
        }}
      >
        <span className="font-bold text-sm">{name}</span>
        <p className="font-thin text-sm ">{message[type]}</p>
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
  );
}

export default NotificationsCard;

// TODO
// add numbers to notifications and messages
