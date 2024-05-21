import { Project } from "@/app/app/projects/columns";
import { EMPTY_USER } from "@/app/app/projects/consts";
import {
  Fields,
  HackProject,
  JiraUser,
} from "@/app/app/projects/jira-projects-api-types";
import {
  ApplicationStatus,
  ProjectUser,
  RecruitmentStatus,
} from "@/app/app/projects/types";

export function mapHackProjectToProject(
  hackProject: HackProject,
  currentUserEmail: string,
): Project {
  const fields = hackProject.fields;
  return {
    id: hackProject.id,
    hackKey: hackProject.key,
    applicationStatus: ApplicationStatus.NotApplied,
    isFav: false,
    projectName: fields.summary,
    projectType: fields.typeOfProject?.value ?? "",
    leader: mapJiraUserToProjectUser(fields.leader),
    teamMembers: fields.members?.map((member: any) => member.displayName) ?? [],
    technologies: fields.technologies,
    typeOfProject: fields.typeOfProject?.value || "",
    recruitmentStatus: hackProject.isOpen
      ? RecruitmentStatus.Open
      : RecruitmentStatus.Closed,
    description: fields.description ?? "",
    currentUserIsProjectLeader:
      fields.leader?.emailAddress === currentUserEmail,
    currentUserCanApplyToTeam: canApplyToTeam(
      hackProject,
      fields,
      currentUserEmail,
    ),
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
    jiraUser,
  };
}

function canApplyToTeam(
  hackProject: HackProject,
  fields: Fields,
  loggedInUserEmail: string,
) {
  const notTeamMember = !fields.members?.some(
    (member) => member.emailAddress === loggedInUserEmail,
  );
  return hackProject.isOpen && notTeamMember;
}
