export interface Manufactores {
  id: number;
  name: string;
  isActive: boolean;
};
export interface GetManufacturesResponse {
  manufacturers: Manufactores[];
};