import { gql } from "@apollo/client";

export const GET_COMPANIES= gql`
query Companies {
  companies {
    id
    name
    isActive
  }
}
`
export const GET_COMPANY_BY_ID = gql`
  query GetCompany($id: Int!) {
    company(id: $id) {
      id
      name
      isActive
    }
  }
`;



