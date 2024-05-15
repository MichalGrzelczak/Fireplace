import {
  faCalendarDay,
  faRocket,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex flex-col gap-8">
      <Counter />
      <div className="flex text-2xl justify-between gap-4">
        <HackathonCard
          icon={faRocket}
          title={`${data.statistics.projects} awesome projects`}
        />
        <HackathonCard
          icon={faUsers}
          title={`${data.statistics.teamMembers} team members`}
        />
        <HackathonCard
          icon={faTrophy}
          title={`${data.statistics.awards} awards to win`}
        />
        <HackathonCard
          icon={faCalendarDay}
          title={`${data.statistics.days} days full of fun and hard work`}
        />
      </div>
      <div className="p-3 bg-neutral-50">
        <HackathonResults hackathon={data.hackathon} />
      </div>
    </div>
  );
}
