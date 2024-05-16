import { eq } from "drizzle-orm";

import { auth } from "@/app/api/auth/(config)/auth";
import { ParticipationRequest } from "@/app/api/requests/ParticipationRequest";
import { db } from "@/db";
import { participation_requests } from "@/db/schema";

export class ParticipationRequestService {
  async requestParticipation(projectId: string): Promise<number | bigint> {
    let requestId = db
      .insert(participation_requests)
      .values({
        project_id: projectId,
        user_id: await this.getCurrentUserId(),
        request_date: new Date(),
      })
      .run().lastInsertRowid;
    return Promise.resolve(requestId);
  }

  async declineRequest(requestId: number): Promise<void> {
    db.update(participation_requests)
      .set({
        resolution: "declined",
        resolver: await this.getCurrentUserId(),
        resolution_date: new Date(),
      })
      .where(eq(participation_requests.id, requestId))
      .run();
  }

  async acceptRequest(requestId: number): Promise<void> {
    db.update(participation_requests)
      .set({
        resolution: "accepted",
        resolver: await this.getCurrentUserId(),
        resolution_date: new Date(),
      })
      .where(eq(participation_requests.id, requestId))
      .run();
  }

  async getRequests(): Promise<ParticipationRequest[]> {
    let requests = (
      await db
        .select()
        .from(participation_requests)
        .where(
          eq(participation_requests.user_id, await this.getCurrentUserId()),
        )
    ).map(
      (v) =>
        new ParticipationRequest(
          v.id,
          v.project_id,
          v.user_id,
          v.request_date,
          v.resolution,
          v.resolver,
          v.resolution_date,
        ),
    );
    return Promise.resolve(requests);
  }

  private async getCurrentUserId() {
    const session = await auth();
    const userId: string | null | undefined = session?.user?.email;
    return Promise.resolve("" + userId);
  }
}
