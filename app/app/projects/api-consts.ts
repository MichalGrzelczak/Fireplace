export const TOKEN: string = process.env.JIRA_API_TOKEN ?? "";
export const HEADERS = {
  Authorization: `Basic ${Buffer.from(
    "michal.grzelczak@appfire.com:" + TOKEN,
  ).toString("base64")}`,
  Accept: "application/json",
};
export const BASE_URL: string = "https://appfire.atlassian.net/rest/api/3";
