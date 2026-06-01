export interface User{
    id:number,
    name:string,
    phone:string,
    accessToken:string
}
export type LoginPayload = {
  accessToken: string;
  user: {
    id: number;
    name: string;
    phone: string;
  };
};