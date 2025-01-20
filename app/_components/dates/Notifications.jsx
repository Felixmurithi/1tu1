import NotificationsCard from "@/app/_components/dates/NotificationsCard";
import { clearNoficationAction, getNoficationsAction } from "@/app/_lib/action";

import { useEffect, useState } from "react";
import SpinnerMini from "../SpinnerMini";

function Notifications({ setTab, userId, clearNotificationsNotification }) {
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);
  // accet, declined , proposed a newtime for the date.

  async function getNofications() {
    const data = await getNoficationsAction(userId);

    if (data?.[0]) setNotifications(data.reverse());
    setLoading(false);
  }

  useEffect(() => {
    getNofications();
    clearNotificationsNotification(userId);
  }, []);

  async function clearNotification(userId) {
    await clearNoficationAction(userId);
    setNotifications((prev) => {
      return prev.filter(({ id }) => {
        return userId !== id;
      });
    });
  }

  return (
    <div className="relative">
      <div className="px-2 grid gap-4 content-start overflow-y-auto absolute top-0 bottom-0 right-0 left-0">
        {loading ? (
          <SpinnerMini />
        ) : notifications?.[0] ? (
          notifications?.map(({ name, type, id }, i) => (
            <NotificationsCard
              type={type}
              name={name}
              key={i}
              setTab={setTab}
              id={id}
              clearNotification={clearNotification}
            />
          ))
        ) : (
          "your notifications will appear here"
        )}
      </div>
    </div>
  );
}

export default Notifications;
