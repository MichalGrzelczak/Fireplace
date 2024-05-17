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
    <>
      <div
        className={
          "grid gap-space-3 -mt-space-3 -mx-space-3 py-space-3 bg-scale-neutral-100"
        }
      >
        <Counter />
        <div className="flex flex-col lg:flex-row text-fontSize-3 justify-between gap-space-4 mb-space-1 mx-space-3">
          <HackathonCard
            icon={<FaRocket width={30} />}
            title={`${data.statistics.projects} awesome projects`}
          />
          <HackathonCard
            icon={<FaUsers width={30} />}
            title={`${data.statistics.teamMembers} team members`}
          />
          <HackathonCard
            icon={<FaTrophy width={30} />}
            title={`${data.statistics.awards} awards to win`}
          />
          <HackathonCard
            icon={<FaCalendarDay width={30} />}
            title={`${data.statistics.days} days full of fun and hard work`}
          />
        </div>
      </div>
      <HackathonResults hackathon={data.hackathon} />
    </>
  );
}
