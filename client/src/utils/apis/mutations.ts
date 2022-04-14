import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login (
      email: $email, 
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_TO_CHAT_HISTORY = gql`
  mutation AddToChatHistory(
      
  ) 
`
