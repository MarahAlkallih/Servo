import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      name
      isActive
    }
  }
`;
export const EDIT_COMPANY= gql`
mutation UpdateCompany($id: Int!, $input: UpdateCompanyInput!) {
  updateCompany(id: $id, input: $input) {
    id
    name
    isActive
  }
}

`
export const DELETE_COMPANY=gql`
mutation RemoveCompany($id: Int!) {
  removeCompany(id: $id) {
    id
    name
  }
}
`