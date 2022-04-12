import {gql} from "apollo-server";

export const typeDefs = gql`
    type User{
        _id: ID!
        username: String!, 
        email: String!, 
        chat: [Chat]
    }

    type Auth{
        token: ID!
        user: User
    }

    type Chat{
        isUser: Boolean!,
        message: String, 
    }

    type Query{
        user(username: String!): User
    }
    
    type Mutation{
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        addToChatHistory(isUser: Boolean, message: string): [Chat]
        deleteChatHistory(): [Chat]
    }
`;