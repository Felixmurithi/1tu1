function NotificationsCard({ type, name, setTab, id }) {
  const color = {
    request: "bg-stone-300",
    rescheduled: "bg-stone-200",
    accepted: "bg-green-500",
    cancelled: "bg-stone-600",
    rejected: "bg-red-600",
  };

  const message = {
    request: `date request from ${name}`,
    accepted: `${name} accepted your date request`,
    rejected: `date request to ${name} not accepted`,
    cancelled: `date with to ${name} cancelled`,
    rescheduled: `${name} requested a date reschedule`,
  };

  return (
    <div
      className="flex gap-6 "
      onClick={() => {
        if (type == "request" || "accepted" || "rescheduled") setTab(3);
      }}
    >
      <div className={`${color[type]} w-2 h-16 rounded-l-2xl`}></div>
      <div>
        <span>{name}</span>
        <p className="font-extralight text-sm">{message[type]}</p>
      </div>
    </div>
  );
}

export default NotificationsCard;

// TODO
// add numbers to notifications and messages
