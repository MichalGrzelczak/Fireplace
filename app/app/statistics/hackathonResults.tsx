import React from "react";

import { HackathonDateSelector } from "@/app/app/statistics/hackathonDateSelector";
import { HackathonTeam } from "@/app/app/statistics/hackathonTeam";
import { Category, Hackathon } from "@/app/app/statistics/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function HackathonResults(props: { hackathon: Hackathon }) {
  const { categories } = props.hackathon;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <h1 className="font-medium my-auto">Winners</h1>
        <Separator className="h-auto" orientation="vertical" />
        <HackathonDateSelector
          dates={["may-2024", "october-2023"]}
          selectedDate={"may-2024"}
        />
      </div>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <HackathonCategoryAccordion key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export function HackathonCategoryAccordion({
  category,
}: {
  category: Category;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      key={category.id}
      className="border rounded"
    >
      <AccordionItem value={category.id}>
        <AccordionTrigger>{category.name}</AccordionTrigger>
        <AccordionContent className="flex">
          {category.stages.map((stage, index) => (
            <div className="flex-1 flex" key={stage.id}>
              {index > 0 && (
                <Separator className="mr-4" orientation="vertical" />
              )}
              <div className="flex flex-col gap-2 pl-8">
                <div className="flex gap-2">
                  <h3 className="font-medium">{stage.name}</h3>
                  <Badge className="bg-scale-neutral-800">
                    {stage.teams.length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {stage.teams.map((team) => (
                    <HackathonTeam
                      key={team.id}
                      team={team}
                      stage={stage}
                      category={category}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
