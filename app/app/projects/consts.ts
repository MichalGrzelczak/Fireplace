import {
  ApplicationStatus,
  ApplicationStatusProperties,
  ProjectUser,
  RecruitmentStatus,
  RecruitmentStatusProperties,
} from "./types";

export const RECRUITMENT_STATUS_PROPERTIES: RecruitmentStatusProperties = {
  [RecruitmentStatus.Closed]: {
    text: "Closed",
    bgColor: "bg-background-accent-gray-bolder",
    fontColor: "text-white",
  },
  [RecruitmentStatus.Open]: {
    text: "Open",
    bgColor: "bg-background-accent-green-subtlest",
    fontColor: "text-text-accent-green",
  },
};

export const APPLICATION_STATUS_PROPERTIES: ApplicationStatusProperties = {
  [ApplicationStatus.NotApplied]: {
    text: "Not applied",
    bgColor: "bg-background-accent-gray-subtlest",
    fontColor: "text-text-accent-gray",
  },
  [ApplicationStatus.Confirmed]: {
    text: "Confirmed",
    bgColor: "bg-background-accent-blue-subtlest",
    fontColor: "text-text-accent-green",
  },
  [ApplicationStatus.WaitingForApproval]: {
    text: "Waiting for approval",
    bgColor: "bg-background-accent-blue-subtlest",
    fontColor: "text-text-accent-blue",
  },
};

export const EMPTY_USER: ProjectUser = {
  email: "noleader@noleader.com",
  displayName: "No Leader Yet",
  iconUrl: "",
};
