import React from "react";
import { IconType } from "react-icons";

export function HackathonCard(props: { icon: IconType; title: string }) {
  return (
    <div className="flex justify-center h-16 px-8 text-fontSize-5 font-fontWeight-medium bg-surface border items-center rounded w-full">
      {props.icon({ width: 30, className: "mr-3" })}
      {props.title}
    </div>
  );
}
