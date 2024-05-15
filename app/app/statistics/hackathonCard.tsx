import { IconDefinition, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Card } from "@/components/ui/card";

export function HackathonCard(props: { icon: IconDefinition; title: string }) {
  return (
    <div className="flex justify-center h-16 px-8 text-fontSize-5 font-fontWeight-medium bg-surface border items-center rounded w-full">
      <FontAwesomeIcon icon={props.icon} width={30} className="mr-3" />
      {props.title}
    </div>
  );
}
