export interface FAQ {
  faqId: number;
  question: string;
  answer: string;
  active: boolean;
  deleted: boolean;
  createdBy: string;
  createdOn: Date;
  updatedBy: string;
  updatedOn: Date;
}
