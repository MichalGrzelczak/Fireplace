import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Category, Stage, Team } from "@/app/app/statistics/types";

export function HackathonTeam(props: {
  team: Team;
  stage: Stage;
  category: Category;
}) {
  return (
    <div className="flex gap-2">
      {props.team.id === props.stage.winner?.id && (
        <FontAwesomeIcon
          width={18}
          className="text-yellow-300"
          icon={faMedal}
        />
      )}
      {props.team.id === props.stage.secondPlace?.id && (
        <FontAwesomeIcon width={18} className="text-gray-500" icon={faMedal} />
      )}
      {props.team.id === props.stage.thirdPlace?.id && (
        <FontAwesomeIcon
          width={18}
          className="text-yellow-900"
          icon={faMedal}
        />
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
