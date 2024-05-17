import React from "react";

export function HackathonCard(props: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex justify-center h-size-64 px-space-4 text-fontSize-5 font-fontWeight-medium bg-surface border items-center rounded w-full gap-space-2">
      {props.icon}
      {props.title}
    </div>
  );
}
