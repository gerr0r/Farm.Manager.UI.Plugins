import { gql } from "@apollo/client";

export const INACTIVE_ACCOUNTS = gql`
  query GetInactiveAccounts {
    inactiveAccounts {
      id
      email
      createdAt
    }
  }
`;

export const ACTIVE_ACCOUNTS = gql`
  query GetActiveAccounts {
    activeAccounts {
      id
      email
      createdAt
    }
  }
`;

export const ACCOUNT = gql`
  query GetAccountInfo($id: ID!) {
    account(id: $id) {
      id
      email
      createdAt
      countries {
        country {
          code
          name
        }
      }
    }
  }
`;

export const ACTIVATE = gql`
  mutation ActivateAccount($id: ID!) {
    activate(id: $id)
  }
`;

export const DEACTIVATE = gql`
  mutation DectivateAccount($id: ID!) {
    deactivate(id: $id)
  }
`;

export const COUNTRIES = gql`
  query GetCountries {
    getCountries {
      code
      name
    }
  }
`;
