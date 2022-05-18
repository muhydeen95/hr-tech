export interface lCApplicationDTO {
  //Step 1
  lCApplicationDate: string;
  applicantName: string;
  applicantAddress: string;
  beneficiaryName: string;
  beneficiaryPhoneNumber: string;
  beneficiaryAddress: string;
  type: number | null;
  ussance: number | null;
  cFR: string;
  sight: boolean | null;
  location: string;

  //Step 2
  itemsOfImport: string;
  valueInFigures: string;
  valueInWords: string;
  proformaInvoiceNumber: string;
  proformaInvoiceDate: string;
  mFNumber: string;
  bANumber: string;
  validUntil: string;
  latestShipment: string;
  expiryDate: string;

  //Step 3
  hasCCVO: boolean | null;
  hasCommercialInvoice: boolean | null;
  hasParkingList: boolean | null;
  hasManufacturerCertificateOfProduction: boolean | null;
  laboratoryTestCertificate: boolean | null;
  beneficiaryIssuedCertificate: boolean | null;
  oceanBillOfLanding: boolean | null;
  airwayBillConsigned: string;
  otherDetails: string;

  //Step 4
  dispatchFrom: string;
  dispatchTo: string;
  partialShipment: number | null;
  transShipment: number | null;
  overseesBankCharges: number | null;

  //Step 5
  signature: string;
  stamp: string;
  supportingDocument: string[];
}

export enum LCType {
  IRREVOCABLE = 1,
  CONFIRMED = 2,
  UNCONFIRMED = 3,
  CONFIRMATION_LINE = 4,
  RED_CLAUSE = 5,
  TRANSFERRABLE = 6,
}

export const INITIAL_FORM_DATA = {
  //Step 1
  lCApplicationDate: '',
  applicantName: '',
  applicantAddress: '',
  beneficiaryName: '',
  beneficiaryPhoneNumber: '',
  beneficiaryAddress: '',
  type: null,
  ussance: null,
  cFR: '',
  sight: null,
  location: '',

  //Step 2
  itemsOfImport: '',
  valueInFigures: '',
  valueInWords: '',
  proformaInvoiceNumber: '',
  proformaInvoiceDate: '',
  mFNumber: '',
  bANumber: '',
  validUntil: '',
  latestShipment: '',
  expiryDate: '',

  //Step 3
  hasCCVO: null,
  hasCommercialInvoice: null,
  hasParkingList: null,
  hasManufacturerCertificateOfProduction: null,
  laboratoryTestCertificate: null,
  beneficiaryIssuedCertificate: null,
  oceanBillOfLanding: null,
  airwayBillConsigned: '',
  otherDetails: '',

  //Step 4
  dispatchFrom: '',
  dispatchTo: '',
  partialShipment: null,
  transShipment: null,
  overseesBankCharges: null,

  //Step 5
  signature: '',
  stamp: '',
  supportingDocument: [],
};

export const LC_Type: { id: number; type: string }[] = [
  {
    id: 1,
    type: 'Irrevocable',
  },
  {
    id: 2,
    type: 'Confirmed',
  },
  {
    id: 3,
    type: 'Unconfirmed',
  },
  {
    id: 4,
    type: 'Confirmation Line',
  },
  {
    id: 5,
    type: 'Red Clause',
  },
  {
    id: 6,
    type: 'Transferrable',
  },
];

export enum ShipmentStatusEnum {
  ALLOWED = 1,
  PROHIBITED = 2,
}
export enum BankChargesEnum {
  BENEFICIARY = 1,
  APPLICANT = 2,
}
