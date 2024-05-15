export enum RecruitmentStatus {
  "Open",
  "Closed",
}

export enum ApplicationStatus {
  "NotApplied",
  "WaitingForApproval",
  "Confirmed",
}

export type StatusProperties = {
  text: string;
  bgColor: string;
  fontColor: string;
};

export type RecruitmentStatusProperties = {
  [value in RecruitmentStatus]: StatusProperties;
};

export type ApplicationStatusProperties = {
  [value in ApplicationStatus]: StatusProperties;
};
