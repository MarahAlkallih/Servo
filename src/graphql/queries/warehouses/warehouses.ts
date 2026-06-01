import { gql } from "@apollo/client";

export const GET_WAREHOUSES= gql`
query Warehouses {
  warehouses {
    id
    name
    address
    isActive
  }
}
`
export const GET_WAREHOUSE_BY_ID = gql`
query Warehouse($id: Int!) {
  warehouse(id: $id) {
    id
    name
    address
    isActive
    branch{
      id 
      name
      company{
        id 
        name
      }
    }
  }
}
`;



