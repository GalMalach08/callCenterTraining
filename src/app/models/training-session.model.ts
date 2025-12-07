export interface TrainingSessionModel {
  questionId: number;
  textAnswer?: string;
  audioAnswer?: Blob;
  submittedAt: Date;
}
