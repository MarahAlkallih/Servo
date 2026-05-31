import { gql } from "@apollo/client";
export const CREATE_MAIN_BRANCH=gql`
mutation CreateBranch($input: CreateBranchInput!) {
  createBranch(input: $input) {
    id
    name
    address
    type
    isActive
  }
}
`
export const CREATE_SUB_BRANCH=gql`
mutation CreateBranch($input: CreateBranchInput!) {
  createBranch(input: $input) {
    id
    name
    address
    type
    isActive
  }
}
`
export const EDIT_BRANCH=gql`
mutation UpdateBranch($id: Int!, $input: UpdateBranchInput!) {
  updateBranch(id: $id, input: $input) {
    id
    name
    address
    type
    isActive
  }
}
`
export const DELETE_BRANCH=gql`
mutation RemoveBranch($id: Int!) {
  removeBranch(id: $id) {
    id
    name
  }
}
`