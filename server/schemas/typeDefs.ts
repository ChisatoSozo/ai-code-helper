import {gql} from "apollo-server";

export const typeDefs = gql`
    type User{
        _id: ID!
        username: String!, 
        email: String!, 
        chat: [Chat],
    }

    type Auth{
        token: ID!,
        user: User,
    }

    type Chat{
        isUser: Boolean!,
        message: String, 
    }
    
    input ChatInput{
        isUser: Boolean!,
        message: String,
    }

    input addChatMessagesInput{
        user: ChatInput!,
        ai: ChatInput!,
    }
    
    type Query{
        getUser: User,
    }
    
    type Mutation{
        login(email: String!, password: String!): Auth,
        createUser(username: String!, email: String!, password: String!): Auth,
        addToChatHistory(messages: addChatMessagesInput): [Chat],
        deleteChatHistory: [Chat]
    }
`;