"use server";

import { NotificationData } from "@/app/api/requests/NotificationData";
import { NotificationRequestService } from "@/app/api/requests/NotificationRequestService";
import { ParticipationRequest } from "@/app/api/requests/ParticipationRequest";
import { ParticipationRequestService } from "@/app/api/requests/ParticipationRequestService";
import {
  getCurrentUser,
  getCurrentUserId,
} from "@/app/api/utils/getCurrentUserId";
import { updateIssueMembers } from "@/app/app/projects/jira-projects-api";
import { JiraUser } from "@/app/app/projects/jira-projects-api-types";
import { ProjectUser } from "@/app/app/projects/types";

export async function requestParticipation(data: {
  projectId: string;
  projectName: string;
  leader: ProjectUser;
}) {
  const user = await getCurrentUser();
  await new ParticipationRequestService().requestParticipation(data.projectId);

  await new NotificationRequestService().sendNotification({
    type: "requested-participation",
    projectName: data.projectName,
    requesterImg: user.image ?? undefined,
    requesterName: user.name ?? "Unknown",
    approverName: data.leader.displayName,
    approverImg: data.leader.iconUrl,
  });
}

export async function declineParticipationRequest(data: {
  requestingUserId: string;
  // requestId: number,
  projectId: string;
  projectName: string;
}) {
  await new ParticipationRequestService().declineRequest(
    data.requestingUserId,
    data.projectId,
  );

  const approver = await getCurrentUser();
  await new NotificationRequestService().sendNotification({
    type: "declined-participation",
    projectName: data.projectName,
    approverImg: approver.image ?? undefined,
    approverName: approver.name ?? "Unknown",
  });
}

export async function acceptParticipationRequest(data: {
  requestingUserId: string;
  // requestId: number,
  projectId: string;
  projectName: string;
  hackKey: string;
  projectMembers: JiraUser[];
}) {
  await new ParticipationRequestService().acceptRequest(
    data.requestingUserId,
    data.projectId,
  );

  await updateIssueMembers(
    data.hackKey,
    data.projectMembers,
    data.requestingUserId,
  );

  const approver = await getCurrentUser();
  await new NotificationRequestService().sendNotification({
    type: "accepted-participation",
    projectName: data.projectName,
    approverImg: approver.image ?? undefined,
    approverName: approver.name ?? "Unknown",
  });
}

export async function getParticipationRequests(): Promise<
  ParticipationRequest[]
> {
  return await new ParticipationRequestService().getRequests();
}

export async function getRequestsToJoinProject(
  projectId: string,
): Promise<ParticipationRequest[]> {
  return await new ParticipationRequestService().getRequestsToJoinProject(
    projectId,
  );
}
