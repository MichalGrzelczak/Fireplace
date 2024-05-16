// mapa technologi, i sprawdzamy, czy dana technologia istnieje, jesli nie, to dodajemy nowa;
// w filtrze technologies wyswietlamy wszystkie dostepne technologie,
import { Project } from "@/app/app/projects/columns";
import { EMPTY_USER } from "@/app/app/projects/consts";
import { HackProject, JiraUser } from "@/app/app/projects/jiraApiTypes";
import {
  ApplicationStatus,
  ProjectUser,
  RecruitmentStatus,
} from "@/app/app/projects/types";

// key -> TeamName and replace to Hack Key + wyswietlic typ projektu
// summary -> Project Name
// jesli nie ma lidera -> available position;
// membersow. jesli null, wyswietlic no team members lozenge, a jak nie, to mapowac Imie+Nazwisko, truncate + tooltip;
// [ 'java' ],
//     [ 'java', 'kotlin' ],
//     [ 'ai', 'go', 'java', 'llm' ],
//     [ 'design', 'java', 'product', 'typescript', 'ux' ],
//     [ 'java' ],
//     [ 'React', 'design', 'java', 'product', 'typescript', 'ux' ],
//     [ 'java', 'python' ],
//     [ 'java' ],
//     null,
//     [ 'NodeJS', 'jira', 'typescript' ],
//     null,
//     null,
//     [ 'AWS' ],
//     null,
//     [ 'AWS', 'NodeJS', 'serverless', 'typescript' ],
//     [ 'ai', 'artificial-intelligence', 'jira' ],
//     [ 'React', 'jira' ],
//     [ 'AWS', 'NodeJS' ],
//     [ 'AWS', 'java', 'jira' ],

const sampleTechnologies = ["aws", "nodejs", "jira"];

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
    technologies: mapJiraTechnologiesToProjectTechnologies(),
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

export function mapJiraTechnologiesToProjectTechnologies(): string[] {
  return [];
}
