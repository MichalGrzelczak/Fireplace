import { fetchJiraIssues } from "@/app/find-team/jiraApi";

export default async function FindTeam() {
  const data = await fetchJiraIssues();

  return <div>Find team works</div>;
}
