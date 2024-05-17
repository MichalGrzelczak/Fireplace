import {
  CUSTOM_FIELDS,
  HackProject,
  JiraClosedRecruitmentLabels,
  createFieldsFromIssueFields,
} from "@/app/app/projects/jiraApiTypes";

const TOKEN: string = process.env.JIRA_API_TOKEN ?? "";
const HEADERS = {
  Authorization: `Basic ${Buffer.from(
    "michal.grzelczak@appfire.com:" + TOKEN,
  ).toString("base64")}`,
  Accept: "application/json",
};
const URL: string = "https://appfire.atlassian.net/rest";

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
      `${URL}/api/3/search?jql=project=HACK and status !=REJECTED and issueType = Topic order by id&startAt=${startAt}${fields}`,
      {
        method: "GET",
        headers: HEADERS,
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
