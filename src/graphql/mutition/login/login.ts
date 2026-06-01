import { gql } from "@apollo/client";

export const LOGIN=gql`
mutation Login($input: LoginAuthenticationInput!) {
  login(input: $input) {
    accessToken
    user {
      id
      name
      phone
    }
  }
}

`