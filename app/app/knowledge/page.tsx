import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Knowledge() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 overflow-y-auto">
      <div className="flex-1">
        <p className="text-2xl font-semibold mb-6">Confluence knowledge base</p>
        <div className="p-6 border border-border-input">
          <ul
            className="pl-3"
            style={{ listStyle: "disc", color: "var(--link)" }}
          >
            <li className="mb-1">
              <a
                className="link"
                target="_blank"
                href="https://appfireteam.atlassian.net/wiki/spaces/CBW/pages/95937921186/Appfire+Ignite#Disclaimer"
              >
                Disclaimer
              </a>
            </li>
            <li className="mb-1">
              <a
                className="link"
                target="_blank"
                href="https://appfireteam.atlassian.net/wiki/spaces/CBW/pages/95937921186/Appfire+Ignite#Objectives"
              >
                Objectives
              </a>
            </li>
            <ul
              className="pl-3"
              style={{ listStyle: "disc", color: "var(--link)" }}
            >
              <li className="mb-1">
                <a
                  className="link"
                  target="_blank"
                  href="https://appfireteam.atlassian.net/wiki/spaces/CBW/pages/95937921186/Appfire+Ignite#Ignite-creativity%2C-innovation-and-engagement"
                >
                  Iginite creativity, innovation and engagement
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="link"
                  target="_blank"
                  href="https://appfireteam.atlassian.net/wiki/spaces/CBW/pages/95937921186/Appfire+Ignite#Foster-global-collaboration"
                >
                  Foster global collaboration
                </a>
              </li>
            </ul>
            <li className="mb-1">
              <a
                className="link"
                target="_blank"
                href="https://appfireteam.atlassian.net/wiki/spaces/CBW/pages/95937921186/Appfire+Ignite#High-level-format"
              >
                High level format
              </a>
            </li>
            <li className="mb-1">
              <a
                className="link"
                target="_blank"
                href="https://appfireteam.atlassian.net/wiki/spaces/CBW/pages/95937921186/Appfire+Ignite#Event-dates"
              >
                Event dates
              </a>
            </li>
            <li className="mb-1">
              <a
                className="link"
                target="_blank"
                href="https://appfireteam.atlassian.net/wiki/spaces/CBW/pages/95937921186/Appfire+Ignite#FAQ"
              >
                FAQ
              </a>
            </li>
            <ul
              className="pl-3"
              style={{ listStyle: "disc", color: "var(--link)" }}
            >
              <li className="mb-1">
                <a className="link" href="">
                  What is the purpose of the Appfire Ignite Hackathon?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  What is the purpose of the Appfire Ignite Hackathon?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  How Appfire supports the hackathon goals?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  When will Appfire Ignite Hackathon happen?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Who should enter Appfire Ignite Hackathon?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  What does the participant role look like?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Should I participate if I am a QA?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Should I participate if I am a DevOps?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Should I participate if I am a Head of Product Engineering
                  (HOPE)?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Should I participate if I am a B2B contractor?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  How do I choose the right category for the topic?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Who approves ideas/topics?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  What does the advisor role look like?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  How many members should a team have?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  What can I do during the hackathon?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  What can I do as a QA during the Appfire Ignite?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  How do I submit my Appfire Ignite Hackathon idea?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Where I can check if my idea is approved?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  How long should I wait for my idea&apos;s approval?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Can people outside engineering (like Designers, POs, PMs etc.)
                  register their ideas?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Can I submit an idea and not implement it?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Can I use paid services, e.g. AI tools?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  How do I join a team or find a team?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  How many members should the team have?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Can people outside engineering (like Designers, POs, PMs,
                  etc.) join topics during the engineering registration? Can
                  they join later?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  What if I don’t find a team on time? Will I be assigned to a
                  random team?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  What happens if someone will not register?
                </a>
              </li>
              <li className="mb-1">
                <a className="link" href="">
                  Can I actively work in two or more teams?
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <div>
          <p className="text-2xl font-semibold mb-6">Quick actions</p>
          <Button
            style={{ backgroundColor: "var(--scale-neutral-200)" }}
            className="text-black block mb-3"
          >
            Join Slack channel #appfire-ignite
          </Button>
          <Button
            style={{ backgroundColor: "var(--scale-neutral-200)" }}
            className="text-black mb-3"
          >
            Add Ignite event to calendar
          </Button>
        </div>
        <Separator className="my-3" />
        <div className="mt-3">
          <p className="text-2xl font-semibold mb-4">Timeline</p>
          <p className="mb-4">
            <span className="font-bold">Registration </span> 18 May 2023 - 23
            June 2023
          </p>
          <p className="mb-4">
            <span className="font-bold">Team compositions </span> 26 June 2023 -
            6 July 2023
          </p>
          <p className="mb-4">
            <span className="font-bold">Hacking </span> 10 July 2023 - 14 July
            2023
          </p>
          <p className="mb-4">
            <span className="font-bold">Winners selection </span> 17 July 2023 -
            20 July 2023
          </p>
        </div>

        <div className="mt-6">
          <p className="text-2xl font-semibold mb-6">Recordings</p>
          <div style={{ color: "var(--link)" }}>
            <a className="link block mb-4" href="">
              Kick of
            </a>
            <a className="link block mb-4" href="">
              Presentation Subdivision A
            </a>
            <a className="link block mb-4" href="">
              Presentation Subdivision B
            </a>
            <a className="link block mb-4" href="">
              Presentation Subdivision C
            </a>
            <a className="link block mb-4" href="">
              Presentation Subdivision D
            </a>
            <a className="link block mb-4" href="">
              Presentation Subdivision E
            </a>
            <a className="link block mb-4" href="">
              Presentation Subdivision F
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
