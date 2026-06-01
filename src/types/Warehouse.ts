export interface Warehouse{
    id:number,
    name: string,
    address: string,
    branchId: number,
    isActive: boolean
  }
  export interface GetWarehouseseesponse{
    warehouses:Warehouse[],
  }