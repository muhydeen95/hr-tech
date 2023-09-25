export interface ContactDTO {
  customerId: number,
  email: string,
  subject: string,
  message: string,
}

export interface Sponsor {
  _id: string,
  companyName: string,
  email: string,
  phoneNumber: string,
  contactPerson: string,
  website: string,
  country: string,
  sponsorPlan: string,
  fileUrl: string,
  imgUrl: string,
  createdAt: string,
}
