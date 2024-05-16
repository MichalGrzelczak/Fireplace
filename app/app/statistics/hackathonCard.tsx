import React from "react";

export function HackathonCard(props: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex justify-center h-16 px-8 text-fontSize-5 font-fontWeight-medium bg-surface border items-center rounded w-full gap-3">
      {props.icon}
      {props.title}
    </div>
  );
}
