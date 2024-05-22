export const TOKEN: string = process.env.JIRA_API_TOKEN ?? "";
const JIRA_MAIL: string = process.env.EMAIL ?? "";
export const HEADERS = {
  Authorization: `Basic ${Buffer.from(JIRA_MAIL + ":" + TOKEN).toString("base64")}`,
  Accept: "application/json",
};
export const BASE_URL: string = "https://appfire.atlassian.net/rest/api/3";
