import NotificationsCard from "@/app/_components/dates/NotificationsCard";
import { getNoficationsAction } from "@/app/_lib/action";

import { useEffect } from "react";

function Notifications({ notifications, setTab }) {
  // accet, declined , proposed a newtime for the date.

  console.log(notifications);

  const ids = notifications?.map(({ id }) => id);

  async function sendIds() {
    if (ids[0]) await getNoficationsAction(ids);
  }

  useEffect(() => {
    sendIds();
  });

  return (
    <div className="relative">
      <div className="px-2 grid gap-4 content-start overflow-y-auto absolute top-0 bottom-0 right-0 left-0">
        {notifications?.[0]
          ? notifications?.map(({ name, type, id }) => (
              <NotificationsCard
                type={type}
                name={name}
                key={i}
                setTab={setTab}
                id={id}
              />
            ))
          : "your notifications will appear here"}
      </div>
    </div>
  );
}

export default Notifications;
