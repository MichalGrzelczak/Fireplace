import { and, eq } from "drizzle-orm";

import { ParticipationRequest } from "@/app/api/requests/ParticipationRequest";
import { getCurrentUserId } from "@/app/api/utils/getCurrentUserId";
import { db } from "@/db";
import { participation_requests } from "@/db/schema";

export class ParticipationRequestService {
  async requestParticipation(projectId: string): Promise<number | bigint> {
    const currentUserId = await getCurrentUserId();

    let requestId = db
      .insert(participation_requests)
      .values({
        project_id: projectId,
        user_id: currentUserId,
        request_date: new Date(),
      })
      .run().lastInsertRowid;
    return Promise.resolve(requestId);
  }

  async declineRequest(
    requestingUserId: string,
    projectId: string,
  ): Promise<void> {
    db.update(participation_requests)
      .set({
        resolution: "DECLINED",
        resolver: await getCurrentUserId(),
        resolution_date: new Date(),
      })
      .where(
        and(
          eq(participation_requests.user_id, requestingUserId),
          eq(participation_requests.project_id, projectId),
        ),
      )
      .run();
  }

  async acceptRequest(
    requestingUserId: string,
    projectId: string,
  ): Promise<void> {
    db.update(participation_requests)
      .set({
        resolution: "ACCEPTED",
        resolver: await getCurrentUserId(),
        resolution_date: new Date(),
      })
      .where(
        and(
          eq(participation_requests.user_id, requestingUserId),
          eq(participation_requests.project_id, projectId),
        ),
      )
      .run();
  }

  async getRequests(): Promise<ParticipationRequest[]> {
    let requests = (
      await db
        .select()
        .from(participation_requests)
        .where(eq(participation_requests.user_id, await getCurrentUserId()))
    ).map((v) => ({
      id: v.id,
      projectId: v.project_id,
      userId: v.user_id,
      requestDate: v.request_date,
      resolution: v.resolution,
      resolver: v.resolver,
      resolutionDate: v.resolution_date,
    }));
    return Promise.resolve(requests);
  }

  async getRequestsToJoinProject(
    projectId: string,
  ): Promise<ParticipationRequest[]> {
    const requests = await db
      .select()
      .from(participation_requests)
      .where(eq(participation_requests.project_id, projectId));

    return requests.map((v) => ({
      id: v.id,
      projectId: v.project_id,
      userId: v.user_id,
      requestDate: v.request_date,
      resolution: v.resolution,
      resolver: v.resolver,
      resolutionDate: v.resolution_date,
    }));
  }
}
