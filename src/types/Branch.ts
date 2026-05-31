export interface Branch{
     id:number;
    name:string;
    address:string;
    companyId?:number;
    type:string;
    isActive:boolean
}
export interface GetBranchesResponse{
    branches:Branch[];
}