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
    activate(id: $id) {
      id
      email
      createdAt
    }
  }
`;

export const DEACTIVATE = gql`
  mutation DectivateAccount($id: ID!) {
    deactivate(id: $id) {
      id
      email
      createdAt
    }
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

export const ADD_COUNTRY = gql`
  mutation AddCountry($code: String!, $name: String!) {
    addCountry(code: $code, name: $name) {
      code
      name
    }
  }
`;

export const REGIONS = gql`
  query GetRegions($code: ID) {
    getRegions(countryId: $code) {
      countryId
      id
      name
    }
  }
`;

export const ADD_REGION = gql`
  mutation AddRegion($countryId: String!, $name: String!) {
    addRegion(countryId: $countryId, name: $name) {
      id
      name
      countryId
    }
  }
`;

export const ADD_ASSIGNMENT = gql`
  mutation AddAssignment($accountId: ID!, $countryCode: String!) {
    addAssignment(accountId: $accountId, countryCode: $countryCode) {
      country {
        code
        name
      }
    }
  }
`;

export const REMOVE_ASSIGNMENT = gql`
  mutation RemoveAssignment($accountId: ID!, $countryCode: String!) {
    removeAssignment(accountId: $accountId, countryCode: $countryCode) {
      country {
        code
        name
      }
    }
  }
`

export const NEW_COUNTRY = gql`
  fragment NewCountry on Country {
    country {
      code
      name
    }
  }
`;

export const FARMS = gql`
query GetFarms {
  getFarms {
    id
    name
    region {
      name
      country {
        name
      }
    }
  }
}
`

export const ACCOUNT_COUNTRIES = gql`
query GetAccountCountries {
  accountCountries {
		country {
      code
      name
    }
  }
}
`

export const ADD_FARM = gql`
mutation AddFarm($name: String!, $regionId: ID!) {
  addFarm(name: $name, regionId: $regionId) {
    id
    name
    region {
      name
      country {
        name
      }
    }
  }
}
`

export const FARM_FIELDS = gql`
query GetFarmFields($farmId: ID!) {
  getFarmFields(farmId: $farmId) {
    id
    farmId
    soilType
  }
}
`

export const EMPLOYEES = gql`
query GetEmployees {
  getEmployees {
    id
    address
    name
    number
    salary
    farmId
  }
}
`

export const FARM_EMPLOYEES = gql`
query GetFarmEmployees($farmId: ID!) {
  getFarmEmployees(farmId: $farmId) {
    id
    address
    name
    number
    salary
  }
}
`
