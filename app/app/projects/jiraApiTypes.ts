export enum CUSTOM_FIELDS {
  customfield_11084 = "technologies",
  customfield_10922 = "leader",
  customfield_10791 = "typeOfProject",
  customfield_10788 = "members",
}

export type HackProject = {
  id: string;
  key: string;
  fields: Fields;
  isOpen: boolean;
};

export enum JiraClosedRecruitmentLabels {
  "team-is-complete",
  "team-fully-registered",
}

export type Fields = {
  [CUSTOM_FIELDS.customfield_11084]: string | null;
  [CUSTOM_FIELDS.customfield_10922]: JiraUser | null;
  [CUSTOM_FIELDS.customfield_10791]: TypeOfProject | null;
  [CUSTOM_FIELDS.customfield_10788]: JiraUser[] | null;
  summary: string;
  created: string;
  reporter: JiraUser | null;
  labels: string[];
  description: string;
  status: Status;
  parentProject: ParentProject;
};

export type Status = {
  id: string;
  name: string;
  description: string;
  statusCategory: StatusCategory;
};

export type StatusCategory = {
  id: number;
  key: string;
  name: string;
};

export type JiraUser = {
  accountId: string;
  emailAddress: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
};

export type AvatarUrls = {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
};

export type TypeOfProject = {
  id: string;
  value: string;
};

export type ParentProject = {
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
};

export function createFieldsFromIssueFields(issueFields: any): Fields {
  return {
    created: issueFields["created"],
    labels: issueFields["labels"],
    summary: issueFields["summary"],
    technologies: issueFields["customfield_11084"],
    reporter: createJiraUserFromIssueField(issueFields["reporter"]),
    leader: createMembersFromIssueFields(issueFields["customfield_10922"])[0],
    typeOfProject: createTypeOfProjectFromIssueField(
      issueFields["customfield_10791"],
    ),
    members: createMembersFromIssueFields(issueFields["customfield_10788"]),
    status: createStatusFromIssueField(issueFields["status"]),
    description: createDescriptionStringFromIssueField(
      issueFields["description"],
    ),
    parentProject: createParentProjectFromIssueField(issueFields["project"]),
  };
}

function createMembersFromIssueFields(issueFields: any[]): JiraUser[] {
  if (!issueFields || !issueFields.length) return [];

  return issueFields
    .map((issue) => createJiraUserFromIssueField(issue))
    .filter((user): user is JiraUser => !!user);
}

function createJiraUserFromIssueField(issueField: any): JiraUser | null {
  if (!issueField) return null;

  return {
    accountId: issueField["accountId"],
    emailAddress: issueField["emailAddress"],
    avatarUrls: issueField["avatarUrls"],
    displayName: issueField["displayName"],
    active: issueField["active"],
    timeZone: issueField["timeZone"],
    accountType: issueField["accountType"],
  };
}

function createTypeOfProjectFromIssueField(issueField: any): TypeOfProject {
  return {
    id: issueField["id"],
    value: issueField["value"],
  };
}

function createStatusFromIssueField(issueField: any): Status {
  return {
    id: issueField["accountId"],
    name: issueField["name"],
    description: issueField["description"],
    statusCategory: createStatusCategoryFromIssueField(
      issueField["statusCategory"],
    ),
  };
}

function createStatusCategoryFromIssueField(issueField: any): StatusCategory {
  return {
    id: issueField["id"],
    key: issueField["key"],
    name: issueField["name"],
  };
}

function createParentProjectFromIssueField(issueField: any): ParentProject {
  return {
    id: issueField["id"],
    key: issueField["key"],
    name: issueField["name"],
    projectTypeKey: issueField["projectTypeKey"],
  };
}

function createDescriptionStringFromIssueField(issueField: any): string {
  let result = "";

  const traverseContent = (node: any) => {
    if (node["type"] === "text") {
      result += node["text"];
    } else if (node["type"] === "inlineCard") {
      result += node["attrs"]["url"] + " ";
    } else if (node["content"]) {
      node["content"].forEach((child: any) => traverseContent(child));
    }
  };

  issueField["content"].forEach((node: any) => traverseContent(node));

  return result.trim();
}
