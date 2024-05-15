import {
  CUSTOM_FIELDS,
  Issue,
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

export async function fetchJiraIssues(startAt: number = 0): Promise<Issue[]> {
  const fields = createFieldsString();
  const response = await fetch(
    `${URL}/api/3/search?jql=project=HACK&startAt=${startAt}${fields}`,

    {
      cache: "no-cache",
      method: "GET",
      headers: HEADERS,
    },
  );

  if (response.ok) {
    const data = await response.json();
    return [...data["issues"]].map((issue) => ({
      id: issue["id"],
      key: issue["key"],
      fields: createFieldsFromIssueFields(issue["fields"]),
    }));
  }

  return [];
}

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

export async function fetchJiraIssues2(): Promise<Issue[]> {
  const fields = createFieldsString();
  let startAt: number = 0;
  let maxResults: number;
  const allIssues: Issue[] = [];

  const fetchIssues = async (startAt: number): Promise<void> => {
    const response = await fetch(
      `${URL}/api/3/search?jql=project=HACK&startAt=${startAt}${fields}`,
      {
        cache: "no-cache",
        method: "GET",
        headers: HEADERS,
      },
    );

    if (response.ok) {
      const data = await response.json();
      const issues: Issue[] = [...data["issues"]].map((issue) => ({
        id: issue["id"],
        key: issue["key"],
        fields: createFieldsFromIssueFields(issue["fields"]),
      }));

      allIssues.push(...issues);

      if (!maxResults) {
        maxResults = Math.ceil(data["total"] / data["maxResults"]);
      }

      if (startAt >= maxResults - 1) {
        return;
      }

      await fetchIssues(startAt + 1);
    }
  };

  await fetchIssues(startAt);
  return allIssues;
}
