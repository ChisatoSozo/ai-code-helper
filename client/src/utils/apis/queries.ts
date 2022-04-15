import { gql } from '@apollo/client';

export const GET_CONVERSATION = gql`
  query GetUser {
    getUser {
      chat {
        isUser
        message
      }
    }
  }
`;
