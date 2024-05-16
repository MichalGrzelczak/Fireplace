import { FaCalendarDay, FaRocket, FaTrophy, FaUsers } from "react-icons/fa";

import { HackathonCard } from "@/app/app/statistics/hackathonCard";
import { HackathonResults } from "@/app/app/statistics/hackathonResults";
import { hackathonData } from "@/app/app/statistics/types";

import Counter from "./counter";

export interface StatisticsData {
  projects: number;
  teamMembers: number;
  awards: number;
  days: number;
}

function loadStatistics(): Promise<StatisticsData> {
  return Promise.resolve({
    projects: 51,
    teamMembers: 200,
    awards: 9,
    days: 5,
  });
}

const loadStatisticsData = async () => {
  const statistics = await loadStatistics();
  const hackathon = hackathonData;
  return { statistics, hackathon };
};

export default async function Statistics() {
  const data = await loadStatisticsData();

  return (
    <div>
      <div className={"grid gap-4 -mt-10 -mx-10 pt-10 bg-scale-neutral-100"}>
        <Counter />
        <div className="flex text-2xl justify-between gap-10 mb-4 mx-5">
          <HackathonCard
            icon={FaRocket}
            title={`${data.statistics.projects} awesome projects`}
          />
          <HackathonCard
            icon={FaUsers}
            title={`${data.statistics.teamMembers} team members`}
          />
          <HackathonCard
            icon={FaTrophy}
            title={`${data.statistics.awards} awards to win`}
          />
          <HackathonCard
            icon={FaCalendarDay}
            title={`${data.statistics.days} days full of fun and hard work`}
          />
        </div>
      </div>
      <HackathonResults hackathon={data.hackathon} />
    </div>
  );
}
