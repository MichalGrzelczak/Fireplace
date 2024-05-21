export interface ParticipationRequest {
  id: number;
  projectId: string;
  userId: string;
  requestDate: Date;
  resolution?: string | null;
  resolver?: string | null;
  resolutionDate?: Date | null;
}
