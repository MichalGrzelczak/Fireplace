import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

import { NotificationData } from "@/app/api/requests/NotificationData";
import { getNotifications } from "@/app/api/requests/notifications.actions";
import { Separator } from "@/components/ui/separator";

export function Notifications(props: { notifications: NotificationData[] }) {
  return (
    <div className="flex flex-col ">
      {props.notifications.map((notification, index) => (
        <div key={index}>
          {index !== 0 && <Separator className="mt-2 mb-2" />}
          <Notification {...notification} />
        </div>
      ))}
    </div>
  );
}

export function Notification(props: NotificationData) {
  let text: React.ReactNode = undefined;
  if (props.type === "requested-participation") {
    text = (
      <>
        <b>{props.requesterName}</b> requested to join team:{" "}
        <b>{props.projectName}</b>. Accept or decline the request.
      </>
    );
  } else if (props.type === "accepted-participation") {
    text = (
      <>
        <b>{props.approverName}</b> accepted your request to join team:{" "}
        <b>{props.projectName}</b>.
      </>
    );
  } else if (props.type === "declined-participation") {
    text = (
      <>
        <b>{props.approverName}</b> declined your request to join team:{" "}
        <b>{props.projectName}</b>.
      </>
    );
  }

  return (
    <div className={`flex items-center`}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        {props?.requesterImg ? (
          <Image src={props.requesterImg} width={10} height={10} alt="User" />
        ) : (
          <FaUser />
        )}
      </div>
      <p className="w-80">{text}</p>
      {!props.isRead && (
        <div className="flex items-center justify-center w-8">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
        </div>
      )}
    </div>
  );
}

export function useNotifications() {
  const [notificationsData, setNotificationsData] = useState<
    NotificationData[]
  >([]);

  const pathname = usePathname();

  const refreshNotifications = async () => {
    const notifications = await getNotifications();
    setNotificationsData(notifications);
  };

  useEffect(() => {
    refreshNotifications();
  }, [pathname]); // refresh notifications on route changes

  return [notificationsData, refreshNotifications] as const;
}
