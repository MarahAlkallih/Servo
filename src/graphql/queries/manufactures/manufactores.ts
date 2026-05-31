import { gql } from "@apollo/client";

export const GET_ALL_MANUFACTURES=gql`
query Manufacturers {
  manufacturers {
    id
    name
    address
    isActive
  }
}`
