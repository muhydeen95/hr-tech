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
  country: string,
  applicantType: string,
  registrationType: string,
  noOfRegistrants: string,
  modeOfAttendance: string,
  profMembership: string,
  requireAccomodation: boolean,
  noOfAccomodants: number,
  comment: string,
  fileUrl: string,
  hasPaid: boolean,
  amountToPay: number,
  currency: string,
  registrationNo: string,
  createdAt: string,

}

export interface Speaker {
  _id: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  organization: string,
  position: string,
  country: string,
  biography: string,
  fileUrl: string,
  imgUrl: string,
  createdAt: string,
}
