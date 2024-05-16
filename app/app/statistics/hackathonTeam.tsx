import React from "react";
import { FaMedal } from "react-icons/fa";

import { Category, Stage, Team } from "@/app/app/statistics/types";

export function HackathonTeam(props: {
  team: Team;
  stage: Stage;
  category: Category;
}) {
  return (
    <div className="flex gap-space-2">
      {props.team.id === props.stage.winner?.id && (
        <FaMedal width={18} className={"text-scale-yellow-300"} />
      )}
      {props.team.id === props.stage.secondPlace?.id && (
        <FaMedal width={18} className={"text-neutral-400"} />
      )}
      {props.team.id === props.stage.thirdPlace?.id && (
        <FaMedal width={18} className={"text-scale-yellow-900"} />
      )}
      <div>
        <h2>{props.team.name}</h2>
        {isLastStage(props.stage, props.category) && (
          <span className="italic">{props.team.projectName}</span>
        )}
      </div>
    </div>
  );
}

function isLastStage(stage: Stage, category: Category) {
  return stage.id === category.stages.at(-1)?.id;
}
