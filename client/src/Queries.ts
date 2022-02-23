import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation USER_LOGIN($username: String!, $password: String!) {
    login(data: { username: $username, password: $password }) {
      token
    }
  }
`;

export const LIST_COUNTRIES = gql`
  query LIST_COUNTRIES {
    country_list {
      cca2
      common
    }
  }
`;

export const COUNTRY_DETAILS = gql`
  mutation COUNTRY_DETAILS($codes: [String!]) {
    country_details(data: { codes: $codes }) {
      cca2
      rates
      official
      population
      currencies
    }
  }
`;

export const CONVERT = gql`
  mutation CONVERT($codes: [String!], $amount: Float!) {
    convert(data: { codes: $codes, amount: $amount }) {
      conversion
    }
  }
`;

export const CLEAR_DATA = gql`
  mutation CLEAR_DATA($status: Boolean) {
    clear_data(data: { status: $status }) @client
  }
`;
