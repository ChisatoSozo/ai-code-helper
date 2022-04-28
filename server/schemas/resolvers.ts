import {
  login,
  createUser,
  addToChatHistory,
  deleteChatHistory,
  removeXMessages,
  getUser,
} from '../controllers';

export const resolvers = {
  Mutation: {
    login,
    createUser,
    addToChatHistory,
    deleteChatHistory,
    removeXMessages,
  },
  Query: {
    getUser,
  },
};
