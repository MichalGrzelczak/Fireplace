import { BASE_URL, HEADERS } from "@/app/app/projects/api-consts";
import { JiraUser } from "@/app/app/projects/jira-projects-api-types";

export async function fetchJiraUserDetails(
  userEmail: string,
): Promise<JiraUser> {
  const response = await fetch(`${BASE_URL}/user/search?query=${userEmail}`, {
    method: "GET",
    headers: HEADERS,
  });

  let user: JiraUser = {} as JiraUser;

  if (response.ok) {
    const data = await response.json();
    user = data[0];
  }

  return user;
}
