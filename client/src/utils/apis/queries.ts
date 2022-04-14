import { gql } from '@apollo/client';

export const GET_CONVERSATION = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      chat {
        isUser
        message
      }
    }
  }
`;
