export type Company = {
  id: string;
  name: string;
  service: string;
  details: string;
  lat?: number;
  lng?: number;
  capital: number;
  logoUrl: string;
  createdAt: string;
};

export type CompanyFormValues = {
  name: string;
  service: string;
  details: string;
  lat?: number;
  lng?: number;
  capital: number;
};

export type GetCompaniesDto = {
  createdAtFrom?: string;
  createdAtTo?: string;
  capitalMin?: number;
  capitalMax?: number;
  sortBy?: 'name' | 'service';
  sortOrder?: 'asc' | 'desc';
  skip?: number;
  limit?: number;
};

export interface CompanyResponse {
  companies: Company[];
  totalCount: number;
}
