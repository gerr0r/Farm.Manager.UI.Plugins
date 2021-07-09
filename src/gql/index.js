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
`;

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
`;

export const ACCOUNT_COUNTRIES = gql`
  query GetAccountCountries($accountId: ID) {
    accountCountries(accountId: $accountId) {
      country {
        code
        name
      }
    }
  }
`;

export const ACCOUNT_USERS = gql`
  query AccountUsers {
    accountUsers {
      id
      createdAt
      email
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      email
      createdAt
      id
    }
  }
`;

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
`;

export const USER_FARMS = gql`
  query GetUserFarmsAccess($accountId: ID!) {
    userFarms(accountId: $accountId) {
      farm {
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
  }
`;

export const SET_FARM_ACCESS = gql`
  mutation SetFarmAccess($accountId: ID!, $farmId: ID!) {
    setFarmAccess(accountId: $accountId, farmId: $farmId) {
      farm {
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
  }
`;

export const FARM_FIELDS = gql`
  query GetFarmFields($farmId: ID!) {
    getFarmFields(farmId: $farmId) {
      id
      farmId
      soilType
    }
  }
`;

export const EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      id
      address
      name
      number
      salary
      farm {
        name
        region {
          name
          country {
            name
          }
        }
      }
    }
  }
`;

export const FARM_EMPLOYEES = gql`
  query GetFarmEmployees($farmId: ID!) {
    getFarmEmployees(farmId: $farmId) {
      id
      address
      name
      number
      salary
      farm {
        name
        region {
          name
          country {
            name
          }
        }
      }
    }
  }
`;

export const FIELD_CROPS = gql`
query GetFieldCrops($fieldId: ID) {
  getFieldCrops(fieldId: $fieldId) {
    id
    growth
    crop {
      name
    }
  }
}
`

export const FARM_MACHINES = gql`
query GetFarmMachines($farmId: ID) {
  getFarmMachines(farmId: $farmId) {
    id
    quantity
    machine {
      id
      model
    }
  }
}
`

export const MACHINE = gql`
query MachineDetails($id: ID!) {
  getMachine(id: $id) {
    engine
    model
    type
  }
}
`