export interface Company {
  id: number;
  name: string;
  isActive: boolean;
};

export interface GetCompaniesResponse {
  companies: Company[];
};