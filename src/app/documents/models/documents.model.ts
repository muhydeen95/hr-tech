export interface FilterDTO {
  lCApplicationDate: string;
}
export interface DocumentDTO {
  confidentialityLevel: number;
  createdAt: string;
  dateCreated: string;
  documentType: string;
  fileSubmissionId: number;
  files: Array<{
    fileType: string;
    base64String: string;
    name: string;
    path: string;
    uniqueName: string;
    url: string;
  }>;
  subject: string;
  treatmentStatusId: string;
}

export interface DocumentSearchDTO {
  CustomerFileSubmissionDate: string;
  TreatmentStatus: string;
  Search: string;
  PageNumber: number;
  PageSize: number;
}

export const DefaultDocumentSearchDTO = {
  CustomerFileSubmissionDate: '',
  Search: '',
  PageNumber: 1,
  PageSize: 5,
};

export const InitialDocumentSearchDTO = {
  doctype: 0,
  searchBy: 0,
  startDate: '',
  EndDate: new Date().toISOString(),
  OrderBy: {
    OrderField: 'createdAt',
    Ascending: true,
  },
  Search: '',
  PageNumber: 1,
  PageSize: 10,
};

export interface DocumentCountDTO {
  pendingFiles: number;
  treatedFiles: number;
  untreatedFiles: number;
}

export interface DocumentResponse {
  correspondenceNo: string;
  createdAt: string;
  dateCreated: string;
  documentType: string;
  receivingOffice: string;
  fileSubmissionId: number;
  subject: string;
  treatmentStatusId: string;
}
export const CustomerTransactionStatus: any = {
  7: 'Untreated',
  10: 'Rejected',
  9: 'Treated',
  8: 'Pending',
  1: 'KeepInView',
  2: 'NeedsAdditionalInfo',
  3: 'PutAway',
};

export interface AddFileSubmissionResponse {
  FileSubmissionId: number,
  Message: string,
  Type: number,
  Files: Array<File>
}