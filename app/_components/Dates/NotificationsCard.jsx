function NotificationsCard({ type = "accepted", user, userId }) {
  const color = {
    accepted: "bg-green-500",
    declined: "bg-orange-500",
    timeChange: "bg-yello-500",
  };

  return (
    <div className="flex gap-6 ">
      <div className={`${color[type]} w-2 h-16 rounded-l-2xl`}></div>
      <div>
        <span>Jane Kimatu</span>
        <p className="font-extralight text-sm">accepted your request</p>
      </div>
    </div>
  );
}

export default NotificationsCard;

// TODO
// add numbers to notifications and messages
