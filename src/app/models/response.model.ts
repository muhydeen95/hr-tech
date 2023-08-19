export interface ResponseModel<T> {
  errors: any;
  response: T;
  data: T;
  message: string;
}

export interface Attendant {
  _id: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  organization: string,
  position: string,
  registrationType: string,
  noOfRegistrants: string,
  modeOfAttendance: string,
  profMembership: string,
  requireAccomodation: boolean,
  noOfAccomodants: number,
  comment: string,
  fileUrl: string,
  haspaid: boolean,
  amountToPay: number,
  currency: string,
  registrationNo?: string,
  qrCodeURL?: string,
}
