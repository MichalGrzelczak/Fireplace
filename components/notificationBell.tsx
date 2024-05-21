import { forwardRef } from "react";
import { FaBell } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";

interface NotificationBellProps {
  unreadCount?: number;
  onClick?: () => void;
}

export function NotificationBell(props: NotificationBellProps) {
  const unreadCount = props.unreadCount ?? 0;
  return (
    <div className="relative" onClick={props.onClick}>
      <FaBell width={16} />
      {unreadCount > 0 && (
        <Badge className="absolute m-space-0 top-[-12px]">{unreadCount}</Badge>
      )}
    </div>
  );
}
