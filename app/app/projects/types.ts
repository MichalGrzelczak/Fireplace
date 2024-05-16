export enum RecruitmentStatus {
  "Closed",
  "Open",
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

export type ProjectUser = {
  email: string;
  iconUrl: string;
  displayName: string;
};
