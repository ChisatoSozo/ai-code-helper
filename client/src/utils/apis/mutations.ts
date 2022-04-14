import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        chat {
          isUser
          message
        }
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        chat {
          isUser
          message
        }
      }
    }
  }
`;

export const SAVE_CHAT = gql`
  mutation AddToChatHistory($messages: addChatMessagesInput) {
    addToChatHistory(messages: $messages) {
      isUser
      message
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation DeleteChatHistory {
    deleteChatHistory {
      isUser
      message
    }
  }
`;
