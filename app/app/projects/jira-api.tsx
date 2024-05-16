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

export async function fetchProjects(
  startAt: number = 0,
): Promise<HackProject[]> {
  const fields = createFieldsString();
  const response = await fetch(
    `${URL}/api/3/search?jql=project=HACK&startAt=${startAt}${fields}`,

    {
      cache: "default",
      method: "GET",
      headers: HEADERS,
    },
  );

  if (response.ok) {
    const data = await response.json();
    return [...data["issues"]].map((issue) => {
      const fields = createFieldsFromIssueFields(issue["fields"]);

      return {
        id: issue["id"],
        key: issue["key"],
        fields: fields,
        isOpen: isProjectOpen(fields.labels),
      };
    });
  }

  return [];
}

function createFieldsString(): string {
  return [...fieldsToFetch, ...Object.keys(CUSTOM_FIELDS)]
    .map((fieldName) => `&fields=${fieldName}`)
    .join("");
}

export function isProjectOpen(labels: string[]): boolean {
  return !labels.some((label) => label in JiraClosedRecruitmentLabels);
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

// export async function fetchJiraIssues2(): Promise<Project[]> {
//   const fields = createFieldsString();
//   let startAt: number = 0;
//   let maxResults: number;
//   const allIssues: Project[] = [];
//
//   const fetchIssues = async (startAt: number): Promise<void> => {
//     const response = await fetch(
//       `${URL}/api/3/search?jql=project=HACK&startAt=${startAt}${fields}`,
//       {
//         cache: "no-cache",
//         method: "GET",
//         headers: HEADERS,
//       },
//     );
//
//     if (response.ok) {
//       const data = await response.json();
//       const issues: Project[] = [...data["issues"]].map((issue) => ({
//         id: issue["id"],
//         key: issue["key"],
//         fields: createFieldsFromIssueFields(issue["fields"]),
//         isOpen: false
//       }));
//
//       allIssues.push(...issues);
//
//       if (!maxResults) {
//         maxResults = Math.ceil(data["total"] / data["maxResults"]);
//       }
//
//       if (startAt >= maxResults - 1) {
//         return;
//       }
//
//       await fetchIssues(startAt + 1);
//     }
//   };
//
//   await fetchIssues(startAt);
//   return allIssues;
// }
