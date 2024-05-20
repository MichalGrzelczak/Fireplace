import { auth } from "@/app/api/auth/(config)/auth";
import { BASE_URL, HEADERS } from "@/app/app/projects/api-consts";
import {
  CUSTOM_FIELDS,
  HackProject,
  JiraClosedRecruitmentLabels,
  createFieldsFromIssueFields,
} from "@/app/app/projects/jira-projects-api-types";
import { fetchJiraUserDetails } from "@/app/app/projects/jira-users-api";
import { ProjectUser } from "@/app/app/projects/types";

function createFieldsString(): string {
  return [...fieldsToFetch, ...Object.keys(CUSTOM_FIELDS)]
    .map((fieldName) => `&fields=${fieldName}`)
    .join("");
}

const fieldsToFetch = [
  "created",
  "labels",
  "summary",
  "reporter",
  "status",
  "description",
  "project",
];

export async function fetchProjects(): Promise<HackProject[]> {
  const fields = createFieldsString();
  let startAt: number = 0;
  const increment: number = 50;
  let maxResults: number;
  const allIssues: HackProject[] = [];

  const fetchIssues = async (startAt: number): Promise<void> => {
    const response = await fetch(
      `${BASE_URL}/search?jql=project=HACK and status !=REJECTED and issueType = Topic order by id&startAt=${startAt}${fields}`,
      {
        method: "GET",
        headers: HEADERS,
        next: {
          revalidate: 900,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      const issues: HackProject[] = [...data["issues"]].map((issue) => {
        const fields = createFieldsFromIssueFields(issue["fields"]);
        return {
          id: issue["id"],
          key: issue["key"],
          fields: fields,
          isOpen: isProjectOpen(fields.labels),
        };
      });
      allIssues.push(...issues);

      if (!maxResults) {
        maxResults = Math.ceil(data["total"] / data["maxResults"]) * increment;
      }

      if (startAt >= maxResults) {
        return;
      }

      await fetchIssues(startAt + increment + 1);
    }
  };

  await fetchIssues(startAt);
  return allIssues;
}

function isProjectOpen(labels: string[]): boolean {
  return !labels.some((label) => label in JiraClosedRecruitmentLabels);
}

export async function updateIssueMembers(
  hackKey: string,
  members: ProjectUser[],
): Promise<void> {
  const session = await auth();

  if (!session) return;

  const mailsInProject: string[] = members.map((member) => member.email);

  if (mailsInProject.includes(session!.user!.email!)) return;

  const userDetails = await fetchJiraUserDetails(session.user?.email!);

  const createBody = {
    fields: {
      customfield_10788: [...members, userDetails],
    },
  };

  await fetch(`${BASE_URL}/issue/${hackKey}`, {
    method: "PUT",
    headers: { ...HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify(createBody),
  });

  return;
}
