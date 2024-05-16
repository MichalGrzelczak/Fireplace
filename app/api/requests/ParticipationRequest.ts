export class ParticipationRequest {
  constructor(
    public readonly id: number,
    public readonly projectId: string,
    public readonly userId: string,
    public readonly requestDate: Date,
    public readonly resolution?: string | null,
    public readonly resolver?: string | null,
    public readonly resolutionDate?: Date | null,
  ) {}
}
