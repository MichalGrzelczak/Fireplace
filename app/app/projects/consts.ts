import {
  ApplicationStatus,
  ApplicationStatusProperties,
  RecruitmentStatus,
  RecruitmentStatusProperties,
} from "./types";

export const RECRUITMENT_STATUS_PROPERTIES: RecruitmentStatusProperties = {
  [RecruitmentStatus.Closed]: {
    text: "Closed",
    bgColor: "bg-slate-600",
    fontColor: "text-white",
  },
  [RecruitmentStatus.Open]: {
    text: "Open",
    bgColor: "bg-green-100",
    fontColor: "text-green-700",
  },
};

export const APPLICATION_STATUS_PROPERTIES: ApplicationStatusProperties = {
  [ApplicationStatus.NotApplied]: {
    text: "Not applied",
    bgColor: "bg-gray-200",
    fontColor: "text-gray-600",
  },
  [ApplicationStatus.Confirmed]: {
    text: "Confirmed",
    bgColor: "bg-green-200",
    fontColor: "text-green-900",
  },
  [ApplicationStatus.WaitingForApproval]: {
    text: "Waiting for approval",
    bgColor: "bg-blue-100",
    fontColor: "text-blue-800",
  },
};
