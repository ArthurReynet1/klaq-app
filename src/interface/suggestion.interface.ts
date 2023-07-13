export interface Suggestion {
  activityType: string;
  inseeLegalFormCode: string;
  legalForm: CompanyLegalForm;
  legalName: string;
  legalRegistrationNumber: string;
  legalVATNumber?: string;
  registrationDate: Date;
  address: string;
  city: string;
  zip: string;
  tradeName?: string;
  country: string;
}

export enum CompanyLegalForm {
  SAS = "SAS, société par actions simplifiée",
  SASU = "SASU, société par actions simplifiée unipersonnelle",
  SARL = "SARL, société à responsabilité limitée",
  EURL = "EURL, entreprise unipersonnelle à responsabilité limitée",
  SA = "SA à conseil d'administration (s.a.i.)",
  SNC = "Société en nom collectif",
  SCI = "SCI, société civile immobilière",
  "Entrepreneur individuel" = "Entrepreneur individuel",
  SC = "SC",
  SCA = "SCA",
}
