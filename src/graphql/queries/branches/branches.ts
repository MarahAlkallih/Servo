import { gql } from "@apollo/client";
export const GET_BRANCHES=gql`
query Branches {
  branches {
    id
    name
    address
    type
    isActive
  }
}
`

export const GET_BRANCH_BY_ID=gql`
query Branch($id: Int!) {
  branch(id: $id) {
    id
    name
    address
    type
    isActive
  }
}

`