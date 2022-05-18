export interface LCType {
  name: string;
  id: number;
}

export interface LCApplicationDTO {
  applicantName: string;
  beneficiaryName: string;
  dateSubmitted: string;
  expiryDate: string;
  lcApplicationId: number;
  files: Array<{
    stamp: {
      name: string;
      path: string;
      uniqueName: string;
    };
    signature: {
      name: string;
      path: string;
      uniqueName: string;
    };
    supportingDocuments: {
      name: string;
      path: string;
      uniqueName: string;
    };
  }>;
  valueInFigure: string;
  airwayBillConsigned: string;
  applicantAddress: string;
  baNumber: string;
  beneficiaryAddress: string;
  beneficiaryIssuedCertificate: boolean;
  beneficiaryPhoneNumber: string;
  cfr: string;
  dispatchFrom: string;
  dispatchTo: string;
  hasCCVO: boolean;
  hasCommercialInvoice: boolean;
  hasManufacturerCertificateOfProduction: boolean;
  hasParkingList: boolean;
  itemsOfImport: string;
  laboratoryTestCertificate: boolean;
  latestShipment: string;
  lcApplicationDate: string;
  location: string;
  mfNumber: string;
  oceanBillOfLanding: boolean;
  otherDetails: string;
  overseesBankCharges: number;
  partialShipment: number;
  proformaInvoiceDate: string;
  proformaInvoiceNumber: string;
  sight: boolean;
  transShipment: number;
  type: number;
  ussance: number;
  validUntil: string;
  valueInWords: string;
}
