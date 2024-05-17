import { Project } from "@/app/app/projects/columns";
import { EMPTY_USER } from "@/app/app/projects/consts";
import { HackProject, JiraUser } from "@/app/app/projects/jiraApiTypes";
import {
  ApplicationStatus,
  ProjectUser,
  RecruitmentStatus,
} from "@/app/app/projects/types";

export function mapHackProjectToProject(hackProject: HackProject): Project {
  const fields = hackProject.fields;
  return {
    uuid: hackProject.id,
    hackKey: hackProject.key,
    applicationStatus: ApplicationStatus.NotApplied,
    isFav: false,
    projectName: fields.summary,
    projectType: fields.typeOfProject?.value ?? "",
    leader: mapJiraUserToProjectUser(fields.leader),
    teamMembers: fields.members?.map((member) => member.displayName) ?? [],
    technologies: fields.technologies,
    description: fields.description,
    typeOfProject: fields.typeOfProject?.value || "",
    recruitmentStatus: hackProject.isOpen
      ? RecruitmentStatus.Open
      : RecruitmentStatus.Closed,
  };
}

export function mapJiraUserToProjectUser(
  jiraUser: JiraUser | null,
): ProjectUser {
  if (!jiraUser) return EMPTY_USER;
  return {
    email: jiraUser.emailAddress,
    displayName: jiraUser.displayName,
    iconUrl: jiraUser.avatarUrls["16x16"],
  };
}
