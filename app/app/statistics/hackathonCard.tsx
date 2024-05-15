import { IconDefinition, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Card } from "@/components/ui/card";

export function HackathonCard(props: { icon: IconDefinition; title: string }) {
  return (
    <div className="flex justify-center py-5 px-16 bg-neutral-50 items-center w-full">
      <FontAwesomeIcon icon={props.icon} width={25} className="mr-3" />
      {props.title}
    </div>
  );
}
