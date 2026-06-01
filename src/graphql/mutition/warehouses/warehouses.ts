import { gql } from "@apollo/client";
export const CREATE_WAREHOUSE=gql`
mutation CreateWarehouse($input: CreateWarehouseInput!) {
  createWarehouse(input: $input) {
    id
    name
    address
    isActive
  }
}
`
export const EDIT_WAREHOUSES=gql`
mutation UpdateWarehouse($id: Int!, $input: UpdateWarehouseInput!) {
  updateWarehouse(id: $id, input: $input) {
    id
    name
    address
    isActive
  }
}
`
export const DELETE_WAREHOUSES=gql`
mutation RemoveWarehouse($id: Int!) {
  removeWarehouse(id: $id) {
    id
    name
  }
}
`